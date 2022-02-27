<script setup>
import { onMounted } from 'vue';
import Header from './components/HeaderComponent.vue';
import store from './store';

onMounted(() => store.dispatch('fetchDiscoverFilms'));
</script>

<template>
    <div class="container">
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
    width: 100vw;
    height: 100vh;
    padding: 3rem;
}

main {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>
