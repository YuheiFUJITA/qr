<template>
  <v-card
    :width="size + 20"
    :height="size + 20"
    class="d-flex justify-center align-center"
  >
    <canvas id="canvas" :width="size" :height="size"></canvas>
  </v-card>
</template>

<script lang="ts">
import { Component, Emit, VModel, Vue, Watch } from "vue-property-decorator";
import { QrCodeReader } from "../../models/QrCodeReader";

@Component
export default class ReaderQrCanvas extends Vue {
  /**
   * 読み取りを開始しているかどうか
   */
  @VModel({ type: Boolean, required: true }) isReading!: boolean;

  size = 250;
  canvas!: HTMLCanvasElement;
  reader!: QrCodeReader;

  mounted(): void {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.reader = new QrCodeReader(
      this.canvas,
      this.size,
      this.size,
      this.onRead
    );

    this.reader.startReading();
    this.isReading = true;
  }

  destroyed(): void {
    this.reader.stopReading();
    this.isReading = false;
  }

  /**
   * QRコードの読み取り時に発火するイベント
   * @returns 読み取り結果
   */
  @Emit()
  onRead(value: string): string {
    return value;
  }

  @Watch("isReading")
  toggleCamera(value: boolean): void {
    if (value) {
      this.reader.startReading();
    } else {
      this.reader.stopReading();
    }
  }
}
</script>
