import styled from "styled-components/native";

export const ContainerModal = styled.View`
  padding: 16px;
`;

export const HeaderModal = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TitleModal = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 8px;
`;

export const XButtonModal = styled.Pressable`
  padding: 8px;
  margin: -8px;
`;

export const ContentModal = styled.View`
  margin-top: 16px;
`;

export const MissionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const MissionDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 8px;
`;

export const ProgressContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProgressText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

export const MissonRewardContainer = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
`;

export const MissonRewardTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const MissonRewardDescription = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin: 2px 0 0 2px;
`;
