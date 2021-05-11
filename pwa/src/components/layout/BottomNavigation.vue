<template>
  <v-bottom-navigation color="primary" app dark grow>
    <v-btn :to="{ name: 'Reader' }">
      <span>読み取り</span>
      <v-icon>qr_code_scanner</v-icon>
    </v-btn>
    <v-btn :to="{ name: 'Writer' }">
      <span>作成</span>
      <v-icon>create</v-icon>
    </v-btn>
    <v-btn :to="{ name: 'Settings' }">
      <span>設定</span>
      <v-icon>settings</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class BottomNavigation extends Vue {}
</script>
