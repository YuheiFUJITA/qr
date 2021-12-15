export type QrType = "url" | "text" | "wifi";
export type SnackbarColor = "info" | "warning";
export type WifiEncrypts = "WPA" | "WEP" | "";
export type Theme = "dark" | "light" | "system";
export type LaunchView = "Home" | "Reader" | "Writer";
export interface WifiInfo {
  ssid: string;
  password: string;
  encrypt: WifiEncrypts;
}
