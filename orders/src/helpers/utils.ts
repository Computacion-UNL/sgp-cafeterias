/**
 * Function that rounds a numerical value to two decimal places when needed
 * @param value
 * @returns
 */
export const roundNumber = (value: number) =>
  Math.round((value + Number.EPSILON) * 100) / 100;

/**
 * Function that gives currency format to a given number value
 * @param value
 * @returns
 */
export const currencyFormat = (value: number) =>
  `$${roundNumber(value).toFixed(2)}`;
