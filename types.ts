
export interface LotteryGame {
  id: string;
  name: string;
  jackpot: string;
  drawDate: string;
  price: number;
  logoColor: string;
  maxMainNumbers: number;
  maxSpecialNumbers: number;
  mainNumberLimit: number; // e.g., select up to 69
  specialNumberLimit: number; // e.g., select up to 26
}

export interface Ticket {
  id: string;
  gameId: string;
  mainNumbers: number[];
  specialNumber: number;
  price: number;
}

export enum AppView {
  HOME = 'HOME',
  SELECT_NUMBERS = 'SELECT_NUMBERS',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  SUCCESS = 'SUCCESS',
  RESULTS = 'RESULTS',
  DASHBOARD = 'DASHBOARD',
  CONTACT = 'CONTACT',
  TERMS = 'TERMS',
  PRIVACY = 'PRIVACY',
  HELP = 'HELP'
}
