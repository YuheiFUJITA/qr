<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>起動画面</v-list-item-title>
      <v-list-item-subtitle>起動時の画面を変更できます</v-list-item-subtitle>
      <base-radio-group
        v-model="launchView"
        :items="radioGroupItems"
      ></base-radio-group>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import BaseRadioGroup, { BaseRadioGroupItem } from "../base/BaseRadioGroup.vue";
import { SettingsModule } from "../../store/modules/settings";
import { LaunchView } from "../../models/types";

@Component({ components: { BaseRadioGroup } })
export default class SettingsLaunchView extends Vue {
  launchView: LaunchView = SettingsModule.launchView;

  @Watch("launchView")
  changeLaunchView(value: LaunchView): void {
    SettingsModule.changeLaunchView(value);
  }

  radioGroupItems: Array<BaseRadioGroupItem<LaunchView>> = [
    {
      label: "ホーム画面",
      value: "Home",
    },
    {
      label: "QRコード読み取り画面",
      value: "Reader",
    },
    {
      label: "QRコード作成画面",
      value: "Writer",
    },
  ];
}
</script>
