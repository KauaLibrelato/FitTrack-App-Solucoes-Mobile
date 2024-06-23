import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/context/Theme/ThemeProvider";
import Routes from "./src/routes";
import { Dimensions, StatusBar } from "react-native";
import ToastManager from "toastify-react-native";
import { LocaleConfig } from "react-native-calendars";
import { monthsNames } from "./src/utils/monthsNames";
import { AuthProvider } from "./src/context/Auth/AuthProvider";

export default function App() {
  const queryClient = new QueryClient();

  LocaleConfig.locales["br"] = {
    monthNames: monthsNames,
    monthNamesShort: [
      "Jan.",
      "Fev.",
      "Mar",
      "Abr.",
      "Maio",
      "Jun.",
      "Jul.",
      "Ago.",
      "Set.",
      "Out.",
      "Nov.",
      "Dez.",
    ],
    dayNames: [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ],
    dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."],
  };

  LocaleConfig.defaultLocale = "br";

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ThemeProvider>
            <AuthProvider>
              <>
                <ToastManager
                  width={Dimensions.get("window").width - 64}
                  duration={3000}
                  theme={"dark"}
                />
                <StatusBar barStyle="light-content" backgroundColor="#141516" />
                <Routes />
              </>
            </AuthProvider>
          </ThemeProvider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
