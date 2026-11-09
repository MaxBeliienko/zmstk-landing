// Тестування, кабінети і журнал переїхали в ПДРчик. Лендінг лише веде туди.
// Для перевірки на превʼю можна задати іншу адресу через VITE_PDRCHYK_URL.
export const PDRCHYK_URL = (import.meta.env.VITE_PDRCHYK_URL || "https://pdrchyk.com.ua").replace(/\/$/, "");
export const PDRCHYK_LOGIN = `${PDRCHYK_URL}/auth`;
