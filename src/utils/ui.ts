export const UI_CONSTANTS = {
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 300,
  BORDER_RADIUS: {
    SMALL: 8,
    MEDIUM: 16,
    LARGE: 24,
    FULL: 99,
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
  },
  ICON_SIZES: {
    SMALL: 16,
    MEDIUM: 24,
    LARGE: 32,
  },
} as const;

export const AVATAR_CONFIG = {
  BASE_URL: "https://api.dicebear.com/8.x/initials/png",
  BACKGROUND_COLOR: "FF9800",
  TEXT_COLOR: "FEFEFE",
} as const;

export const generateAvatarUrl = (username: string) =>
  `${AVATAR_CONFIG.BASE_URL}?seed=${username}&backgroundColor=${AVATAR_CONFIG.BACKGROUND_COLOR}&textColor=${AVATAR_CONFIG.TEXT_COLOR}`;
