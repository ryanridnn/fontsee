<template>
	<div class="login">
		<div class="login__right">
			<LoginIllustration class="login__illustration" />
		</div>
		<div class="login__left">
			<div class="login__inner">
				<h1 class="login__heading">Let's login to Fontsee</h1>
				<p class="login__lead">
					Save and keep track of personal list of your fonts
				</p>
				<button @click="onLogin" class="login__button btn-hover-effect">
					Login With Google
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

import LoginIllustration from "../assets/login-illustration.svg";
import { signInWithGoogle } from "../firebase";

const router = useRouter();

const userId = ref(null);

const onLogin = () => {
	signInWithGoogle((user) => {
		userId.value = user.uid;
	});
};

watchEffect(() => {
	if (userId.value === import.meta.env.VITE_ADMIN_ID) {
		router.push("/");
	}
});
</script>

<style>
.login {
	display: flex;
	flex-direction: column;
	color: var(--text-clr);
	min-height: 100vh;
	width: 100vw;
	max-width: 100vw;
}

.login__right {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #f4f4f4;
}

.login__illustration {
	width: 85%;
}

.login__left {
	display: flex;
	justify-content: center;
	align-items: center;
}

.login__inner {
	width: 90%;
	padding: 2rem 0;
}

.login__heading {
	font-size: 1.75rem;
}

.login__lead {
	margin: 0.25rem 0 2rem;
	color: var(--text-light-clr);
}

.login__button {
	border-radius: 0.75rem;
	background: var(--primary);
	color: var(--on-primary);
	padding: 1rem;
	font-size: 1rem;
	width: 100%;
	border: none;
	font-weight: medium;
}

@media screen and (min-width: 820px) {
	.login {
		flex-direction: row-reverse;
	}

	.login__left {
		padding: 2rem;
	}

	.login__inner {
		max-width: 336px;
	}
}

@media screen and (min-width: 1360px) {
	.login__left {
		min-width: 440px;
	}
	.login__inner {
		/*max-width: 560px;*/
	}

	.login__illustration {
		max-width: 812px;
	}
}
</style>
