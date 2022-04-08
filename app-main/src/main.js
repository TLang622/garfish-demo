import { createApp } from 'vue'
import App from './App.vue'
import Garfish from 'garfish'
import { GarfishEsModule } from '@garfish/es-module'

createApp(App).mount('#app')

Garfish.channel.on('msgMain', (msg) => {
	console.log(`主应用收到消息：${msg}`)
});

Garfish.run({
	// 子应用的基础路径，默认值为 /，整个微前端应用的 basename。
	basename: '/',
	// 子应用的挂载点
	domGetter: '#subApp',
	// 是否禁用子应用的资源预加载，默认值为 false，开启子应用的预加载能力，预加载能力在弱网情况和手机端将不会开启。
	disablePreloadApp: false,
  	apps: [
		{
			// 每个应用的 name 需要保持唯一
			name: 'child1',
			// 可为函数，当函数返回值为 true 时，标识满足激活条件，该应用将会自动挂载至页面中，手动挂在时可不填写该参数
			activeWhen: '/child1',
			// 子应用的入口地址，可以为 HTML 地址和 JS 地址
			// 注意：entry 地址不可以与主应用+子应用激活地址相同，否则刷新时将会直接返回子应用内容
			entry: 'http://localhost:3002',
		},
		{
			name: 'child2',
			activeWhen: '/child2',
			entry: 'http://localhost:3003',
			// 提供不同的挂载点
			// domGetter: '#sub-container',
		},
	],
	// 用于配置子应用沙箱的运行参数
	sandbox: {
		//  strictIsolation 表明是否开启开启严格隔离，开启严格隔离后，子应用的渲染节点将会开启 Shadow DOM close 模式，
    	// 并且子应用的查询和添加行为仅会在 DOM 作用域内进行
		strictIsolation: true,
		// 默认值为 false. snapshot 表明是否开启快照沙箱，默认情况下关闭快照沙箱，使用 VM 沙箱（VM 沙箱支持多实例）
		snapshot: false,
		// 覆盖子应用的执行上下文，使用自定义的执行上下文，例如子应用 localStorage 使用当前主应用 localStorage
    	// 仅在 snapshot: false 时有效
		modules: [() => ({ override: { localStorage: window.localStorage } })],
	},
	// 主应用在已经打开子应用页面的前提下，跳转子应用的子路由触发子应用的视图更新，默认值为 true
	autoRefreshApp: true,
	// 使某些全局变量处于保护状态，值的读写不会受到沙箱的影响（
	// 默认情况，子应用的 window 环境变量值是与主应用和其他子应用是隔离的，如果想主应用提供的值在子应用中也能读到或子应用间的值能进行共享，
	// 将该值的 key 放置数组中即可实现值间进行共享）
	protectVariable: [
		'MonitoringInstance',
		'Garfish',
		'__GARFISH_GLOBAL_APP_LIFECYCLE__',
	],
	// 插件列表
  	plugins: [GarfishEsModule()],
	beforeLoad(appInfo) {
		console.log('子应用开始加载', appInfo.name);
	},
	afterLoad(appInfo) {
		console.log('子应用加载完成', appInfo.name);
	},
	errorLoadApp(error, appInfo) {
		console.log('子应用加载异常', appInfo.name);
		console.error(error);
	},
	beforeMount(appInfo) {
		console.log('子应用开始渲染', appInfo.name);
	},
	afterMount(appInfo) {
		console.log('子应用渲染结束', appInfo.name);
	},
	// 提供了该 hook，错误将不会 throw 到文档流中（不会被全局错误监听到），提供给开发者决定如何处理错误
	errorMountApp(error, appInfo) {
		console.log('子应用渲染异常', appInfo.name);
		console.error(error);
	},
	beforeUnmount(appInfo) {
		console.log('子应用开始销毁', appInfo.name);
	},
	afterUnmount(appInfo) {
		console.log('子应用销毁结束', appInfo.name);
	},
	// 提供了该 hook，错误将不会 throw 到文档流中（不会被全局错误监听到），提供给开发者决定如何处理错误
	errorUnmountApp(error, appInfo) {
		console.log('子应用销毁异常', appInfo.name);
		console.error(error);
	},
	// 在路由发生变化时并且未匹配到任何子应用时触发
	onNotMatchRouter(path) {
		console.log('子应用路由未匹配', path);
	},
})
