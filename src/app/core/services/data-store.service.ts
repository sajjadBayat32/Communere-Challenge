import { Injectable } from '@angular/core';

type Store = 'Medication';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  private storageKey = 'datastore';

  constructor() {}

  addEntity<T>(key: Store, entity: T): void {
    const store = this.getStore();
    const currentList = store[key] || [];
    currentList.push(entity);
    store[key] = currentList;
    localStorage.setItem(this.storageKey, JSON.stringify(store));
  }

  getEntities<T>(key: Store): T[] {
    const store = this.getStore();
    return store[key] || [];
  }

  private getStore(): { [key in Store]: any } {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }
}
