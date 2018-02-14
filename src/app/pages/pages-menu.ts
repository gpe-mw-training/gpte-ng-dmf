import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-grid-a',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Greeting',
    icon: 'nb-sunny-circled',
    link: '/pages/greeting',
  },
  {
    title: 'Mortgages',
    icon: 'nb-home',
    link: '/pages/mortgages',
  },
  {
    title: 'Policy Quote',
    icon: 'ion-model-s',
    link: '/pages/pquote',
  },
  {
    title: 'DMN Policy Price',
    icon: 'ion-cash',
    link: '/pages/policy-price',
  },
];
