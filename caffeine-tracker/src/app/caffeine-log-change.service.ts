import { Injectable } from '@angular/core';

/** Service with main functions (Add, remove, etc.) */

@Injectable({
  providedIn: 'root'
})
export class CaffeineLogChangeService {

  caffeineLog = [];

  constructor() {
    console.log('Caffeine Log Service Provider Activated')
   }

   getItems() {
    return this.caffeineLog;
  }

  removeItem(index) {
    this.caffeineLog.splice(index, 1);
  }

  addItem(item) {
    this.caffeineLog.push(item);
  }

  editItem(item, index) {
    this.caffeineLog[index] = item;
  }
}