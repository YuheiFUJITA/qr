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
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SettingsTheme from "../components/settings/SettingsTheme.vue";

@Component({ components: { SettingsTheme } })
export default class SettingsView extends Vue {}
</script>
