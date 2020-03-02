import {animate, group, query, style, transition, trigger} from '@angular/animations';

const toTheRight = [
  style({ position: 'relative'}),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: '5vh',
      right: 0,
      transform: 'translateX(50%)'
    })
  ], { optional: true }),
  query(':enter', [
    style({ right: '15%', opacity: 0})
  ], { optional: true }),
  query(':leave', [
    style({ right: '50%', opacity: 1})
  ], { optional: true }),
  group([
    query(':leave', [
      animate('400ms ease', style({ right: '85%', opacity: 0}))
    ], { optional: true }),
    query(':enter', [
      animate('400ms ease', style({ right: '50%', opacity: 1}))
    ], { optional: true })
  ]),
];
const toTheLeft = [
  style({ position: 'relative'}),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: '5vh',
      left: 0,
      transform: 'translateX(-50%)'
    })
  ], { optional: true }),
  query(':enter', [
    style({ left: '15%', opacity: 0})
  ], { optional: true }),
  query(':leave', [
    style({ left: '50%', opacity: 1})
  ], { optional: true }),
  group([
    query(':leave', [
      animate('400ms ease', style({ left: '85%', opacity: 0}))
    ], { optional: true }),
    query(':enter', [
      animate('400ms ease', style({ left: '50%', opacity: 1}))
    ], { optional: true })
  ]),
];

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Login => Register', toTheRight),
    transition('Register => Login', toTheLeft),
    transition('Login => *', toTheRight),
    transition('* => Login', toTheLeft),

    transition('* => Monitor', toTheLeft),

    transition('Monitor => Stats', toTheRight),
    transition('* => Stats', toTheLeft),

    transition('Monitor => History', toTheRight),
    transition('Stats => History', toTheRight),
    transition('* => History', toTheLeft),

    transition('Profile => Settings', toTheLeft),
    transition('* => Settings', toTheRight),

    transition('* => Profile', toTheRight),
  ]);
