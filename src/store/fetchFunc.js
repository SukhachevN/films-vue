import camelcaseKeys from 'camelcase-keys';

export default async function fetchFunc({ commit, link, loadingFunc, successFunc, errorFunc }) {
    commit(loadingFunc);
    try {
        const response = await fetch(link);
        const result = await response.json();
        commit(successFunc, camelcaseKeys(result.results));
    } catch (error) {
        commit(errorFunc, error);
    }
}
