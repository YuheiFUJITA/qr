import QRCode from "qrcode";

/**
 * QRコード生成クラス
 */
export default class QrCodeMaker {
  /**
   * base64エンコードしたQRコードを生成する
   * @param text QRコード化するテキスト
   * @returns base64エンコードされたQRコード画像
   * @throws {QrCodeMakerError}
   */
  async makeQr(text: string): Promise<string> {
    let qr: string;
    try {
      qr = await QRCode.toDataURL(text);
    } catch (error) {
      throw new QrCodeMakerError();
    }
    return qr;
  }
}

/**
 * QrMaker用のエラー
 */
class QrCodeMakerError extends Error {}
