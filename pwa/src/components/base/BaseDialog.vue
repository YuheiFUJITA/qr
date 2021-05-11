<template>
  <v-row justify="center">
    <v-col>
      <v-dialog
        v-model="isOpen"
        :persistent="isPersistent"
        :fullscreen="$vuetify.breakpoint.xsOnly"
        :width="$vuetify.breakpoint.xsOnly ? 'auto' : 400"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-app-bar color="primary" dark flat>
            <v-btn icon @click.stop="close"><v-icon>close</v-icon></v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
          </v-app-bar>
          <slot></slot>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator";

@Component
export default class BaseDialog extends Vue {
  /**
   * ダイアログの表示状態
   */
  @VModel({ type: Boolean, default: false, required: true }) isOpen!: boolean;

  /**
   * ダイアログ上部に表示するタイトル
   */
  @Prop({ type: String, default: "" }) readonly title!: string;

  /**
   * ダイアログ外のクリックやescキーによってダイアログを閉じるかどうか
   */
  @Prop({ type: Boolean, default: false }) readonly isPersistent!: boolean;

  close(): void {
    this.isOpen = false;
  }
}
</script>
