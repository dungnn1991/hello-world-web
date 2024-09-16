import { getDeveloperAccessToken } from "zmp-developer-token";
import { closeApp, getAccessToken, getStorage, setStorage } from "zmp-sdk/apis";

export const findAccessToken = async () => {
  try {
    let token = await getAccessToken({});
    if (!token) {
      throw import.meta.env.DEV;
    }
    return token;
  } catch (isDevOtherwiseError) {
    if (isDevOtherwiseError === true) {
      return await getDeveloperAccessToken();
    }
    throw new Error("Failed to get token!");
  }
};

export const closeMiniApp = async () => {
  try {
    await closeApp();
  } catch (error) {}
};

export const setDataToStorage = async (data: Record<string, any>) => {
  try {
    await setStorage({ data });
  } catch (error) {}
};

export const getDataFromStorage = async (key: string) => {
  try {
    const { [key]: rs } = await getStorage({
      keys: [key],
    });
    return rs;
  } catch (error) {}
};
