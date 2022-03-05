<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import SearchLine from '../components/SearchLine.vue';
import FilmPreview from '../components/FilmPreview.vue';
</script>

<template>
    <SearchLine />
    <div class="filmsContainer" ref="filmContainer">
        <FilmPreview v-for="film in $store.state.entities" :key="film.id" :film="film" />
    </div>
    <div
        class="spinner spinner-fullPage"
        v-if="$store.state.loadingEntities && $store.state.entities.length === 0"
    >
        <PulseLoader :loading="$store.state.loadingEntities" color="#3f51b5" size="2.5rem" />
    </div>
    <div class="spinner" v-else-if="$store.state.loadingEntities">
        <PulseLoader :loading="$store.state.loadingEntities" color="#3f51b5" size="2.5rem" />
    </div>
</template>

<style lang="scss">
.filmsContainer {
    width: 100%;
    height: 100%;
    padding-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
}
.spinner {
    display: flex;
    align-items: center;
    &-fullPage {
        height: 80vh;
    }
}
</style>
