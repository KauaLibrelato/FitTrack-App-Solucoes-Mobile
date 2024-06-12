import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px 0;
`;

export const Content = styled.View`
  padding: 16px 32px;
`;

export const ExerciseContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 16px;
  margin-bottom: 16px;
`;

export const ExerciseTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ExerciseType = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 8px;
`;

export const ExerciseDateTimeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

export const ExerciseDate = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.disabled};
`;

export const ExerciseTimeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 8px;
`;

export const ExerciseTime = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.disabled};
  margin-left: 4px;
`;

export const AddExerciseButton = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 48px;
  height: 48px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 24px;
  right: 16px;
`;
