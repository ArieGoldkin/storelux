export const activeMessages = (mes) => {
  let count = 0;
  for (const key in mes) {
    if (mes[key].active) {
      count++;
    }
  }
  return count;
};
