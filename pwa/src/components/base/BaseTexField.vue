<template>
  <v-text-field
    v-model="text"
    :prepend-inner-icon="icon"
    :label="label"
    :rules="rules"
    :readonly="isReadonly"
    :disabled="isDisabled"
    outlined
  ></v-text-field>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator";

@Component
export default class BaseTextField extends Vue {
  /**
   * テキストフィールドに入力された値
   */
  @VModel({ type: String, required: true }) text!: string;

  /**
   * ラベル
   */
  @Prop({ type: String, required: true }) readonly label!: string;

  /**
   * アイコン
   */
  @Prop({ type: String, default: undefined }) readonly icon: string | undefined;

  /**
   * バリデーションルール
   */
  @Prop({ type: Array, default: [] }) readonly rules!: Array<
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
