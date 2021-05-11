<template>
  <v-radio-group v-model="selectedValue" :row="direction == 'row'">
    <v-radio
      v-for="item in items"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></v-radio>
  </v-radio-group>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator";

export interface BaseRadioGroupItem {
  /**
   * ラジオボタンに表示する値
   */
  label: string;
  /**
   * ラジオボタン選択時の値
   */
  value: number | string | boolean;
}

@Component
export default class BaseRadioGroup extends Vue {
  /**
   * 選択された値
   */
  @VModel({ type: [Number, String, Boolean], required: true }) selectedValue!:
    | number
    | string
    | boolean;

  /**
   * 選択肢
   */
  @Prop({ type: Array, required: true })
  readonly items!: Array<BaseRadioGroupItem>;

  /**
   * 並べる方向
   */
  @Prop({ type: String, default: "column" }) readonly direction!:
    | "row"
    | "column";

  /**
   * 無効にするかどうか
   */
  @Prop({ type: Boolean, default: false })
  readonly isDisabled!: boolean;

  /**
   * 読み取り専用にするかどうか
   */
  @Prop({ type: Boolean, default: false }) readonly isReadonly!: boolean;
}
</script>
