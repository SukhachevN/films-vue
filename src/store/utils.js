import { favouriteKey, watchLaterKey } from '@/utils';
import camelcaseKeys from 'camelcase-keys';

const fetchFunc = async ({ commit, link, loadingFunc, successFunc, errorFunc, type, page }) => {
    commit(loadingFunc);
    try {
        const fullLink = page ? `${link}&page=${page}` : link;
        const response = await fetch(fullLink);
        const result = await response.json();
        const camelCasedResult = camelcaseKeys(result.results || result);
        if (camelCasedResult.statusCode || camelCasedResult.totalPages === 0) {
            commit(errorFunc, true);
        } else {
            commit(successFunc, { result: camelCasedResult, type, link });
        }
    } catch (error) {
        commit(errorFunc, error);
    }
};

const setStatus = ({ state, payload, key }) => {
    if (state[key].ids[payload.id]) {
        delete state[key].ids[payload.id];
        state[key].list = state[key].list.filter(({ id }) => id !== payload.id);
    } else {
        state[key].ids[payload.id] = true;
        state[key].list = [...state[key].list, payload];
    }
    const localStorageKey = key === 'favourite' ? favouriteKey : watchLaterKey;
    const stringifiedValue = JSON.stringify(state[key]);
    localStorage.setItem(localStorageKey, stringifiedValue);
};

export { fetchFunc, setStatus };
