<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <base-textarea v-model="textOrUrl" :is-readonly="true"></base-textarea>
      </v-col>
      <v-col v-if="isUrl(textOrUrl)" cols="12">
        <v-btn block @click="openUrl">
          <v-icon>link</v-icon>
          URLを開く
        </v-btn>
      </v-col>
      <v-col v-if="isSupportWebShareApi" cols="12">
        <v-btn block @click="shareResult">
          <v-icon>share</v-icon>
          共有する
        </v-btn>
      </v-col>
      <v-col cols="12">
        <base-copy-to-clipboard-btn
          v-if="isUrl(textOrUrl)"
          v-model="textOrUrl"
          :is-block="true"
        ></base-copy-to-clipboard-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseTextarea from "../base/BaseTextarea.vue";
import BaseCopyToClipboardBtn from "../base/BaseCopyToClipboardBtn.vue";
import { isUrl } from "../../models/utils/textUtility";

@Component({ components: { BaseTextarea, BaseCopyToClipboardBtn } })
export default class ReadResultUrlOrText extends Vue {
  @Prop({ type: String }) textOrUrl!: string;

  isUrl = isUrl;

  get isSupportWebShareApi(): boolean {
    return !!navigator.share;
  }

  openUrl(): void {
    window.open(this.textOrUrl);
  }

  async shareResult(): Promise<void> {
    if (navigator.share) {
      try {
        await navigator.share({
          text: this.textOrUrl,
          title: "読み取り結果",
          url: isUrl(this.textOrUrl) ? this.textOrUrl : undefined,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>
