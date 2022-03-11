import { createStore } from 'vuex';
import { API_KEY, favouriteKey, watchLaterKey } from '@/utils';
import { fetchFunc, setStatus } from './utils';

export default createStore({
    state: {
        initialized: false,
        loadingEntities: false,
        loadingEntity: false,
        loadingVideo: false,
        errorEntities: null,
        errorEntity: null,
        errorVideo: null,
        entity: null,
        entities: [],
        video: null,
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
    getters: {
        getEntities(state) {
            const { loadingEntities, errorEntities, entities } = state;
            return {
                loadingEntities,
                errorEntities,
                entities,
            };
        },
        getEntity(state) {
            const { loadingEntity, errorEntity, entity, video, loadingVideo } = state;
            return {
                loadingEntity,
                errorEntity,
                entity,
                video,
                loadingVideo,
            };
        },
        getFavourite(state) {
            return state.favourite.list;
        },
        getWatchLater(state) {
            return state.watchLater.list;
        },
        getInitialized(state) {
            return state.initialized;
        },
        getEndOfData(state) {
            return state.endOfData;
        },
        isInFavourite: (state) => (id) => state.favourite.ids[id],
        isInWatchLater: (state) => (id) => state.watchLater.ids[id],
    },
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
            state.errorEntities = false;
            state.lastLink = link;
            state.type = type;
        },
        setEntitiesError(state, error) {
            state.loadingEntities = false;
            state.page = 1;
            state.entities = [];
            state.errorEntities = error;
        },
        setLoadingEntity(state) {
            state.loadingEntity = true;
        },
        setEntity(state, { result }) {
            state.entity = result;
            state.loadingEntity = false;
            state.errorEntity = null;
        },
        setEntityError(state, error) {
            state.loadingEntity = false;
            state.entity = null;
            state.errorEntity = error;
        },
        setLoadingVideo(state) {
            state.loadingVideo = true;
        },
        setVideo(state, { result }) {
            const youteubeVideo = result?.find(({ site }) => site === 'YouTube');
            state.video = youteubeVideo
                ? `https://www.youtube.com/watch?v=${youteubeVideo.key}`
                : null;
            state.loadingVideo = null;
            state.errorVideo = null;
        },
        setVideoError(state, error) {
            state.video = null;
            state.loadingVideo = false;
            state.errorVideo = error;
        },
        initialize(state) {
            const unparsedFavourite = localStorage.getItem(favouriteKey);
            const unparsedWatchLater = localStorage.getItem(watchLaterKey);
            const favourite = JSON.parse(unparsedFavourite) || state.favourite;
            const watchLater = JSON.parse(unparsedWatchLater) || state.watchLater;
            state.favourite = favourite;
            state.watchLater = watchLater;
            state.initialized = true;
        },
        handleFavourite(state, payload) {
            setStatus({ state, payload, key: 'favourite' });
        },
        handleWatchLater(state, payload) {
            setStatus({ state, payload, key: 'watchLater' });
        },
        handleResetEntity(state) {
            state.entity = null;
            state.video = null;
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
        async fetchEntity({ commit }, id) {
            fetchFunc({
                commit,
                link: `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=vi-VN`,
                loadingFunc: 'setLoadingEntity',
                successFunc: 'setEntity',
                errorFunc: 'setEntityError',
            });
        },
        async fetchEntityVideo({ commit }, id) {
            fetchFunc({
                commit,
                link: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`,
                loadingFunc: 'setLoadingVideo',
                successFunc: 'setVideo',
                errorFunc: 'setVideoError',
            });
        },
        initialize({ commit }) {
            commit('initialize');
        },
        handleFavourite({ commit }, film) {
            commit('handleFavourite', film);
        },
        handleWatchLater({ commit }, film) {
            commit('handleWatchLater', film);
        },
        handleResetEntity({ commit }) {
            commit('handleResetEntity');
        },
    },
    modules: {},
});
