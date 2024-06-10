import React from "react";
import * as S from "./CalendarStyles";
import * as CalendarComponents from "react-native-calendars";
import { View, Text } from "react-native";
import { MainHeader } from "../../../components";
import { useTheme } from "styled-components";

export function Calendar() {
  const theme = useTheme();
  return (
    <S.Container>
      <MainHeader title="Calendário" />
      <CalendarComponents.Agenda
        items={{
          "2024-06-10": [
            { name: "item 1 - any js object", day: "2024-06-10", height: 50 },
          ],
          "2024-06-11": [
            { name: "item 2 - any js object", day: "2024-06-11", height: 50 },
          ],
          "2024-06-12": [],
          "2024-06-13": [
            { name: "item 3 - any js object", day: "2024-06-12", height: 50 },
            { name: "any js object", day: "2024-06-13", height: 50 },
          ],
        }}
        loadItemsForMonth={(month) => {
          console.log("trigger items loading");
        }}
        onDayPress={(day) => {
          console.log("day pressed");
        }}
        renderItem={(item, firstItemInDay) => {
          return (
            <View>
              <Text>{item.name}</Text>
            </View>
          );
        }}
        renderEmptyDate={() => (
          <View style={{ backgroundColor: "red", width: "100%" }} />
        )}
        renderKnob={() => {
          return (
            <S.KnobContainer>
              <S.Knob />
            </S.KnobContainer>
          );
        }}
        hideKnob={false}
        showClosingKnob={true}
        renderEmptyData={() => {
          return <View />;
        }}
        calendarStyle={{
          backgroundColor: theme.colors.background,
          padding: 16,
        }}
        theme={{
          calendarBackground: theme.colors.background,
          dotColor: theme.colors.primary,
          selectedDayBackgroundColor: theme.colors.primary,
          selectedDayTextColor: theme.colors.text,
          todayTextColor: theme.colors.primary,
          dayTextColor: theme.colors.text,
          textDisabledColor: theme.colors.text,
          monthTextColor: theme.colors.text,
          textSectionTitleColor: theme.colors.text,
          backgroundColor: theme.colors.background,
          disabledDotColor: theme.colors.text,
        }}
      />
    </S.Container>
  );
}
