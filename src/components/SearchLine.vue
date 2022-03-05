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

<style lang="scss" scoped>
@import '../constants.scss';
label {
    width: 90%;
}
.searchInput {
    border: 1px solid $lightGray;
    background: $lightBlue;
    height: 2.75rem;
    font-size: 1.1rem;
    border-radius: 0.3rem;
    width: 100%;
    padding: 0.5rem 0.8rem;
    &:focus-visible {
        outline: 1px solid $blue;
    }
}
</style>
