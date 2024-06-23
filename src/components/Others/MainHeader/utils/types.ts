import { Component } from "react";

export interface IMainHeaderProps {
  iconLeft?: React.ReactNode;
  title: string;
  iconRight?: React.ReactNode;
  onPressLeft?: () => void;
  onPressRight?: () => void;
}
