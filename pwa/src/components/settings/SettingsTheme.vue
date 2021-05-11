<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>テーマ</v-list-item-title>
      <v-list-item-subtitle>テーマの変更ができます</v-list-item-subtitle>
      <base-radio-group
        v-model="theme"
        :items="radioGroupItems"
      ></base-radio-group>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import BaseRadioGroup, { BaseRadioGroupItem } from "../base/BaseRadioGroup.vue";
import { SettingsModule } from "../../store/modules/settings";
import { Theme } from "../../models/types";

@Component({ components: { BaseRadioGroup } })
export default class SettingsTheme extends Vue {
  theme: Theme = SettingsModule.theme;

  @Watch("theme")
  changeTheme(value: Theme): void {
    SettingsModule.changeTheme(value);
    this.$vuetify.theme.dark = SettingsModule.isDark;
  }

  radioGroupItems: Array<BaseRadioGroupItem> = [
    {
      label: "システム設定を反映する",
      value: "system",
    },
    {
      label: "ライトテーマ",
      value: "light",
    },
    {
      label: "ダークテーマ",
      value: "dark",
    },
  ];
}
</script>
