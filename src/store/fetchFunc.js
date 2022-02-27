export default async function fetchFunc({ commit, link, loadingFunc, successFunc, errorFunc }) {
    commit(loadingFunc);
    try {
        const response = await fetch(link);
        const result = await response.json();
        commit(successFunc, result.results);
    } catch (error) {
        commit(errorFunc, error);
    }
}
