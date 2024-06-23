import React from "react";
import { Modalize } from "react-native-modalize";
import * as S from "./MissionDetailsModalStyles";
import * as Icons from "phosphor-react-native";
import { useTheme } from "styled-components";
import { IMissionDetailsModalProps } from "./utils/types";
import * as Progress from "react-native-progress";

export function MissionDetailsModal({
  isVisible,
  setIsTabBarVisibility,
  closeMissionDetailsModal,
  item,
}: IMissionDetailsModalProps) {
  const theme = useTheme();

  return (
    <Modalize
      ref={isVisible}
      adjustToContentHeight
      modalStyle={{ backgroundColor: theme.colors.background }}
      onClosed={() => setIsTabBarVisibility(true)}
    >
      <S.ContainerModal>
        <S.HeaderModal>
          <S.XButtonModal onPress={closeMissionDetailsModal}>
            <Icons.X size={24} color={theme.colors.text} />
          </S.XButtonModal>
          <S.TitleModal>Detalhes de missão</S.TitleModal>
        </S.HeaderModal>
        <S.ContentModal>
          <S.MissionTitle>{item?.mission.title}</S.MissionTitle>
          <S.MissionDescription>
            {item?.mission.description}
          </S.MissionDescription>

          <S.ProgressContainer>
            <S.ProgressText>{item?.progress}</S.ProgressText>
            <Progress.Bar
              progress={item?.progress / item?.mission.goal}
              color={theme.colors.primary}
              unfilledColor={theme.colors.border}
              borderWidth={1}
              height={8}
              borderRadius={8}
              width={125}
              style={{ marginHorizontal: 4 }}
            />
            <S.ProgressText>{item?.mission.goal}</S.ProgressText>
          </S.ProgressContainer>

          <S.MissonRewardContainer>
            <S.MissonRewardTitle>Recompensa: </S.MissonRewardTitle>
            <S.MissonRewardDescription>
              {item?.mission.experiencePoints}XP
            </S.MissonRewardDescription>
          </S.MissonRewardContainer>
        </S.ContentModal>
      </S.ContainerModal>
    </Modalize>
  );
}
