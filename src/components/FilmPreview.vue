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
