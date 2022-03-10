<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import FilmPreview from '../components/FilmPreview.vue';

const store = useStore();
const entities = computed(() => store.getters.getWatchLater);
</script>

<template>
    <div class="viewInfo">Ỏ đây bạn sẽ nhìn các phim, những gì đã thêm trong xem sau</div>
    <div class="filmsContainer">
        <FilmPreview v-for="film in entities" :key="film.id" :film="film" />
    </div>
</template>
