<template>
  <div>
    <v-btn :block="isBlock" @click="copy">
      <v-icon>content_copy</v-icon>
      {{ btnText }}
    </v-btn>
    <base-snackbar
      v-model="isShowSnackbar"
      :text="snackbarText"
      :snackbar-type="snackbarType"
    ></base-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator";
import BaseSnackbar from "./BaseSnackbar.vue";
import { SnackbarColor } from "../../models/types";

@Component({ components: { BaseSnackbar } })
export default class BaseCopyToClipboardBtn extends Vue {
  /**
   * クリップボードにコピーするテキスト
   */
  @VModel({ type: String, required: true }) text!: string;

  /**
   * ボタンをblockスタイルにするかどうか
   */
  @Prop({ type: Boolean, default: false }) isBlock!: boolean;

  /**
   * ボタンに表示するテキスト
   */
  @Prop({ type: String, default: "クリップボードにコピー" }) btnText!: string;

  snackbarColor: SnackbarColor = "info";
  snackbarText = "";
  isShowSnackbar = false;

  copy(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.text);
      this.snackbarColor = "info";
      this.snackbarText = "クリップボードにコピーしました。";
    } else {
      this.snackbarColor = "warning";
      this.snackbarText = "クリップボードへのコピーに失敗しました。";
    }
    this.isShowSnackbar = true;
  }
}
</script>
