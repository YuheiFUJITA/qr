import { WifiEncrypts, WifiInfo } from "../types";

const WIFI_PATTERN = /^WIFI:S:(.+);T:(WPA|WEP)?;P:(.+);;$/;
const URL_PATTERN = /^https?:\/\/.+$/;

/**
 * 文字列がURLかどうか
 * @param text 検証対象文字列
 * @returns 検証結果
 */
export function isUrl(text: string): boolean {
  return URL_PATTERN.test(text);
}

/**
 * 文字列がWi-Fi接続用QRフォーマットかどうか
 * @param text 検証対象文字列
 * @returns 検証結果
 */
export function isWifiInfoFormat(text: string): boolean {
  return WIFI_PATTERN.test(text);
}

/**
 * Wi-Fi接続用QRフォーマット文字列からWi-Fi接続情報にデシリアライズする
 * @param text Wi-Fi接続用QRフォーマット文字列
 * @returns デシリアライズされたWi-Fi接続情報
 * @throws {NotWifiFormatText}
 */
export function deserializeWifiInfo(text: string): WifiInfo {
  if (!isWifiInfoFormat(text)) {
    throw new NotWifiFormatText();
  }
  const values = text.match(WIFI_PATTERN);
  return {
    ssid: values![1],
    password: values![3],
    encrypt: values![2] as WifiEncrypts,
  };
}

/**
 * Wi-Fi接続情報からWi-Fi接続用QRフォーマットにシリアライズする
 * @param ssid SSID
 * @param password パスワード
 * @param encrypt 暗号化方式
 * @returns Wi-Fi接続用QRフォーマットにシリアライズ化された文字列
 */
export function serializeWifiInfo(
  ssid: string,
  password: string,
  encrypt: WifiEncrypts
): string {
  return `WIFI:S:${ssid};T:${encrypt};P:${password};;`;
}

export class NotWifiFormatText extends Error {
  constructor(e = "Wi-Fi接続用QRフォーマットではありません") {
    super(e);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
