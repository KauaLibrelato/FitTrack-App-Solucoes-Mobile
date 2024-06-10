import React, { useState, useEffect } from "react";
import * as S from "./MissionsStyles";
import * as Icons from "phosphor-react-native";
import * as Progress from "react-native-progress";
import { MainHeader } from "../../../../components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "styled-components";
import { FlatList, Alert } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { Toast } from "toastify-react-native";

export function Missions() {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const theme = useTheme();

  const [mockData, setMockData] = useState([
    {
      id: 1,
      title: "Treine por 60 minutos em um dia",
      isCompleted: true,
      isCollected: true,
      reward: 100,
      progress: {
        current: 60,
        total: 60,
      },
    },
    {
      id: 2,
      title: "Treine por 3 dias na semana",
      isCompleted: true,
      isCollected: false,
      reward: 50,
      progress: {
        current: 3,
        total: 3,
      },
    },
    {
      id: 3,
      title: "Ganhe 100 XP",
      isCompleted: false,
      isCollected: false,
      reward: 75,
      progress: {
        current: 50,
        total: 100,
      },
    },
  ]);

  const handleCollect = (id: any) => {
    setMockData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isCollected: true } : item
      )
    );
    Toast.success("Missão coletada com sucesso!", "bottom");
  };

  const MissionItem = ({ item, theme, onCollect }: any) => {
    const borderWidth = useSharedValue(1);

    useEffect(() => {
      if (!item.isCollected && item.isCompleted) {
        borderWidth.value = withRepeat(
          withTiming(2, { duration: 1000 }),
          -1,
          true
        );
      } else {
        borderWidth.value = 1;
      }
    }, [item.isCollected, item.isCompleted]);

    const animatedStyle = useAnimatedStyle(() => {
      let color;
      if (!item.isCollected && item.isCompleted) {
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
            item.isCompleted && !item.isCollected ? onCollect(item.id) : {}
          }
        >
          <S.MissionItemLeftContainer>
            <S.MissionCompletedContainer isCompleted={item.isCompleted}>
              {item.isCompleted && (
                <Icons.Check size={20} color={theme.colors.text} />
              )}
            </S.MissionCompletedContainer>
            <S.MissionInformationContainer>
              <S.MissionTitle>{item.title}</S.MissionTitle>
              <Progress.Bar
                progress={item.progress.current / item.progress.total}
                color={theme.colors.primary}
                unfilledColor={theme.colors.border}
                borderWidth={1}
                height={8}
                borderRadius={8}
                width={125}
              />
            </S.MissionInformationContainer>
          </S.MissionItemLeftContainer>
          <S.MissionRightContainer>
            <Icons.Trophy
              size={32}
              color={theme.colors.primary}
              weight="fill"
            />
            <S.MissionReward>+{item.reward} XP</S.MissionReward>
          </S.MissionRightContainer>
        </S.MissionItem>
      </Animated.View>
    );
  };

  const missionToCollect = mockData.filter(
    (item) => !item.isCollected && item.isCompleted
  ).length;
  return (
    <S.Container>
      <MainHeader
        title="Missões"
        iconLeft={<Icons.CaretLeft size={24} color={theme.colors.text} />}
        onPressLeft={() => navigation.navigate("Configurations")}
      />

      <S.Content>
        {missionToCollect > 0 && (
          <S.MissionToCollect>
            {`Você tem ${missionToCollect} ${
              missionToCollect <= 1 ? "missão" : "missões"
            } para coletar!`}
          </S.MissionToCollect>
        )}
        <FlatList
          keyExtractor={(item) => String(item.id)}
          data={mockData}
          renderItem={({ item }) => (
            <MissionItem item={item} theme={theme} onCollect={handleCollect} />
          )}
        />
      </S.Content>
    </S.Container>
  );
}
