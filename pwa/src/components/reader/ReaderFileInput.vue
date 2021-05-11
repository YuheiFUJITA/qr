<template>
  <v-file-input
    v-model="file"
    prepend-icon="image"
    accept="image/*"
    outlined
    label="画像ファイルから読み取り"
  ></v-file-input>
</template>

<script lang="ts">
import { Component, Emit, VModel, Vue, Watch } from "vue-property-decorator";
import { QrCodeReader } from "../../models/QrCodeReader";

@Component
export default class ReaderFileInput extends Vue {
  file: File | null = null;

  @Emit()
  onRead(value: string): string {
    return value;
  }

  @Emit()
  onReadFailed(value: string): string {
    return value;
  }

  @Watch("file")
  async readFromFile(value: File): Promise<void> {
    if (!value) {
      return;
    }
    try {
      this.onRead(await QrCodeReader.readQrFromImageFile(value));
    } catch (error) {
      this.onReadFailed((error as Error).message);
    }
  }
}
</script>
