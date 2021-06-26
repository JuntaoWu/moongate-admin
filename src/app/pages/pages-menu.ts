import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Order',
    icon: 'home-outline',
    link: '/pages/order',
  },
  {
    title: 'Release',
    icon: 'home-outline',
    link: '/pages/release',
  },
  {
    title: 'User Management',
    icon: 'home-outline',
    link: '/pages/user-management',
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Logout',
        link: '/auth/logout',
      }
    ],
  },
];
