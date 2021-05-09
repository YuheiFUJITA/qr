<template>
  <v-row>
    <v-col cols="12">QRコードにしたいURLを入力してください。</v-col>
    <v-col cols="12">
      <base-text-field
        v-model="url"
        label="URL"
        icon="link"
        :rules="[rules.required, rules.url]"
      ></base-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, VModel, Vue } from "vue-property-decorator";
import BaseTextField from "../base/BaseTexField.vue";
import { isUrl } from "../../models/utils/textUtility";

@Component({ components: { BaseTextField } })
export default class WriterUrl extends Vue {
  /**
   * 入力されたURL
   */
  @VModel({ type: String, required: true }) url!: string;

  rules = {
    required: (value: string): string | boolean => !!value || "必須項目です",
    url: (value: string): string | boolean => {
      return isUrl(value) || "URLではないテキストです";
    },
  };
}
</script>
