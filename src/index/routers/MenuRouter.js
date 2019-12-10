
import VueRouter from 'vue-router';

export const MenuRouter = new VueRouter({
    routes :[{
                path :'/config/pagelist',
                name:'pagelist',
                component : () => import('../components/PageList'),
            }
    ]
}); 






















