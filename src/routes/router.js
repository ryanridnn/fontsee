import { createRouter, createWebHistory } from "vue-router";

import { getUser } from "../firebase";

import Home from "./Home.vue";
import Login from "./Login.vue";

const routes = [
	{
		path: "/",
		component: Home,
		meta: {
			title: "Fontsee",
			requiresAuth: true,
		},
	},
	{
		path: "/login",
		component: Login,
		meta: {
			title: "Fontsee - Login",
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
});

router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	next();
});

router.beforeEach(async (to, from, next) => {
	const user = await getUser();

	if (to.meta.requiresAuth) {
		if (user && user.uid === import.meta.env.VITE_ADMIN_ID) next();
		else {
			next("/login");
		}
	} else {
		if (user && user.uid === import.meta.env.VITE_ADMIN_ID) next("/");
		else next();
	}
});

export default router;
