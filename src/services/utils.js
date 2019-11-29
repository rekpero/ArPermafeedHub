import { APP_NAME } from "../config/globals";

export const getAppName = () => {
  if (process.env.NODE_ENV === "development") {
    return `${APP_NAME}-dev-v1`;
  }
  return APP_NAME;
};

export const currentUnixTime = () => new Date().getTime();
