import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px 0;
`;
export const KnobContainer = styled.View`
  width: 100%;
  height: 16px;
  align-items: center;
  justify-content: center;
`;
export const Knob = styled.View`
  width: 64px;
  height: 4px;
  background: ${({ theme }) => theme.colors.text};
  border-radius: 2px;
`;
