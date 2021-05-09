<template>
  <v-container>
    <v-form v-model="isValid">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="6">
          <v-btn-toggle v-model="dataType" mandatory>
            <v-btn value="url">
              <v-icon left>link</v-icon>
              URL
            </v-btn>
            <v-btn value="text">
              <v-icon left>notes</v-icon>
              テキスト
            </v-btn>
            <v-btn value="wifi">
              <v-icon left>wifi</v-icon>
              Wi-Fi
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="6">
          <writer-url v-if="dataType == 'url'" v-model="url"></writer-url>
          <writer-text
            v-else-if="dataType == 'text'"
            v-model="text"
          ></writer-text>
          <writer-wifi
            v-else-if="dataType == 'wifi'"
            v-model="wifi"
          ></writer-wifi>
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="6">
          <v-btn block x-large :disabled="!isValid" @click="makeQrImage">
            QRコード作成
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <writer-result v-model="isOpenResult" :qr="result"></writer-result>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WriterUrl from "../components/writer/WriterUrl.vue";
import WriterText from "../components/writer/WriterText.vue";
import WriterWifi from "../components/writer/WriterWifi.vue";
import WriterResult from "../components/writer/WriterResult.vue";
import QrCodeMaker from "../models/QrCodeMaker";
import { QrType } from "../models/types";

@Component({
  components: {
    WriterUrl,
    WriterText,
    WriterWifi,
    WriterResult,
  },
})
export default class WriterView extends Vue {
  /**
   * 作成結果表示
   */
  isOpenResult = false;
  /**
   * データタイプ
   */
  dataType: QrType = "url";

  /**
   * URLQRコード用URL
   */
  url = "";
  /**
   * テキストQRコード用テキスト
   */
  text = "";
  /**
   * Wi-FiQRコード用テキスト
   */
  wifi = "";

  /**
   * Qrオブジェクト
   */
  result = "";

  isValid = false;

  qrCodeMaker = new QrCodeMaker();

  /**
   * dataTypeに基づいたQRコード用テキスト
   */
  get qrData(): string {
    switch (this.dataType) {
      case "url":
        return this.url;
      case "text":
        return this.text;
      case "wifi":
        return this.wifi;
      default:
        return "";
    }
  }

  async created(): Promise<void> {
    if (this.$route.query.s) {
      this.result = await this.qrCodeMaker.makeQr(
        this.$route.query.s as string
      );
      this.isOpenResult = true;
    }
  }

  async makeQrImage(): Promise<void> {
    this.result = await this.qrCodeMaker.makeQr(this.qrData);
    this.isOpenResult = true;
  }
}
</script>
