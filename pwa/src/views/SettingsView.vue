<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6"><div>設定</div></v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <v-list subheader>
          <v-subheader>全般</v-subheader>
          <settings-theme></settings-theme>
          <v-divider></v-divider>
          <settings-launch-view></settings-launch-view>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SettingsTheme from "../components/settings/SettingsTheme.vue";
import SettingsLaunchView from "../components/settings/SettingsLaunchView.vue";

@Component({ components: { SettingsTheme, SettingsLaunchView } })
export default class SettingsView extends Vue {}
</script>
