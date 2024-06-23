import React, { useState, useEffect, useRef } from "react";
import * as S from "./MissionsStyles";
import * as Icons from "phosphor-react-native";
import * as Progress from "react-native-progress";
import { MainHeader } from "../../../../components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "styled-components";
import { FlatList, Alert, ActivityIndicator } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { Toast } from "toastify-react-native";
import { IMissionItem, IMissionsData } from "./utils/types";
import apiAuth from "../../../../infra/apiAuth";
import { MissionDetailsModal } from "./components/MissionDetailsModal/MissionDetailsModal";
import { IConfigurationsTabBarVisibilityProps } from "../../../../utils/types";
import { Modalize } from "react-native-modalize";

export function Missions({
  setIsTabBarVisibility,
}: IConfigurationsTabBarVisibilityProps) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [missions, setMissions] = useState<IMissionsData[]>([]);
  const [itemSelected, setItemSelected] = useState<IMissionsData>();
  const missionDetailsRef = useRef<Modalize>(null);

  async function getMissions() {
    setLoading(true);
    try {
      await apiAuth.get("/mission/list").then((res) => {
        setMissions(res.data.userMissions);
      });
    } catch (error: any) {
      Toast.error(error.response.data.message, "bottom");
    } finally {
      setLoading(false);
    }
  }

  const handleCollect = async (id: string) => {
    try {
      await apiAuth
        .post(`/mission/collect`, {
          userMissionId: id,
        })
        .then(() => {
          setMissions((prevData) =>
            prevData.map((item) =>
              item.id === id ? { ...item, isCollectible: false } : item
            )
          );
          Toast.success("Missão coletada com sucesso!", "bottom");
        });
    } catch (error: any) {
      Toast.error(error.response.data.message, "bottom");
    }
  };

  const MissionItem = ({
    item,
    theme,
    onCollect,
    onLongPress,
  }: IMissionItem) => {
    const borderWidth = useSharedValue(1);

    useEffect(() => {
      if (item.isCollectible && !item.isCompleted) {
        borderWidth.value = withRepeat(
          withTiming(2, { duration: 1000 }),
          -1,
          true
        );
      } else {
        borderWidth.value = 1;
      }
    }, [item.isCollectible, item.isCompleted]);

    const animatedStyle = useAnimatedStyle(() => {
      let color;
      if (item.isCollectible && !item.isCompleted) {
        color = interpolateColor(
          borderWidth.value,
          [1, 2],
          [theme.colors.border, theme.colors.primary]
        );
      } else {
        color = theme.colors.border;
      }
      return {
        borderColor: color,
        borderWidth: borderWidth.value,
      };
    });

    return (
      <Animated.View style={[S.missionItemStyle, animatedStyle]}>
        <S.MissionItem
          activeOpacity={0.7}
          onPress={() =>
            item.isCollectible && !item.isCompleted ? onCollect(item.id) : {}
          }
          onLongPress={() => onLongPress(item)}
        >
          <S.MissionItemLeftContainer>
            <S.MissionCompletedContainer
              isCompleted={item.isCollectible && !item.isCompleted}
            >
              {item.isCollectible && !item.isCompleted && (
                <Icons.Check size={20} color={theme.colors.text} />
              )}
            </S.MissionCompletedContainer>
            <S.MissionInformationContainer>
              <S.MissionTitle>{item.mission.title}</S.MissionTitle>
              <S.ProgressContainer>
                <S.ProgressText>{item.progress}</S.ProgressText>
                <Progress.Bar
                  progress={item.progress / item.mission.goal}
                  color={theme.colors.primary}
                  unfilledColor={theme.colors.border}
                  borderWidth={1}
                  height={8}
                  borderRadius={8}
                  width={125}
                  style={{ marginHorizontal: 4 }}
                />
                <S.ProgressText>{item.mission.goal}</S.ProgressText>
              </S.ProgressContainer>
            </S.MissionInformationContainer>
          </S.MissionItemLeftContainer>
          <S.MissionRightContainer>
            <Icons.Trophy
              size={28}
              color={theme.colors.primary}
              weight="fill"
            />
            <S.MissionReward>
              +{item.mission.experiencePoints} XP
            </S.MissionReward>
          </S.MissionRightContainer>
        </S.MissionItem>
      </Animated.View>
    );
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getMissions();
    });
  }, [navigation]);

  function closeMissionDetailsModal() {
    setIsTabBarVisibility(true);
    setItemSelected({} as IMissionsData);
    missionDetailsRef.current?.close();
  }

  function openMissionDetailsModal(item: IMissionsData) {
    setIsTabBarVisibility(false);
    setItemSelected(item);
    missionDetailsRef.current?.open();
  }

  const missionToCollect = missions.filter(
    (mission) => mission.isCompleted && !mission.isCollectible
  ).length;

  return (
    <>
      <S.Container>
        <MainHeader
          title="Missões"
          iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
          onPressLeft={() => navigation.navigate("Configurations")}
          iconRight={
            <Icons.Info size={24} color={theme.colors.primary} weight="fill" />
          }
          onPressRight={() =>
            Alert.alert(
              "Informações",
              "Ao clicar em uma missão brilhando, você poderá coleta-lá. Ao clicar e segurar em uma missão, você poderá ver mais detalhes sobre ela."
            )
          }
        />

        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <S.Content>
            {missionToCollect > 0 && (
              <S.MissionToCollect>
                {`Você tem ${missionToCollect} ${
                  missionToCollect <= 1 ? "missão" : "missões"
                } para coletar!`}
              </S.MissionToCollect>
            )}
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => String(item.id)}
              data={missions}
              renderItem={({ item }) => (
                <MissionItem
                  item={item}
                  theme={theme}
                  onCollect={handleCollect}
                  onLongPress={() => openMissionDetailsModal(item)}
                />
              )}
            />
          </S.Content>
        )}
      </S.Container>
      <MissionDetailsModal
        isVisible={missionDetailsRef}
        setIsTabBarVisibility={setIsTabBarVisibility}
        item={itemSelected as IMissionsData}
        closeMissionDetailsModal={closeMissionDetailsModal}
      />
    </>
  );
}
