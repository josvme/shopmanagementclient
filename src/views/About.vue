<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ $t('hello') }}</p>
    <p>{{ $t('message') }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HelloI18n extends Vue {
}
</script>

// This tag allows embedding translations directly in .vue files.
<i18n>
{
  "de": {
    "hello": "Hallo i18n von SFC!"
  }
}
</i18n>