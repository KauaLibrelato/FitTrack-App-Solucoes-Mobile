export const API_CONFIG = {
  BASE_IP: "https://meu-backend-hlag.onrender.com",
  BASE_PATH: "/api/client",
  TIMEOUT: 10000,
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  USER: {
    INFO: "/user/info",
    UPDATE: "/user/update",
    DELETE: "/user/delete",
    LIST: "/user/list",
    UPDATE_PASSWORD: "/user/update/password", // NOSONAR
  },
  WORKOUT: {
    START: "/workout/start",
    FINISH: "/workout/finish",
    LIST: "/workout/list",
    DELETE: "/workout/delete",
    TYPES_LIST: "/workout/types-list",
  },
  FRIENDSHIP: {
    SEND_INVITATION: "/friendship/send-invitation",
    LIST: "/friendship/list",
    ACCEPT_INVITATION: "/friendship/accept-invitation",
    DELETE: "/friendship/delete",
  },
  MISSION: {
    LIST: "/mission/list",
    COLLECT: "/mission/collect",
  },
  RANKING: {
    GENERAL: "/ranking/general",
    FRIENDS: "/ranking/friends",
  },
  HOME: {
    METRICS: "/home/metrics",
  },
} as const;

export const getBaseUrl = () => `${API_CONFIG.BASE_IP}${API_CONFIG.BASE_PATH}`;
