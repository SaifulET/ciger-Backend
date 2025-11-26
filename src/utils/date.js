export const getCurrentMonthYear = () => {
  const date = new Date();

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return {
    month: months[date.getMonth()],
    year: String(date.getFullYear())
  };
};
