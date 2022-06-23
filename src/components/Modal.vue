<template>
	<div class="modal" :class="{ 'modal--opened': isOpen }">
		<div class="modal__title">
			<h2>Add a Font</h2>
			<button @click="onClose" class="modal__close">
				<XIcon class="modal__icon" />
			</button>
		</div>

		<div class="modal__form">
			<label for="font-input" class="modal__label"
				>Search google font</label
			>
			<div class="modal__field">
				<input
					type="text"
					placeholder="Font..."
					id="font-input"
					class="modal__input"
					v-model="family"
					:disabled="selectedFamily"
					autocomplete="off"
				/>
				<button
					class="modal__field-cancel"
					:class="{ 'modal__field-cancel--hidden': !selectedFamily }"
					@click="onRemove"
				>
					<XIcon class="modal__field-icon" />
				</button>
			</div>
			<div class="modal__dropdown">
				<FontsDropdown
					:search="debouncedFamily"
					:onSelectFont="selectFont"
					v-show="selectedFamily ? false : true"
				/>
			</div>
		</div>
		<button @click="onAddFont" class="modal__button btn-hover-effect">
			Add this font
		</button>
	</div>
</template>

<script setup>
import { ref, reactive, defineProps, watchEffect } from "vue";

import { addFont } from "../firebase";
import { XIcon } from "@heroicons/vue/solid";
import { useDebouncedValue } from "../utils";

import FontsDropdown from "./FontsDropdown.vue";

const { isOpen, onClose } = defineProps({
	isOpen: Boolean,
	onClose: Function,
});

const family = ref("");
const selectedFamily = ref(null);

const debouncedFamily = useDebouncedValue(family, 150);

const state = reactive({
	num: 0,
});

const onAddFont = async () => {
	if (selectedFamily.value.family) {
		addFont(selectedFamily.value.family);
		onClose();
		onRemove();
	}
};

const selectFont = (selected) => {
	selectedFamily.value = selected;
	family.value = selected.family;
};

const onRemove = () => {
	selectedFamily.value = null;
	family.value = "";
};
</script>

<style>
.modal {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -10%);
	transition: all 0.4s ease;
	background: #fff;
	border: 1.8px solid #65769d;
	border-radius: 2rem;
	padding: 0 1.5rem 1.5rem;
	pointer-events: none;
	opacity: 0;
}

.modal.modal--opened {
	transform: translate(-50%, -50%);
	pointer-events: all;
	opacity: 1;
}

.modal__title {
	padding: 1.25rem;
	position: relative;
}

.modal__close {
	background: #f2f2f2;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	height: 2.25rem;
	width: 2.25rem;
	border-radius: 0.75rem;
	border: none;
	transition: all 0.2s ease;
}

.modal__close:hover {
	transform: scale(0.9) translateY(-50%);
}

.modal__icon {
	color: #de2b2b;
	height: 1.5rem;
}

.modal__close {
	position: absolute;
}

.modal__title h2 {
	font-size: 1.5rem;
	text-align: center;
}

.modal__form {
	display: flex;
	gap: 0.5rem;
	flex-direction: column;
	margin: 0.5rem 0 1.5rem;
}

.modal__label {
	font-weight: 600;
	/*font-size: 0.875rem;*/
}

.modal__field {
	background: #f2f2f2;
	border-radius: 0.5rem;
	display: flex;
	align-items: center;
	position: relative;
}

.modal__input {
	font-size: 1rem;
	padding: 1rem 0.75rem;
	background: none;
	border: none;
	min-width: 456px;
}

.modal__input::placeholder {
	color: var(--text-placeholder-clr);
}

.modal__field-cancel {
	position: absolute;
	top: 50%;
	right: 0.1rem;
	transform: translateY(-50%);
	height: 2.5rem;
	width: 2.5rem;
	border: none;
	transition: all 0.2s ease;
}

.modal__field-cancel--hidden {
	display: none;
}

.modal__field-cancel:hover {
	transform: scale(0.9) translateY(-50%);
}

.modal__field-icon {
	height: 1.5rem;
	color: #de2b2b;
}

.modal__button {
	background: var(--primary);
	color: var(--on-primary);
	padding: 1rem;
	width: 100%;
	border-radius: 0.75rem;
	border: none;
	font-size: 1rem;
	font-weight: 600;
}

.modal__dropdown {
	position: relative;
}
</style>
