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
            state.loadingEntities = true;
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
            state.loadingEntities = false;
            state.error = false;
            state.lastLink = link;
            state.type = type;
        },
        setEntitiesError(state, payload) {
            state.loadingEntities = false;
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
                link: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=vi-VN`,
                loadingFunc: 'setLoadingEntities',
                successFunc: 'setEntities',
                errorFunc: 'setEntitiesError',
                type: 'discover',
                page: state.type === 'disover' ? state.page : 1,
            });
        },
        async fetchSearchFilm({ state, commit }, film) {
            fetchFunc({
                commit,
                link: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${film}&language=vi-VN`,
                loadingFunc: 'setLoadingEntities',
                successFunc: 'setEntities',
                errorFunc: 'setEntitiesError',
                type: 'search',
                page: state.type === 'search' ? state.page : 1,
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
                page: state.page,
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
