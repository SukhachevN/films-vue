<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Header from './components/HeaderComponent.vue';
import { throttle } from './utils';

const store = useStore();
const route = useRoute();
const container = ref(null);

const throttledFetch = throttle(() => store.dispatch('fetchMore'), 1000);

const handleScroll = () => {
    const endCondition = container.value.getBoundingClientRect().bottom === window.innerHeight;

    if (endCondition && !store.state.endOfData) {
        throttledFetch();
    }
};

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
        <Header />
        <main><router-view /></main>
    </div>
</template>

<style lang="scss">
@import './styles.scss';
</style>
