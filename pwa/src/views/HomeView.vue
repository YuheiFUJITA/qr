<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-card :to="{ name: 'Reader' }">
          <v-card-title>
            <v-icon x-large>qr_code_scanner</v-icon>
            QRコードを読み取る
          </v-card-title>
          <v-card-text>QRコードを読み取れます。</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card :to="{ name: 'Writer' }">
          <v-card-title>
            <v-icon x-large>create</v-icon>
            QRコードを作成する
          </v-card-title>
          <v-card-text>様々なQRコードを作成できます。</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class HomeView extends Vue {}
</script>
