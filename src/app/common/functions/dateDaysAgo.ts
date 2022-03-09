export const dateDaysAgo = (numDays: number) => {
  const date = new Date();
  date.setDate(date.getDate() - numDays);
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds()
  );
};
