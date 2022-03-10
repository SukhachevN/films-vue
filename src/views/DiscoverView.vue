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
const error = computed(() => films.value.errorEntities);
</script>

<template>
    <SearchLine />
    <div class="filmsContainer" role="list">
        <template v-if="entities.length && !error">
            <FilmPreview v-for="film in entities" :key="film.id" :film="film" />
        </template>
        <template v-else-if="error">
            <div class="errorBlock" role="alert">
                <p class="error">Xin lỗi, không thể tìm kiếm phim nào với tên này</p>
            </div>
        </template>
    </div>
    <div class="spinner spinner-fullPage" v-if="loading && entities.length === 0">
        <PulseLoader :loading="loading" color="#3f51b5" size="2.5rem" />
    </div>
    <div class="spinner" v-else-if="loading">
        <PulseLoader :loading="loading" color="#3f51b5" size="2.5rem" />
    </div>
</template>
