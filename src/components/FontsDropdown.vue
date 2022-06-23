<template>
	<div class="dropdown" :class="{ 'dropdown--hidden': search === '' }">
		<div
			v-for="({ family }, index) in filteredFonts"
			@click="addFont(index)"
			class="dropdown__font"
			:key="index"
			:class="{ 'dropdown__font--selected': index === state.currentFont }"
		>
			{{ family }}
		</div>
	</div>
</template>

<script setup>
import { defineProps, onMounted, reactive, computed, toRef, watch } from "vue";
const GOOGLE_FONTS_API_URL = import.meta.env.VITE_GOOGLE_FONTS_API_URL;

const props = defineProps(["search", "onSelectFont"]);

const search = toRef(props, "search");

const state = reactive({
	fontList: [],
	currentFont: 0,
});

const filteredFonts = computed(() =>
	state.fontList
		.filter((font) => font.family.match(new RegExp(search.value, "i")))
		.splice(0, 5)
);

const addFont = (index) => {
	props.onSelectFont(filteredFonts.value[index]);
};

onMounted(async () => {
	const data = await fetch(GOOGLE_FONTS_API_URL);
	const res = await data.json();
	state.fontList = res.items;

	window.addEventListener("keydown", (e) => {
		if (filteredFonts.value.length) {
			if (e.code === "ArrowUp") {
				state.currentFont = Math.max(0, state.currentFont - 1);
			} else if (e.code === "ArrowDown") {
				state.currentFont = Math.min(4, state.currentFont + 1);
			} else if (e.code === "Enter") {
				addFont(state.currentFont);
			}
		}
	});
});

watch([search], () => {
	state.currentFont = 0;
});
</script>

<style>
.dropdown {
	position: absolute;
	background: #f2f2f2;
	/*padding: 1rem;*/
	width: 100%;
	border-radius: 0.75rem;
	overflow: hidden;
}

.dropdown--hidden {
	display: none;
}

.dropdown__font {
	padding: 1rem;
}

.dropdown__font--selected {
	background: #ddd;
}
</style>
