import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px 0;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 16px 32px;
`;

export const ExerciseDetails = styled.View`
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px;
`;

export const ExerciseSpaceContainer = styled.View``;

export const ExerciseLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.disabled};
`;

export const ExerciseValue = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export const BottomSpacer = styled.View`
  height: 80px;
`;
