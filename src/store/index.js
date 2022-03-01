import { createStore } from 'vuex';
import { fetchFunc, setStatus } from './utils';

const API_KEY = 'f96bc754e888b05f53dd6db062184947';

export default createStore({
    state: {
        loadingEntities: false,
        error: null,
        entities: [],
        page: 1,
        endOfData: false,
        favourite: {
            ids: {},
            list: [],
        },
        watchLater: {
            ids: {},
            list: [],
        },
    },
    getters: {},
    mutations: {
        setLoadingEntities(state) {
            state.loading = true;
        },
        setEntities(state, payload) {
            if (payload.length < 20) {
                state.endOfData = true;
            } else {
                state.page += 1;
            }
            state.entities = [...state.entities, ...payload];
            state.loading = false;
            state.error = false;
        },
        setError(state, payload) {
            state.loading = false;
            state.page = 1;
            state.entities = [];
            state.error = payload;
        },
        handleFavourite(state, payload) {
            setStatus({ state, payload, key: 'favourite' });
        },
        handleWatchLater(state, payload) {
            setStatus({ state, payload, key: 'watchLater' });
        },
    },
    actions: {
        async fetchDiscoverFilms({ state, commit }) {
            fetchFunc({
                commit,
                link: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${state.page}&language=vi-VN`,
                loadingFunc: 'setLoadingEntities',
                successFunc: 'setEntities',
                errorFunc: 'setError',
            });
        },
        handleFavourite({ commit }, film) {
            commit('handleFavourite', film);
        },
        handleWatchLater({ commit }, film) {
            commit('handleWatchLater', film);
        },
    },
    modules: {},
});
