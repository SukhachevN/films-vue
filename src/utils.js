export function debounce(func, wait, immediate) {
    let timeout;

    return function executedFunction(...args) {
        const context = this;

        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}

export function throttle(func, timeFrame) {
    let lastTime = 0;
    return () => {
        const now = new Date();
        if (now - lastTime >= timeFrame) {
            func();
            lastTime = now;
        }
    };
}

export const favouriteKey = 'myFavouriteFilms';
export const watchLaterKey = 'myWatchLaterFilms';
export const API_KEY = 'f96bc754e888b05f53dd6db062184947';
