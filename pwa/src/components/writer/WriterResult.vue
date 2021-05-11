<template>
  <base-dialog v-model="isOpen" title="作成結果">
    <v-container>
      <v-row>
        <v-col>
          <v-skeleton-loader type="image" :loading="!qr">
            <v-card>
              <v-img :src="qr"></v-img>
            </v-card>
          </v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-skeleton-loader type="button" :loading="!qr">
            <v-btn block x-large :href="qr" target="_blank" download="hoge.png">
              QRコード画像を保存
            </v-btn>
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </base-dialog>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator";
import BaseDialog from "../base/BaseDialog.vue";

@Component({
  components: {
    BaseDialog,
  },
})
export default class WriterResult extends Vue {
  @VModel({ type: Boolean, default: true }) isOpen!: boolean;
  @Prop({ type: String, default: null }) readonly qr!: string;
  isShowSnackbar = false;

  saveQrImage(): void {
    this.isShowSnackbar = true;
  }
}
</script>
