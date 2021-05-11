<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <base-text-field
          v-model="ssid"
          icon="wifi"
          label="SSID"
          :is-readonly="true"
        ></base-text-field>
        <base-text-field
          v-model="password"
          icon="password"
          label="パスワード"
          :is-readonly="true"
        ></base-text-field>
        <base-select
          v-model="encrypt"
          icon="lock"
          label="暗号化方式"
          :items="[]"
          :is-readonly="true"
        ></base-select>
      </v-col>
      <v-col cols="12">
        <base-copy-to-clipboard-btn
          v-model="ssid"
          btn-text="SSIDをコピーする"
          :is-block="true"
        ></base-copy-to-clipboard-btn>
      </v-col>
      <v-col cols="12">
        <base-copy-to-clipboard-btn
          v-model="ssid"
          btn-text="パスワードをコピーする"
          :is-block="true"
        ></base-copy-to-clipboard-btn>
      </v-col>
      <base-snackbar
        v-model="isSnackbarShow"
        :snackbar-type="snackbarType"
        :text="snackbarText"
      ></base-snackbar>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseTextField from "../base/BaseTexField.vue";
import BaseCopyToClipboardBtn from "../base/BaseCopyToClipboardBtn.vue";

@Component({ components: { BaseTextField, BaseCopyToClipboardBtn } })
export default class ReadResultWifi extends Vue {
  @Prop({ type: String }) ssid!: string;
  @Prop({ type: String }) password!: string;
  @Prop({ type: String }) encrypt!: string;
}
</script>
