import Cookies from "js-cookie";

export const AUTH_COOKIE_NAME = "authToken";
export const LANGUAGE_COOKIE_NAME = "preferredLanguage";

// Verifica se está executando no lado do cliente
const isClient = typeof window !== "undefined";

// Função para obter cookies no servidor (async)
const getServerCookie = async (name: string): Promise<string | null> => {
  if (!isClient) {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const cookie = cookieStore.get(name);
      return cookie?.value || null;
    } catch {
      return null;
    }
  }
  return null;
};

export const cookieUtils = {
  setAuthToken: (token: string) => {
    if (isClient) {
      Cookies.set(AUTH_COOKIE_NAME, token, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }
  },

  getAuthToken: () => {
    if (isClient) {
      const token = Cookies.get(AUTH_COOKIE_NAME);
      return token !== undefined ? token : null;
    }
    // No servidor, retorna null - usar getServerAuthToken para casos assíncronos
    return null;
  },

  getServerAuthToken: async (): Promise<string | null> => {
    return await getServerCookie(AUTH_COOKIE_NAME);
  },

  removeAuthToken: () => {
    if (isClient) {
      Cookies.remove(AUTH_COOKIE_NAME);
    }
  },

  setLanguage: (language: string) => {
    if (isClient) {
      Cookies.set(LANGUAGE_COOKIE_NAME, language, {
        expires: 365, // 1 year
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }
  },

  getLanguage: () => {
    if (isClient) {
      return Cookies.get(LANGUAGE_COOKIE_NAME) || "pt";
    }
    return "pt";
  },

  getServerLanguage: async (): Promise<string> => {
    const language = await getServerCookie(LANGUAGE_COOKIE_NAME);
    return language || "pt";
  },
};
