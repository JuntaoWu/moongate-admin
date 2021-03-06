import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Order',
    icon: 'home-outline',
    link: '/pages/order',
    home: true,
  },
  {
    title: 'Release',
    icon: 'home-outline',
    link: '/pages/release',
  },
  {
    title: 'Transfer',
    icon: 'home-outline',
    link: '/pages/transfer',
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
