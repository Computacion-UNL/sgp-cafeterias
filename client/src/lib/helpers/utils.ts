import { Permissions, Roles } from "@cafetho/shared";
import { ErrorModel, PermissionModel } from "@types";
import { UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

/**
 * Email RegExp
 */
export const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Only Letters RegExp
 */
export const onlyLettersRegExp = /^[a-zA-ZÁ-ź\s\u00F1]*$/;

/**
 * Only Letters with no spaces RegExp
 */
export const lettersNoSpacesRegExp = /^[a-zA-ZÁ-ź\u00F1]*$/;

/**
 * Letters and numbers RegExp
 */
export const lettersNumbersRegExp = /^[a-zA-ZÁ-ź\s0-9\u00F1]*$/;

/**
 * slug RegExp
 */
export const slugRegExp = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Non-whitespaces RegExp
 */
export const nonWhitespacesRegExp = /^\S*$/;

/**
 * Function that handles the error of a form,
 * focusing on the field that caused the error.
 * @param err
 * @param setError
 * @param withToast
 */
export const handleFormError = <T = any>(
  err: ErrorModel.Response<T>,
  setError: UseFormSetError<T>,
  withToast: boolean = true
) => {
  for (const error of err.errors) {
    if (withToast) toast.error(error.message);

    if (error.field)
      setError(error.field, { message: error.message }, { shouldFocus: true });
  }
};

/**
 * Function to send alerts on errors received in the request
 * @param err
 */
export const toastErrors = <T = any>(err: ErrorModel.Response<T>) => {
  for (const error of err.errors) {
    toast.error(error.message);
  }
};

/**
 * Function that returns a random color by means of a given string.
 * @param string
 * @returns
 */
export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
};

/**
 * Function that obtains the initial two letters of a name
 * @param name
 * @returns
 */
export const getInitials = (name: string = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

/**
 * Function that allows to obtain if the current user has access to a certain resource
 * @param roles
 * @param role
 * @returns
 */
export const hasAccess = (roles: Roles[], role?: string) =>
  !!role && roles.includes(role as Roles);

/**
 * Function that determines whether the current user's permissions allow access to a certain resource
 * @param currentPermissions
 * @param permission
 * @returns
 */
export const hasPermission = (
  currentPermissions: PermissionModel.Response[],
  permission?: Permissions
) =>
  !permission ||
  currentPermissions.some(
    (currentPermission) => currentPermission.name === permission
  );

/**
 * Function to capitalize the input chain
 * @param str
 * @returns
 */
export const titleCase = (str: string) => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
};

/**
 * Function for removing an empty parameter from an object
 * @param obj
 * @returns
 */
export const removeEmpty = (obj: { [key: string]: any }) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== null && v !== "")
  );
};

/**
 * Funtion that convert a string to slug format
 * @param str
 * @returns
 */
export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Function that allows you to convert the data type of a field to a string,
 * this function is useful when the field data comes from an input
 * that does not directly deliver the field as a string and you need to convert it.
 * @param values
 * @param keys
 * @param subKey
 * @returns
 */
export const sanitazeObjectIds = <T extends Record<string, any>>(
  values: T,
  keys: (keyof T)[],
  subKey: string = "id"
) => {
  for (const key of keys) {
    let field = values[key];
    if (field && typeof field !== "string") values[key] = field[subKey];
  }
  return values;
};

/**
 * Function that returns a string with a random color in hexadecimal format.
 * @returns
 */
export const randomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);

/**
 * Function to convert a set of bytes to a readable format.
 * @param bytes
 * @param decimals
 * @returns
 */
export const formatBytes = (bytes: number, decimals: number = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/**
 * Function for converting an object into a FormData
 * @param object
 * @returns
 */
export const getFormData = (object: any) =>
  Object.keys(object).reduce((formData, key) => {
    const objectValue = object[key];
    if (objectValue instanceof FileList) {
      for (const fileKey of Object.keys(objectValue)) {
        formData.append(key, objectValue[parseInt(fileKey)]);
      }
      return formData;
    }

    if (Array.isArray(objectValue)) {
      formData.append(key, JSON.stringify(objectValue));
      return formData;
    }

    formData.append(key, objectValue);
    return formData;
  }, new FormData());

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
