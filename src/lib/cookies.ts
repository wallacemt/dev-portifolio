import Cookies from "js-cookie";

export const AUTH_COOKIE_NAME = "authToken";
export const LANGUAGE_COOKIE_NAME = "preferredLanguage";

export const cookieUtils = {
  setAuthToken: (token: string) => {
    Cookies.set(AUTH_COOKIE_NAME, token, {
      expires: 7, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  getAuthToken: () => {
    return Cookies.get(AUTH_COOKIE_NAME);
  },

  removeAuthToken: () => {
    Cookies.remove(AUTH_COOKIE_NAME);
  },

  setLanguage: (language: string) => {
    Cookies.set(LANGUAGE_COOKIE_NAME, language, {
      expires: 365, // 1 year
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  getLanguage: () => {
    return Cookies.get(LANGUAGE_COOKIE_NAME) || "pt";
  },

};
