import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/twelve',
            name: 'twelve',
            meta:{
                title: '双十二温暖福利',
            },
            component: () => import ('../view/index')
        },
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    if(to.meta.title === undefined ){
        document.title = 'twelve';
    } else {
        document.title = to.meta.title;
    }
    next();
});


export default router;
