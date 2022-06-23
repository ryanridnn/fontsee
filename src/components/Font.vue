<template>
	<div class="font">
		<h2 class="font__name" :class="fontClass">{{ family }}</h2>
		<p class="font__text" :class="fontClass">
			The quick brown fox jumps over the lazy dog
		</p>
		<button @click="deleteFont(id)" class="font__delete">
			<TrashIcon class="font__icon" />
		</button>
	</div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { deleteFont } from "../firebase";

import { TrashIcon } from "@heroicons/vue/solid";

const { id, family } = defineProps({
	id: String,
	family: String,
});

const fontClass = computed(
	() => "font-" + family.trim().toLowerCase().split(" ").join("-")
);
</script>

<style>
.font {
	position: relative;
	background: #fff;
	border-radius: 1rem;
	padding: 1.25rem;
	border: 0.8px solid #8595ba;
}

.font__name {
	font-size: 1.25rem;
	font-weight: bold;
	text-transform: capitalize;
	margin-bottom: 0.25rem;
}

.font__text {
	color: var(--text-light-clr);
}

.font__delete {
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(50%, -50%);
	width: 1.75rem;
	height: 1.75rem;
	border-radius: 0.375rem;
	border: none;
	background: #de2b2b;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: 0.1rem;
	transition: all 0.2s ease;
}

.font__delete:hover {
	transform: scale(0.92) translate(50%, -50%);
}

.font__icon {
	fill: white;
	height: 1.25rem;
}

@media screen and (min-width: 1024px) {
	.font__delete {
		opacity: 0;
		transition: all 0.2s ease;
	}

	.font:hover .font__delete {
		opacity: 1;
	}
}
</style>
