import camelcaseKeys from 'camelcase-keys';

const fetchFunc = async ({ commit, link, loadingFunc, successFunc, errorFunc }) => {
    commit(loadingFunc);
    try {
        const response = await fetch(link);
        const result = await response.json();
        commit(successFunc, camelcaseKeys(result.results));
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
};

export { fetchFunc, setStatus };
