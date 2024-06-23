import styled from "styled-components/native";
import { ViewStyle } from "react-native";

export const Container = styled.View`
  flex: 1;
  padding: 16px 0;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  padding: 32px 32px;
`;

export const MissionToCollect = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`;

export const missionItemStyle: ViewStyle = {
  padding: 8,
  paddingHorizontal: 16,
  borderRadius: 16,
  borderWidth: 1,
  marginBottom: 16,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

export const MissionItem = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
`;

export const MissionItemLeftContainer = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

export const MissionInformationContainer = styled.View`
  flex: 1;
`;

export const MissionCompletedContainer = styled.View<{ isCompleted: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme, isCompleted }) =>
    isCompleted ? theme.colors.success : theme.colors.border};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  border: 1px solid ${({ theme }) => theme.colors.text};
`;

export const MissionTitle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

export const ProgressContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProgressText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

export const MissionRightContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const MissionReward = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 4px;
`;
