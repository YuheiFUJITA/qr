<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-spacer></v-spacer>
      <v-col>
        <v-row>
          <v-col>
            <reader-qr-canvas
              v-model="isReading"
              @on-read="openResultDialog"
            ></reader-qr-canvas>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <reader-file-input
              @on-read="openResultDialog"
              @on-read-failed="restartReading"
            ></reader-file-input>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <read-result v-model="isOpenResult" :result-text="readResult"></read-result>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import ReaderQrCanvas from "../components/reader/ReaderQrCanvas.vue";
import ReaderFileInput from "../components/reader/ReaderFileInput.vue";
import ReadResult from "../components/reader/ReadResult.vue";

@Component({
  components: { ReaderQrCanvas, ReaderFileInput, ReadResult },
})
export default class ReaderView extends Vue {
  isReading = true;
  isOpenResult = false;
  readResult = "";

  @Watch("isOpenResult")
  onCloseResult(value: boolean): void {
    if (!value) {
      this.isReading = true;
    }
  }

  openResultDialog(readResult: string): void {
    this.isReading = false;
    this.readResult = readResult;
    this.isOpenResult = true;
  }

  restartReading(): void {
    this.isReading = true;
  }
}
</script>
