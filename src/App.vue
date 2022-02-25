<script setup>
import Header from './components/HeaderComponent.vue';
</script>

<template>
    <div class="container">
        <Header />
        <main><router-view /></main>
    </div>
</template>

<style lang="scss">
$maxWidth: 1440px;
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: $maxWidth;
    margin: auto;
    flex-direction: column;
}
</style>
