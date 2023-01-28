<template>
  <n-message-provider>
    <App></App>
  </n-message-provider>
</template>

<script>
import App from "./App.vue";
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    App
  }
})
</script>
