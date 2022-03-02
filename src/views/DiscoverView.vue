<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import SearchLine from '../components/SearchLine.vue';
import FilmPreview from '../components/FilmPreview.vue';
</script>

<template>
    <SearchLine />
    <div class="filmsContainer" ref="filmContainer">
        <template v-if="!this.$store.state.loading">
            <FilmPreview v-for="film in this.$store.state.entities" :key="film.id" :film="film" />
        </template>
        <template v-else
            ><div class="fullPageSpinner">
                <PulseLoader :loading="loading" color="#3f51b5" size="2.5rem" />
            </div>
        </template>
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
.fullPageSpinner {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
