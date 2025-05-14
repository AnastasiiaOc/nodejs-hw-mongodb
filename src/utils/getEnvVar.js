
import "dotenv/config";
// Щоб зчитувати та використовувати змінні оточення в додатку, потрібно буде встановити пакет dotenv 

export const getEnvVar = (name, defaultValue) => {
    const value = process.env[name];

    if(value) return value;
    if (defaultValue) return defaultValue;
    throw new Error (`Cannot find process.env[${name}]`);
    // throw new Error (`Cannot find ${value}`)???
}