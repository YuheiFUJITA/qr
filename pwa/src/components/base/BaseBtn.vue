<template>
  <v-btn :block="isBlock" :color="color" :to="to" @click="click">
    <v-icon v-if="!icon">{{ icon }}</v-icon>
    {{ btnText }}
  </v-btn>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { Location } from "vue-router";

@Component
export default class BaseBtn extends Vue {
  /**
   * ボタンに表示するテキスト
   */
  @Prop({ type: String, required: true }) readonly btnText!: string;

  /**
   * ボタンの色
   */
  @Prop({ type: String, default: "primary" }) readonly color!: string;

  /**
   * ボタンをblockスタイルにするかどうか
   */
  @Prop({ type: Boolean, default: false }) readonly isBlock!: boolean;

  /**
   * ボタンに表示するアイコン
   */
  @Prop({ type: String, default: undefined }) readonly icon!: string;

  /**
   * リンク先
   */
  @Prop({ type: Object, default: undefined }) readonly to: Location | undefined;

  /**
   * ボタンが押されたときに発火するイベント
   */
  @Emit()
  click(): void {
    return;
  }
}
</script>
