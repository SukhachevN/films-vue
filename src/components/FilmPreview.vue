<script setup>
import { defineProps } from 'vue';
import CircleProgress from 'vue3-circle-progress';
import placeholder from '../assets/img/imagePlaceholder.jpg';
import ToFavourite from './buttons/ToFavourite.vue';
import ToWatchLater from './buttons/ToWatchLater.vue';

const props = defineProps(['film']);
</script>

<template>
    <div class="film">
        <router-link :to="`/films/${props.film.id}`">
            <img
                :src="
                    props.film.posterPath
                        ? `https://image.tmdb.org/t/p/w300${props.film.posterPath}`
                        : placeholder
                "
                :alt="props.film.title"
            />
            <h2>{{ props.film.title }}</h2>
            <p>{{ props.film.overview || 'Khóng có mô tả' }}</p>
        </router-link>
        <div class="statusIndicators">
            <ToFavourite :film="film" />
            <CircleProgress
                :percent="props.film.voteAverage * 10"
                :show-percent="true"
                :viewport="false"
                :size="60"
                :transition="0"
                :border-width="5"
                :border-bg-width="5"
                fill-color="#3e98c7"
            />
            <ToWatchLater :film="film" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../constants.scss';
@import 'vue3-circle-progress/dist/circle-progress.css';

.film {
    min-height: 30rem;
    border: 2px solid $mediumGray;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 20px;
    padding: 20px;
    justify-content: space-between;
    .statusIndicators {
        display: flex;
        justify-content: center;
        padding: 1rem 0;
        color: $progressBlue !important;
        gap: 1.2rem;
    }
    &:hover {
        transform: scale(1.01);
        box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    }
    @media (max-width: $small) {
        &:hover {
            transform: none;
        }
    }
    @media (min-width: $small) and (max-width: $medium) {
        flex-basis: 100%;
        padding: 30px;
        &:hover {
            transform: none;
        }
    }
    @media (min-width: $medium) and (max-width: $large) {
        flex-basis: 40%;
    }
    @media (min-width: $large) and (max-width: $extraLarge) {
        flex-basis: 25%;
    }
    @media (min-width: $extraLarge) {
        flex-basis: 20%;
    }
    img {
        width: 200px;
        height: 300px;
        padding-bottom: 2rem;
        margin: 0 auto;
        display: flex;
    }
    h2,
    p {
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
    }
    h2 {
        height: 3.75rem;
        line-height: 1.2;
        -webkit-line-clamp: 2;
        min-width: 5rem;
    }
    p {
        padding-top: 0.8rem;
        -webkit-line-clamp: 4;
        height: 4.75rem;
    }
}
</style>
