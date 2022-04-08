<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)

const handleClick = () => {
  Garfish.channel.emit('msgChild', 'hello子应用1，我是子应用2')
}
</script>

<template>
  <button type="button" @click="handleClick">向子应用1发送消息</button>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
