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

export const TypeCardContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px;
`;

export const TypeName = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 8px;
`;
