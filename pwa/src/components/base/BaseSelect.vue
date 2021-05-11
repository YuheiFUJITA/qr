<template>
  <v-select
    v-model="selectedValue"
    :items="items"
    :prepend-inner-icon="icon"
    :label="label"
    :disabled="isDisabled"
    :readonly="isReadonly"
    outlined
  ></v-select>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator";

export interface BaseSelectItem {
  /**
   * 選択時の値
   */
  value: string | number | boolean;
  /**
   * 表示文字列
   */
  text: string;
}

@Component
export default class BaseSelect extends Vue {
  /**
   * 選択中の値
   */
  @VModel({ type: String, required: true }) selectedValue!: string;

  /**
   * 選択肢
   */
  @Prop({ type: Array, required: true }) readonly items!: Array<BaseSelectItem>;

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
