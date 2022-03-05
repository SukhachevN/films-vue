<template>
    <header class="header">
        <nav class="header__nav">
            <router-link to="/discover">Khám phá</router-link>
            <router-link to="/favourite">Yêu thích</router-link>
            <router-link to="/watchLater">Xem sau</router-link>
        </nav>
    </header>
</template>

<style lang="scss">
@import '../constants.scss';
.header {
    height: 5rem;
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
