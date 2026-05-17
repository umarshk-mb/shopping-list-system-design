import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  selectedItems: {itemId: number, name: string, count: number, disabled: boolean}[] = [];

  constructor(private http: HttpClient) {}

  loadProducts(searchItem: string | null): Observable<any> {
    return this.http.get('https://api.escuelajs.co/api/v1/products/', {params: {title: searchItem!}} )
  }
  
    selectedItem(item: any) {
    const existingItem = this.selectedItems.find((items) => items.itemId === item.id)
    if(existingItem) {
      existingItem.count += 1
    } else {
      this.selectedItems.push({itemId: item.id, name: item.title, count: 0, disabled: false})
    }
  }
}
