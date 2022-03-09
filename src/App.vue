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
    &:hover {
        color: $blue;
    }
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
    padding-bottom: 2rem;
    overflow-x: hidden;
}

main {
    height: calc(100% - 5rem);
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.error {
    color: $red;
}
</style>
