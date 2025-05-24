import styled from "styled-components/native";
import { UI_CONSTANTS } from "../../../utils/ui";

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${UI_CONSTANTS.SPACING.MD}px;
`;

export const Message = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${UI_CONSTANTS.SPACING.SM}px;
  text-align: center;
`;
