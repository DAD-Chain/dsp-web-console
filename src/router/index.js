import Vue from "vue";
import VueRouter from "vue-router";
import { getCache } from '@/tools/publicFn'

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Login",
		// redirect: '/dashboard',
		component: () => import('@/views/login/index'),
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: () => import('@/views/dashboard/index'),
		children: [
			{
				path: "/",
				name: "DashboardList",
				component: () => import('@/views/dashboard/list')
			},
			{
				path: "/dashboard/detail",
				name: "DashboardDetail",
				component: () => import('@/views/dashboard/detail')
			},
			{
				path: "/dashboard/cancelDetail",
				name: "DashboardCancelDetail",
				component: () => import('@/views/dashboard/cancelDetail')
			},
		]
	},
	{
		path: "/newPost",
		name: "NewPost",
		component: () => import('@/views/newPost/index'),
		children: [
			{
				path: "/",
				name: "AddNewPost",
				meta: { status: 1 },
				component: () => import('@/views/newPost/add')
			},
			{
				path: "/newPost/sendNewPost",
				name: "SendNewPost",
				meta: { status: 2 },
				component: () => import('@/views/newPost/send')
			},
			{
				path: "/newPost/previewNewPost",
				name: "PreviewNewPost",
				meta: { status: 3 },
				component: () => import('@/views/newPost/preview')
			},
		]
	},
	{
		path: "/account",
		name: "Account",
		component: () => import('@/views/account/index'),
		children: [
			{
				path: "/",
				name: "DashboardList",
				meta: { status: 1 },
				component: () => import('@/views/account/init')
			},
			{
				path: "/account/depositCrypto",
				name: "DepositCrypto",
				meta: { status: 2 },
				component: () => import('@/views/account/depositCrypto')
			},
			{
				path: "/account/transactionHistory",
				name: "TransactionHistory",
				component: () => import('@/views/account/transactionHistory')
			},
		]
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	let userInfo = getCache('userInfo')
	if(to.fullPath != '/'){
		if(!userInfo){
			next('/')
		}else{
			next()
		}
	}else{
		next()
	}
})

export default router;
