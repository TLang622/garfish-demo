import { h, createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import HelloWorld from './components/HelloWorld.vue';
import { vueBridge } from '@garfish/bridge';
import '@arco-design/web-vue/dist/arco.css';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/home', component: HelloWorld },
];

function newRouter(basename) {
  const router = createRouter({
    history: createWebHistory(basename),
    base: basename,
    routes,
  });
  return router;
}

// There is no running show that the main application execution run, you can perform in micro front-end environment rendering
if (!window.__GARFISH__) {
  const router = newRouter('/');
  const app = createApp(App);
  app.use(router);
  app.use(ArcoVue);
  app.mount('#app');
}

export const provider = vueBridge({
  createApp,
  
  rootComponent: App,

  loadRootComponent: ({ basename, dom, appName, props }) => {
    // console.log(basename, dom, appName, props);
    return Promise.resolve(App);
  },

  appOptions: ({ basename, dom, appName, props }) => {
    // console.log(basename, dom, appName, props);
    return {
      el: '#app',
      render: () => h(App),
      router: newRouter(basename),
    };
  },

  handleInstance: (vueInstance, { basename, dom, appName, props }) => {
    // console.log(basename, dom, appName, props);
    vueInstance.use(newRouter(basename));
    vueInstance.use(ArcoVue)
  },
});