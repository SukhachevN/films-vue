<script setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';

const props = defineProps(['film']);
const store = useStore();
const isInFavourite = computed(() => store.getters.isInFavourite(props.film.id));
</script>
<template>
    <button
        class="actionButton"
        @click="store.dispatch('handleFavourite', props.film)"
        :aria-label="isInFavourite ? 'xóa bỏ từ yêu thích' : 'thêm trong yêu thích'"
    >
        <svg
            stroke="currentColor"
            :fill="isInFavourite ? 'red' : '#6f7077'"
            stroke-width="0"
            viewBox="0 0 16 16"
            color="#6f7077"
            height="2.5rem"
            width="2.5rem"
            xmlns="http://www.w3.org/2000/svg"
            style="color: rgb(111, 112, 119)"
        >
            <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                clip-rule="evenodd"
            ></path>
        </svg>
    </button>
</template>
