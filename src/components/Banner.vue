<template>
	<div class="banner">
		<div class="banner__left">
			<h1 class="banner__heading">Explore font list</h1>
			<p class="banner__total">14 saved fonts in total</p>
			<button @click="onAddClick" class="banner__button btn-hover-effect">
				Add Font
			</button>
		</div>
		<div class="banner__right">
			<BannerIllustration />
		</div>
	</div>
</template>

<script setup>
import { defineProps } from "vue";

import BannerIllustration from "../assets/banner-illustration.svg";

const { onAddClick } = defineProps({
	onAddClick: Function,
});
</script>

<style>
.banner {
	min-height: 160px;
	border-radius: 2rem;
	background: var(--light);
	display: flex;
	align-items: center;
	margin-top: 1.5rem;
	position: relative;
}

.banner__left,
.banner__right {
	flex: 1;
}

.banner__left {
	padding: 0 1.5rem;
	position: relative;
	z-index: 2;
}

.banner__right {
	display: flex;
	justify-content: flex-end;
	padding-right: 2rem;
}

.banner__heading {
	font-size: 1.5rem;
}

.banner__total {
	color: var(--text-light-color);
	margin: 0.25rem 0 1rem;
}

.banner__button {
	background: var(--primary);
	color: var(--on-primary);
	padding: 0.75rem 1rem;
	border-radius: 0.75rem;
	border: none;
	font-weight: medium;
	font-size: 1rem;
	font-weight: 600;
}

@media screen and (max-width: 430px) {
	.banner__right {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translate(0, -50%);
	}
}
</style>
