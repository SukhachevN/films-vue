<script setup>
import { onMounted, onUnmounted, ref, watch, onBeforeUpdate } from 'vue';
import { useStore } from 'vuex';
import Header from './components/HeaderComponent.vue';
import { throttle } from './utils';

const store = useStore();
const container = ref(null);
const scroll = ref(null);

const throttledFetch = throttle(() => store.dispatch('fetchMore'), 1000);
const handleScroll = () => {
    if (container.value.getBoundingClientRect().bottom < window.innerHeight) {
        throttledFetch();
        scroll.value = container.value.clientHeight;
    }
};

watch([scroll, store.state.loading], () => {
    if (!store.state.loading) {
        window.scrollTo(0, scroll.value);
    }
});

onBeforeUpdate(() => window.scrollTo(0, scroll.value));

onMounted(() => {
    store.dispatch('fetchDiscoverFilms');
    window.addEventListener('scroll', handleScroll);
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
@import './constants.scss';

* {
    margin: 0;
    box-sizing: border-box;
    padding: 0;
}
li {
    list-style: none;
}
a {
    text-decoration: none;
    color: inherit;
}
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
        'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: $maxWidth;
    margin: auto;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-bottom: 2rem;
}

main {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>
