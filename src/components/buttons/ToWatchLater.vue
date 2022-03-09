<script setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';

const props = defineProps(['film']);
const store = useStore();
const isInFavourite = computed(() => store.getters.isInWatchLater(props.film.id));
</script>
<template>
    <button class="actionButton" @click="store.dispatch('handleWatchLater', props.film)">
        <svg
            stroke="currentColor"
            :fill="isInFavourite ? 'green' : '#6f7077'"
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
                d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8 3.5a.5.5 0 00-1 0V9a.5.5 0
            00.252.434l3.5 2a.5.5 0 00.496-.868L8 8.71V3.5z"
                clip-rule="evenodd"
            ></path>
        </svg>
    </button>
</template>
