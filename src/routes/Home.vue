<template>
  <div class="container">
    <div class="logo">
      <Logo />
    </div>
    <Banner :onAddClick="toggleAddModal" />
    <div class="search">
      <input
        type="text"
        placeholder="Search saved font..."
        v-model="search"
        class="search__field"
      />
      <SearchIcon class="search__icon" />
    </div>
    <div class="fonts">
      <Font
        v-for="font in filteredFonts"
        :key="font.family"
        :id="font.id"
        :family="font.family"
      />
    </div>
  </div>
  <Modal :isOpen="state.addModalOpened" :onClose="closeModal" />
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useFontsListener } from "../firebase";

import Logo from "../assets/logo.svg";
import Banner from "../components/Banner.vue";
import Font from "../components/Font.vue";
import Modal from "../components/Modal.vue";
import { SearchIcon } from "@heroicons/vue/solid";

import { useDebouncedValue } from "../utils";

const state = reactive({
  fonts: [],
  addModalOpened: false,
});

const search = ref("");

const debouncedSearch = useDebouncedValue(search);
useFontsListener((fonts) => {
  state.fonts = fonts;
});

const filteredFonts = computed(() =>
  state.fonts.filter((font) =>
    font.family.match(new RegExp(debouncedSearch.value, "i"))
  )
);

const toggleAddModal = () => {
  state.addModalOpened = !state.addModalOpened;
};

const closeModal = () => {
  state.addModalOpened = false;
};
</script>

<style>
.container {
  max-width: 640px;
  width: 92%;
  margin: 0 auto;
  color: var(--text-clr);
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
}

.search {
  background: #fff;
  border-radius: 0.75rem;
  margin: 1.25rem 0 1.75rem;
  display: flex;
  align-items: center;
  border: 1px solid #65769d;
  overflow: hidden;
  color: var(--text-clr);
}

.search__field {
  flex: 1;
  padding: 1rem;
  border: none;
  outline: none;
  font-size: 1rem;
}

.search__field::placeholder {
  color: var(--text-placeholder-clr);
}

.search__icon {
  height: 1.25rem;
  margin-right: 1.25rem;
  color: var(--primary);
}

.fonts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
