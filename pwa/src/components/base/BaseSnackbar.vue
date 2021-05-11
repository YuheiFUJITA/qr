<template>
  <v-snackbar v-model="isShow" timeout="3000" :color="color" rounded="pill">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn v-bind="attrs" icon @click="click"><v-icon>close</v-icon></v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator";
import { SnackbarColor } from "../../models/types";

@Component
export default class BaseSnackbar extends Vue {
  /**
   * Snackbarの表示状態
   */
  @VModel({ type: Boolean, required: true }) isShow!: boolean;

  /**
   * 表示するテキスト
   */
  @Prop({ type: String, required: true }) readonly text!: string;

  /**
   * 色
   */
  @Prop({ type: String, default: "info" }) readonly color!: SnackbarColor;

  click(): void {
    this.isShow = false;
  }
}
</script>
