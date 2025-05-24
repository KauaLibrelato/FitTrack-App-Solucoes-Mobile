import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import "react-native-gesture-handler/jestSetup";

jest.mock("react-native/Libraries/TurboModule/TurboModuleRegistry", () => ({
  getEnforcing: () => ({}),
}));

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
  useFocusEffect: jest.fn(),
}));

jest.mock("styled-components/native", () => ({
  useTheme: () => ({
    colors: {
      primary: "#FF9800",
      background: "#141516",
      text: "#FEFEFE",
      error: "#FF5722",
      success: "#4CAF50",
      border: "rgba(255, 255, 255, 0.1)",
      placeholder: "#484848",
      disabled: "#adadad",
      surface: "#090909",
    },
  }),
}));

jest.mock("toastify-react-native", () => ({
  Toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: {
        use: jest.fn(),
      },
      response: {
        use: jest.fn(),
      },
    },
  })),
}));

global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
