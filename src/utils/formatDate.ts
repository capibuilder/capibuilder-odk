import moment from "moment";

/**
 * The function `formatDate` takes a string representing a date in the format "DD/MM/YYYY" and returns
 * a formatted string in the format "Do MMM, YYYY".
 * @param {string} dateString - The dateString parameter is a string representing a date in the format
 * "DD/MM/YYYY".
 * @returns The function `formatDate` is returning a formatted date string in the format of "Do
 * MMM,YYYY". The input `dateString` is first split by "/", then reversed, and finally joined by "-" to
 * create a valid date string. This string is then passed to the `moment` function to create a moment
 * object, which is then formatted using the specified format string.
 */
export const formatDate = (dateString: string, format?: string) => {
  return moment(String(dateString)?.split("/")?.reverse()?.join("-")).format(
    format || "Do MMM,YYYY"
  );
};
