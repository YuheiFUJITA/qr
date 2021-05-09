<template>
  <v-textarea
    v-model="text"
    :prepend-inner-icon="icon"
    :label="label"
    :rules="rules"
    :disabled="isDisabled"
    :readonly="isReadonly"
    outlined
    auto-grow
  ></v-textarea>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator";

@Component
export default class BaseTextarea extends Vue {
  /**
   * テキストフィールドに入力された値
   */
  @VModel({ type: String, required: true }) text!: string;

  /**
   * ラベル
   */
  @Prop({ type: String, default: undefined }) readonly label!: string;

  /**
   * アイコン
   */
  @Prop({ type: String, default: undefined }) readonly icon: string | undefined;

  /**
   * バリデーションルール
   */
  @Prop({ type: Array, default: () => [] }) readonly rules!: Array<
    string | boolean | ((value: string) => boolean)
  >;

  /**
   * 無効にするかどうか
   */
  @Prop({ type: Boolean, default: false }) readonly isDisabled!: boolean;

  /**
   * 読み取り専用にするかどうか
   */
  @Prop({ type: Boolean, default: false }) readonly isReadonly!: boolean;
}
</script>
