<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

window?.Garfish?.channel.on('msgChild', (msg) => {
  console.log(`子应用1收到消息：${msg}`)
});

defineProps({
  msg: String
})

const handleClick = ()=> {
  window?.Garfish?.channel.emit('msgMain', 'hello主应用，我是子应用1')
}

let appInstance = null;

onMounted(async () => {
  console.log('手动加载子应用2')
  // 如果该子应用在其他地方注册过，不要和之前注册的同名，不然会导致配置覆盖。
  // 例如在该页面有domGetter:container，但是之前注册的项目或者页面不一定有container容器
  appInstance = await Garfish.loadApp('child3', {
        cache: true,
        basename: '/child3',
        domGetter: () => document.getElementById('container'),
        entry: 'http://localhost:3003',
      });
      // 若已经渲染触发 show，只有首次渲染触发 mount，后面渲染都可以触发 show 提供性能
      appInstance.mounted ? appInstance.show() : await appInstance.mount();
})
onUnmounted(() => {
  appInstance.hide()
})
</script>

<template>
  <div>组件helloworld</div>
  <div><a-button type="primary" @click="handleClick">向主应用发送消息</a-button></div>
  <div id="container"></div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
