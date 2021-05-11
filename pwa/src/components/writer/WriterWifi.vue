<template>
  <div>
    <v-row>
      <v-col cols="12">
        読み取ることでWi-Fiに接続できるQRコードを作成できます。
        <br />
        接続したいWi-Fiの情報を入力してください。
      </v-col>
      <v-col cols="12">
        <base-text-field
          v-model="ssid"
          icon="wifi"
          label="SSID"
          :rules="[rules.required]"
        ></base-text-field>
        <base-text-field
          v-model="password"
          icon="password"
          label="パスワード"
          :rules="[rules.required]"
        ></base-text-field>
        <base-select
          v-model="encrypt"
          icon="lock"
          label="暗号化方式"
          :items="encrypts"
          :rules="[rules.required]"
        ></base-select>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import BaseTextField from "../base/BaseTexField.vue";
import BaseSelect, { BaseSelectItem } from "../base/BaseSelect.vue";
import { serializeWifiInfo } from "../../models/utils/textUtility";
import { WifiEncrypts } from "../../models/types";

@Component({ components: { BaseTextField, BaseSelect } })
export default class WriterUrl extends Vue {
  @Prop({ type: String, required: true }) value!: string;
  encrypts: Array<BaseSelectItem> = [
    {
      value: "WPA",
      text: "WPA/WPA2",
    },
    {
      value: "WEP",
      text: "WEP",
    },
    {
      value: "",
      text: "暗号化なし",
    },
  ];

  ssid = "";
  password = "";
  encrypt: WifiEncrypts = "WPA";

  @Watch("ssid")
  @Watch("password")
  @Watch("encrypt")
  @Emit("input")
  onChange(): string {
    return serializeWifiInfo(this.ssid, this.password, this.encrypt);
  }

  rules = {
    required: (value: string): string | boolean => !!value || "必須項目です",
  };
}
</script>
