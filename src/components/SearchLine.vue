/* eslint-disable no-return-assign */
<script setup>
import { useStore } from 'vuex';
import { ref, watch } from 'vue';
import { debounce } from '../utils';

const store = useStore();
const search = ref('');
const handleSearch = debounce((e) => {
    search.value = e.target.value;
}, 600);
watch(search, () => {
    if (search.value) {
        store.dispatch('fetchSearchFilm', encodeURI(search.value));
    } else {
        store.dispatch('fetchDiscoverFilms');
    }
});
</script>

<template>
    <label for="search">
        <input
            @input="handleSearch"
            type="search"
            id="search"
            placeholder="Tìm kiếm..."
            class="searchInput"
        />
    </label>
</template>
