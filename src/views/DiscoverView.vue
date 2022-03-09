<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import SearchLine from '../components/SearchLine.vue';
import FilmPreview from '../components/FilmPreview.vue';

const store = useStore();
const films = computed(() => store.getters.getEntities);
const entities = computed(() => films.value.entities);
const loading = computed(() => films.value.loadingEntities);
</script>

<template>
    <SearchLine />
    <div class="filmsContainer">
        <FilmPreview v-for="film in entities" :key="film.id" :film="film" />
    </div>
    <div class="spinner spinner-fullPage" v-if="loading && entities.length === 0">
        <PulseLoader :loading="loading" color="#3f51b5" size="2.5rem" />
    </div>
    <div class="spinner" v-else-if="loading">
        <PulseLoader :loading="loading" color="#3f51b5" size="2.5rem" />
    </div>
</template>
