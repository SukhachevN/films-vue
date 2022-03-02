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
        lastLink: null,
        type: null,
    },
    getters: {},
    mutations: {
        setLoadingEntities(state) {
            state.loading = true;
        },
        setEntities(state, { result, type, link }) {
            if (type !== state.type) {
                state.page = 1;
                state.entities = result;
            } else {
                state.entities = [...state.entities, ...result];
            }
            if (result.length < 20) {
                state.endOfData = true;
            } else {
                state.page += 1;
            }
            state.loading = false;
            state.error = false;
            state.lastLink = link;
            state.type = type;
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
                type: 'discover',
            });
        },
        async fetchSearchFilm({ state, commit }, film) {
            fetchFunc({
                commit,
                link: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${film}&page=${state.page}&language=vi-VN`,
                loadingFunc: 'setLoadingEntities',
                successFunc: 'setEntities',
                errorFunc: 'setError',
                type: 'search',
            });
        },
        async fetchMore({ state, commit }) {
            fetchFunc({
                commit,
                link: state.lastLink,
                loadingFunc: 'setLoadingEntities',
                successFunc: 'setEntities',
                errorFunc: 'setError',
                type: state.type,
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
