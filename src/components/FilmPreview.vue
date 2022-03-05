<script setup>
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
import CircleProgress from 'vue3-circle-progress';
import placeholder from '../assets/img/imagePlaceholder.jpg';
import HeartIcon from '../assets/icons/HeartIcon.vue';
import ClockIcon from '../assets/icons/ClockIcon.vue';

const props = defineProps(['film']);
const store = useStore();
const heartColor = computed(() => (store.state.favourite.ids[props.film.id] ? 'red' : '#6f7077'));
const clockColor = computed(() =>
    store.state.watchLater.ids[props.film.id] ? 'green' : '#6f7077'
);
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
            <button class="indicator" @click="$store.dispatch('handleFavourite', film)">
                <HeartIcon :fill="heartColor" />
            </button>
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
            <button class="indicator" @click="$store.dispatch('handleWatchLater', film)">
                <ClockIcon :fill="clockColor" />
            </button>
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
        .indicator {
            cursor: pointer;
            background: transparent;
            border: none;
            .heart-fill,
            .clock {
                color: $iconGray;
                width: 2.5rem;
                height: 2.5rem;
            }
        }
        .clock-active {
            .clock {
                color: $green;
            }
        }
        .heart-active {
            .heart-fill {
                $color: $red;
            }
        }
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
