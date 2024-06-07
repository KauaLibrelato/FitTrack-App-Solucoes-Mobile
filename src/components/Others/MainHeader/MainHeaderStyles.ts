import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px 16px 0px 16px;
  justify-content: space-between;
`;

export const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LeftButton = styled.TouchableOpacity`
  padding: 8px;
  margin: -8px;
`;

export const RightButton = styled.TouchableOpacity`
  padding: 8px;
  margin: -8px;
`;

export const HeaderTitle = styled.Text<{ iconLeft?: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-left: ${({ iconLeft }) => (iconLeft ? 8 : 0)}px;
`;
