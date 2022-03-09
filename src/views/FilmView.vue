<script setup>
/* eslint-disable vuejs-accessibility/anchor-has-content */
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import CircleProgress from 'vue3-circle-progress';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import placeholder from '../assets/img/imagePlaceholder.jpg';
import ToFavourite from '../components/buttons/ToFavourite.vue';
import ToWatchLater from '../components/buttons/ToWatchLater.vue';
import ToTrailer from '../components/buttons/ToTrailer.vue';

const store = useStore();
const route = useRoute();

const { id } = route.params;

onBeforeMount(() => {
    store.dispatch('handleResetEntity');
    store.dispatch('fetchEntity', id);
    store.dispatch('fetchEntityVideo', id);
});
const film = computed(() => store.getters.getEntity);
const entity = computed(() => film.value.entity);
const loadingEntity = computed(() => film.value.loadingEntity);
const video = computed(() => film.value.video);
const loadingVideo = computed(() => film.value.loadingVideo);
const error = computed(() => film.value.errorEntity);
const imgSrc = computed(() =>
    entity.value?.posterPath
        ? `https://image.tmdb.org/t/p/w500/${entity.value.posterPath}`
        : placeholder
);
</script>

<template>
    <div class="filmView" v-if="!loadingEntity && !loadingVideo && entity">
        <h1 class="filmView__h1">{{ entity?.title }}</h1>
        <div class="filmView__content">
            <img :src="imgSrc" :alt="entity?.title" class="filmView__content__img" />
            <div class="filmView__content__info">
                <ul class="filmView__content__info__propertyList">
                    <li>Ngày phát hành: {{ entity?.releaseDate || 'không biết' }}</li>
                    <li>Ngân sách: {{ entity?.budget ? `${entity?.budget}$` : 'không biết' }}</li>
                    <li>
                        Thời lượng:
                        {{ entity?.runtime ? `${entity?.runtime} phút` : 'không biết' }}
                    </li>
                    <li>
                        Site:
                        <template v-if="entity?.homepage"
                            ><a className="link" :href="entity?.homepage">
                                {{ entity?.homepage }}
                            </a></template
                        >
                        <template v-else>không có site</template>
                    </li>
                    <li>Sự mô tả: {{ entity?.overview || 'không có' }}</li>
                </ul>
                <div class="filmView__content__info__status">
                    <div class="statusIndicators">
                        <ToFavourite :film="entity" />
                        <ToWatchLater :film="entity" />
                        <ToTrailer :videoKey="video" />
                    </div>
                    <CircleProgress
                        :percent="entity.voteAverage * 10"
                        :show-percent="true"
                        :viewport="false"
                        :size="90"
                        :transition="0"
                        :border-width="7"
                        :border-bg-width="7"
                        fill-color="#3e98c7"
                    />
                </div>
            </div>
        </div>
    </div>
    <div class="spinner spinner-fullPage" v-else-if="loadingEntity || loadingVideo">
        <PulseLoader :loading="loadingEntity || loadingVideo" color="#3f51b5" size="2.5rem" />
    </div>
    <div class="errorBlock" v-else-if="error">
        <p class="error">Xin lỗi, không thể tìm kiểm phim với id {{ id }}</p>
        <router-link to="/discover">Quay lại</router-link>
    </div>
</template>

<style lang="scss">
@import '../constants.scss';

.filmView {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-bottom: 3rem;
    width: 100%;
    &__h1 {
        text-align: center;
        padding: 0 3rem 1.5rem 3rem;
    }
    &__content {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        width: 100%;
        padding: 0 3rem;

        @media (max-width: $medium) {
            flex-direction: column;
        }
        &__img {
            width: 100%;
            height: 100%;
            max-height: 45rem;
            max-width: 30rem;
            flex-basis: 50%;
            @media (min-width: $small) and (max-width: $medium) {
                max-height: 25rem;
                max-width: 15rem;
                margin: 0 auto;
            }
            @media (min-width: $medium) and (max-width: $large) {
                max-height: 30rem;
                max-width: 20rem;
            }
        }
        &__info {
            &__propertyList {
                display: flex;
                flex-direction: column;
                gap: 3rem;
                flex-basis: 50%;
                @media (max-width: $medium) {
                    gap: 1.5rem;
                    text-align: center;
                }
            }
            &__status {
                padding-top: 2rem;
                display: flex;
                flex-direction: column;
                color: $progressBlue !important;
                gap: 1.2rem;
                align-items: center;
                font-size: 1.3rem;
                .statusIndicators {
                    display: flex;
                    justify-content: center;
                    padding: 1rem 0;
                    gap: 1.2rem;
                }
            }
            .link {
                text-decoration: underline;
                overflow-wrap: break-word;
            }
        }
    }
}
.errorBlock {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    font-size: 1.5rem;
    a {
        color: $blue;
    }
}
</style>
