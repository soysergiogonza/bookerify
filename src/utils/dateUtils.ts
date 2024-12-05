export const isToday = (date: string) => {
  const today = new Date();
  const targetDate = new Date(date);
  return (
    today.getDate() === targetDate.getDate() &&
    today.getMonth() === targetDate.getMonth() &&
    today.getFullYear() === targetDate.getFullYear()
  );
}; 