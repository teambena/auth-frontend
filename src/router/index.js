
import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import { useAuth } from 'src/composables/auth';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

let routes = [{
	name: 'main',
	path: '/',
	component: () => import('layouts/MainLayout.vue'),
	children: [
		//Dashboard routes

		{ path: '/index/register', name: 'useruserregister', component: () => import('pages/index/userregister.vue'), props: true },
		{ path: '/account/edit', name: 'useraccountedit', component: () => import('pages/account/accountedit.vue'), props: true },
		{ path: '/account', name: 'useraccountview', component: () => import('pages/account/accountview.vue'), props: true },
        { path: '/account/resetpassword', name: 'resetpassword', component: () => import('src/pages/account/resetpassword.vue'), props: true },
	],

	},
];

export default route(async function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE == 'history' ? createWebHistory : createWebHashHistory)
	const mainRoute = routes.find(x => x.name = "main");
	const auth = useAuth();

	//get current user data from api on first load
	const { user } = await auth.getUserData();
	if(user){
		const homeRoute = {path: '/', alias: '/account', name: 'accountview', component: () => import('pages/account/accountview.vue') }
		mainRoute.children.push(homeRoute);
	}
	else{
		const indexRoute = { path: '/',  alias: '/home', name: 'index', component: () => import('pages/index/index.vue') }
		mainRoute.children.push(indexRoute);
	}

	const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })
  return Router
})

