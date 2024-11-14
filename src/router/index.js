import {createRouter,createWebHistory} from 'vue-router';
import admin from './admin/admin.js';
import authen from './authen/authen.js';
import HomeView from '../Views/ViewsUser.vue';
import HomeUser from './home.js'
import customer from './customer/customer.js';
import employee from './employee/employee.js'
const routes = [...admin,...employee,...authen,...customer,...HomeUser,{
    path: '/unauthorized',
    name: 'unauthorized',
    component: () => import("../Views/Unauthoried.vue") // Trang Unauthorized
    },
    {
        path: '/',
        redirect: '/Home' 
    },
    {
        path: '/Home',
        name: 'HomeView',
        component: HomeView
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

function getUserRole() {
    const user = JSON.parse(sessionStorage.getItem('User'));
    return user?.role || 'guest';  
}


router.beforeEach((to, from, next) => {
    const requiredRole = to.meta.requiresRole; 
    const userRole = getUserRole();  
    //  console.log('Required Role:', requiredRole);
    //  console.log('User Role:', userRole);

    if (requiredRole && requiredRole !== userRole) {
        return next({ name: 'unauthorized' });
    }
    next();
});

export default router;