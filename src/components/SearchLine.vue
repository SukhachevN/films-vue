/* eslint-disable no-return-assign */
<script setup>
import { ref, watch } from 'vue';
import { debounce } from '../utils';

const search = ref('');
const handleSearch = debounce((e) => {
    search.value = e.target.value;
}, 600);
watch(search, () => console.log(search.value));
</script>

<template>
    <label for="search">
        <input
            @input="handleSearch"
            type="search"
            id="search"
            placeholder="Viết tên của phim..."
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
