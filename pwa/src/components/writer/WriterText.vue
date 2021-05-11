<template>
  <v-row>
    <v-col cols="12">QRコードにしたいテキストを入力してください。</v-col>
    <v-col cols="12">
      <base-textarea
        v-model="text"
        label="テキスト"
        icon="notes"
        :rules="[rules.required]"
      ></base-textarea>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, VModel, Vue } from "vue-property-decorator";
import BaseTextarea from "../base/BaseTextarea.vue";

@Component({ components: { BaseTextarea } })
export default class WriterUrl extends Vue {
  /**
   * 入力されたテキスト
   */
  @VModel({ type: String, required: true }) text!: string;

  rules = {
    required: (value: string): string | boolean => !!value || "必須項目です",
  };
}
</script>
