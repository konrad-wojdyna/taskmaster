const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export const formatTaskDate = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();

  const displayDate = dateFormatter.format(date);

  const isOverdue = date.getTime() < now.getTime();

  return {
    displayDate,
    isOverdue,
  };
};
