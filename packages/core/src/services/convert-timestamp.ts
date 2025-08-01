export const convertTimestamp = (hrTime: readonly [number, number]): Date => {
  const milliseconds = hrTime[0] * 1000 + hrTime[1] / 1_000_000;

  return new Date(milliseconds);
};
