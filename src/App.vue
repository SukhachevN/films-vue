<script setup>
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Header from './components/HeaderComponent.vue';
import { throttle } from './utils';

const store = useStore();
const route = useRoute();
const container = ref(null);
const initialized = computed(() => store.getters.getInitialized);

const throttledFetch = throttle(() => store.dispatch('fetchMore'), 1000);

const handleScroll = () => {
    const endCondition = container.value.getBoundingClientRect().bottom === window.innerHeight;

    if (endCondition && !store.state.endOfData) {
        throttledFetch();
    }
};

onBeforeMount(() => {
    store.dispatch('initialize');
});
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    if (['/', '/discover'].includes(route.path)) {
        store.dispatch('fetchDiscoverFilms');
    }
});
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
    <div class="container" ref="container">
        <template v-if="initialized">
            <Header />
            <main><router-view /></main>
        </template>
        <div v-else class="spinner spinner-fullPage">
            <PulseLoader color="#3f51b5" size="2.5rem" />
        </div>
    </div>
</template>

<style lang="scss">
@import './styles.scss';
</style>
