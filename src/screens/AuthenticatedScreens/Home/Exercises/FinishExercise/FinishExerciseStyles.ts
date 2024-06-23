import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px 0;
`;

export const Content = styled.View`
  flex: 1;
  padding: 16px 32px;
`;

export const Form = styled.View``;

export const ButtonsContainer = styled.View`
  margin-top: 16px;
  align-items: center;
`;
