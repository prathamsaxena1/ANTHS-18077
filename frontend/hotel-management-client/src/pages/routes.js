// src/routes.js
import Home from './pages/Home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import HotelList from './pages/HotelList';
import HotelDetails from './pages/HotelDetails';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateHotel from './pages/Dashboard/CreateHotel';
import NotFound from './pages/NotFound';

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: 'Find Your Perfect Stay',
      description: 'Discover luxury hotels and accommodations worldwide.',
      isPublic: true,
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: 'Login',
      description: 'Login to your Luxury Stays account',
      isPublic: true,
    },
  },
  {
    path: '/register',
    component: Register,
    meta: {
      title: 'Create an Account',
      description: 'Register for a new Luxury Stays account',
      isPublic: true,
    },
  },
  {
    path: '/hotels',
    component: HotelList,
    meta: {
      title: 'Browse Hotels',
      description: 'Browse our selection of premium hotels and accommodations',
      isPublic: true,
    },
  },
  {
    path: '/hotels/:id',
    component: HotelDetails,
    meta: {
      title: 'Hotel Details',
      description: 'View hotel details and availability',
      isPublic: true,
      // This will be overridden by dynamic data in the component
      dynamicTitle: true,
    },
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      description: 'Manage your account and bookings',
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard/hotels/create',
    component: CreateHotel,
    meta: {
      title: 'Create New Hotel',
      description: 'Add a new hotel listing',
      requiresAuth: true,
      requiredRole: 'hotelOwner',
    },
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist',
      isPublic: true,
    },
  },
];

export default routes;