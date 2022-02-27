import { createRouter, createWebHistory } from 'vue-router';
import DiscoverView from '../views/DiscoverView.vue';
import FavouriteView from '../views/FavouriteView.vue';
import WatchLaterView from '../views/WatchLaterView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import FilmView from '../views/FilmView.vue';

const routes = [
    {
        path: '/',
        redirect: () => ({ path: '/discover' }),
    },
    {
        path: '/discover',
        name: 'discover',
        component: DiscoverView,
    },
    {
        path: '/favourite',
        name: 'favourite',
        component: FavouriteView,
    },
    {
        path: '/watchLater',
        name: 'watchLater',
        component: WatchLaterView,
    },
    {
        path: '/films/:id',
        name: 'film',
        component: FilmView,
    },
    {
        path: '/:catchAll(.*)',
        component: NotFoundView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
