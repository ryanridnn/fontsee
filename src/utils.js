import { ref, watch } from "vue";

export const useDebouncedValue = (init, time = 200) => {
	const debouncedValue = ref(init.value);
	let timeout;

	watch([init], () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			debouncedValue.value = init.value;
		}, time);
	});

	return debouncedValue;
};
