import jsQR from "jsqr";
import { Point } from "jsqr/dist/locator";

/**
 * QRコードリーダー
 */
export class QrCodeReader {
  /**
   * 最後に読み取った値
   */
  private qrData: string | null = null;
  /**
   * setTimeoutのID
   */
  private timeoutId: number | null = null;
  /**
   * video要素
   */
  private readonly video: HTMLVideoElement;
  /**
   * canvasのrender
   */
  private readonly ctx: CanvasRenderingContext2D;

  /**
   * コンストラクタ
   * @param canvasElement カメラ映像を描画する `Canvas` 要素
   * @param canvasWidth `Canvas` 要素の幅
   * @param canvasHeight `Canvas` 要素の高さ
   * @param {QrCodeMaker~onReadQrCodeCallback} callback QRコードを読み取ったときに実行されるコールバック関数
   */
  constructor(
    private readonly canvas: HTMLCanvasElement,
    public canvasWidth: number,
    public canvasHeight: number,
    private readonly callback: (qrData: string) => void
  ) {
    if (!this.isSupportMediaDevices) {
      throw new BrowserNotSupport();
    }
    this.video = document.createElement("video");
    this.ctx = this.canvas.getContext("2d")!;
  }

  /**
   * 画像データからQRコードを読み取る
   * @param image 画像データ
   * @returns QRコードが読み取れた場合はQRコードの内容を返し見つからなかったときは `null` を返す
   * @throws {FileNotImage, FileNotFoundQrCode}
   */
  static async readQrFromImageFile(file: File): Promise<string> {
    const imageData = await QrCodeReader.convertFileToImageData(file);
    const qr = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });
    if (qr == null) {
      throw new FileNotFoundQrCode();
    }
    return qr.data;
  }

  /**
   * QRコードの読み取りを開始する
   * @throws {AlreadyStarted, CameraNotFound, CameraForbidden}
   */
  async startReading(): Promise<void> {
    if (this.timeoutId) {
      throw new AlreadyStarted();
    }
    const stream = await this.getMediaStream();
    this.video.srcObject = stream!;
    this.video.setAttribute("playsinline", "true");
    this.video.play();
    this.timeoutId = window.setInterval(() => {
      requestAnimationFrame(this.tick.bind(this));
    }, 20);
  }

  /**
   * QRコード読み取りを停止する
   * @throws {AlreadyStoped}
   */
  stopReading(): void {
    if (!this.timeoutId) {
      throw new AlreadyStoped();
    }
    if (this.timeoutId) {
      window.clearInterval(this.timeoutId);
      this.timeoutId = null;
      this.qrData = null;
    }
    (this.video.srcObject as MediaStream)
      .getTracks()
      .forEach((track) => track.stop());
    this.video.srcObject = null;
  }

  /**
   * ブラウザがmediaDevicesをサポートするか確認する
   * @returns サポートされている場合 `true`
   */
  private isSupportMediaDevices(): boolean {
    const constraints = navigator.mediaDevices.getSupportedConstraints();
    return (
      !!constraints.aspectRatio &&
      !!constraints.width &&
      !!constraints.height &&
      !!constraints.facingMode
    );
  }

  /**
   * MediaStreamを取得する
   * @returns QR読み取りに利用するMediaStream
   * @throws {CameraForbidden, CameraNotFound, DOMException}
   */
  private async getMediaStream(): Promise<MediaStream> {
    try {
      return await navigator.mediaDevices.getUserMedia({
        video: {
          width: this.canvasWidth,
          height: this.canvasHeight,
          facingMode: "environment",
          aspectRatio: this.canvasWidth / this.canvasHeight,
        },
      });
    } catch (error) {
      if (error.name == "NotAllowedError") {
        throw new CameraForbidden();
      } else if (error.name == "NotFoundError") {
        throw new CameraNotFound();
      } else {
        throw error;
      }
    }
  }

  /**
   * FileをImageDataに変換する
   * @param file 画像ファイル
   * @returns ImageDataに変換された画像データ
   * @throws {FileNotImage}
   */
  private static convertFileToImageData(file: File): Promise<ImageData> {
    if (!file.type.startsWith("image/")) {
      throw new FileNotImage();
    }
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const image = new Image();
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(ctx.getImageData(0, 0, canvas.width, canvas.height));
      };
      image.onerror = (e) => reject(e);
      image.src = URL.createObjectURL(file);
    });
  }

  /**
   * QRコードの読み取り
   */
  private tick() {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
      this.ctx.drawImage(
        this.video,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      const imageData = this.ctx.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        this.highlight(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          code.location.bottomLeftCorner,
          code.location.bottomRightCorner
        );
        if (this.qrData != code.data) {
          this.qrData = code.data;
          this.callback(code.data);
        }
      }
    }
  }

  /**
   * QRコードを赤枠で囲ってハイライトする
   * @param topOfLeft 左上座標
   * @param topOfRight 右上座標
   * @param bottomOfLeft 左下座標
   * @param bottomOfRight 右下座標
   */
  private highlight(
    topOfLeft: Point,
    topOfRight: Point,
    bottomOfLeft: Point,
    bottomOfRight: Point
  ): void {
    this.ctx.beginPath();
    this.ctx.moveTo(topOfLeft.x, topOfLeft.y);
    this.ctx.lineTo(topOfRight.x, topOfRight.y);
    this.ctx.lineTo(bottomOfRight.x, bottomOfRight.y);
    this.ctx.lineTo(bottomOfLeft.x, bottomOfLeft.y);
    this.ctx.closePath();
    this.ctx.lineWidth = 8;
    this.ctx.strokeStyle = "#F44336";
    this.ctx.stroke();
  }
}

/**
 * 読み取りの重複開始エラー
 */
export class AlreadyStarted extends Error {
  constructor(e = "既に読み取りは開始されています") {
    super(e);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * 読み取りの重複停止エラー
 */
export class AlreadyStoped extends Error {
  constructor(e = "既に読み取りは停止されています") {
    super(e);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * 非対応ブラウザエラー
 */
export class BrowserNotSupport extends Error {
  constructor(e = "このブラウザでは利用できません") {
    super(e);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * カメラが存在しないエラー
 */
export class CameraNotFound extends Error {
  constructor(e = "有効なカメラが見つかりません") {
    super(e);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * カメラへのアクセス権限エラー
 */
export class CameraForbidden extends Error {
  constructor(e = "カメラへのアクセス権がありません") {
    super(e);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * ファイルフォーマットエラー
 */
export class FileNotImage extends Error {
  constructor(e = "画像以外のファイルは読み込めません") {
    super(e);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * 画像にQRコードが存在しないエラー
 */
export class FileNotFoundQrCode extends Error {
  constructor(e = "画像内からQRコードを読み取れませんでした") {
    super(e);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
