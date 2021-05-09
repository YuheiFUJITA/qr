<template>
  <v-app>
    <v-system-bar color="primary"></v-system-bar>
    <app-bar></app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <bottom-navigation></bottom-navigation>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import "vuetify";
import AppBar from "./components/layout/AppBar.vue";
import BottomNavigation from "./components/layout/BottomNavigation.vue";
import { SettingsModule } from "./store/modules/settings";

@Component({ components: { AppBar, BottomNavigation } })
export default class App extends Vue {
  created(): void {
    this.$vuetify.theme.dark = SettingsModule.isDark;
  }
}
</script>
