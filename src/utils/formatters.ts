export function formatTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes);
  const minutes = Math.round((totalMinutes % 1) * 60);

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}`;
}

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("pt-BR");
};

export const formatUserLevel = (level: number): string => `Nível ${level}`;

export const formatExperiencePoints = (points: number): string => `+${points} XP`;
