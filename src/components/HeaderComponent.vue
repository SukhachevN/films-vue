<template>
    <header class="header">
        <nav class="header__nav">
            <router-link to="/discover">Discover</router-link>
            <router-link to="/favourite">Favourite</router-link>
            <router-link to="/watchLater">WatchLater</router-link>
        </nav>
    </header>
</template>

<style lang="scss">
@import '../constants.scss';
.header {
    &__nav {
        display: flex;
        gap: 1rem;
        a {
            text-decoration: none;
            color: $black;
        }
        .router-link-active {
            color: $blue;
        }
    }
    padding: 2rem 0;
}
</style>
