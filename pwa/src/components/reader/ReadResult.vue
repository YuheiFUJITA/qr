<template>
  <div>
    <base-full-screen-dialog v-model="isOpen" title="読み取り結果">
      <read-result-wifi
        v-if="isWifi"
        :ssid="ssid"
        :password="password"
        :encrypt="encrypt"
      ></read-result-wifi>
      <read-result-url-or-text
        v-else
        label=""
        :text-or-url="resultText"
      ></read-result-url-or-text>
    </base-full-screen-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import BaseFullScreenDialog from "../base/BaseDialog.vue";
import ReadResultUrlOrText from "./ReadResultUrlOrText.vue";
import ReadResultWifi from "./ReadResultWifi.vue";
import {
  isWifiInfoFormat,
  deserializeWifiInfo,
} from "../../models/utils/textUtility";

@Component({
  components: { BaseFullScreenDialog, ReadResultUrlOrText, ReadResultWifi },
})
export default class ReadResult extends Vue {
  @VModel({ type: Boolean, default: false }) isOpen!: boolean;
  @Prop({ type: String, default: "" }) resultText!: string;

  isWifi = isWifiInfoFormat(this.resultText);

  get urlOrText(): string {
    if (isWifiInfoFormat(this.resultText)) {
      return "";
    } else {
      return this.resultText;
    }
  }

  get ssid(): string {
    if (isWifiInfoFormat(this.resultText)) {
      return deserializeWifiInfo(this.resultText).ssid;
    } else {
      return "";
    }
  }
  get password(): string {
    if (isWifiInfoFormat(this.resultText)) {
      return deserializeWifiInfo(this.resultText).password;
    } else {
      return "";
    }
  }
  get encrypt(): string {
    if (isWifiInfoFormat(this.resultText)) {
      return deserializeWifiInfo(this.resultText).encrypt;
    } else {
      return "";
    }
  }
}
</script>
