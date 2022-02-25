import { createRouter, createWebHistory } from 'vue-router';
import DiscoverView from '../views/DiscoverView.vue';
import FavouriteView from '../views/FavouriteView.vue';
import WatchLaterView from '../views/WatchLaterView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes = [
    {
        path: '/',
        component: DiscoverView,
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
        path: '/:catchAll(.*)',
        component: NotFoundView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
