<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
Garfish.channel.on('msgMain', (msg) => {
  console.log(`主应用组件收到消息：${msg}`)
});
const handleClick = () => {
  Garfish.channel.emit('msgChild', 'hello子应用，我是主应用')
}
const handleClick2 = () => {
  window.Garfish.router.push({ path: '/child2' });
}
const handleClick3 = () => {
  window.Garfish.router.push({ path: '/child1' });
}
window.Garfish.router.push({ path: '/child1' });
</script>

<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="handleClick">向子组件发送消息</button>
  <button type="button" @click="handleClick2">子应用2</button>
  <button type="button" @click="handleClick3">子应用1</button>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
