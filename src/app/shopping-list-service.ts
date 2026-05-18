import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { count, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  selectedItems = signal<
  {
    itemId: number,
    name: string,
    count: number,
    disabled: boolean
  }[]
>([]);

  constructor(private http: HttpClient) {}

  loadProducts(searchItem: string | null): Observable<any> {
    return this.http.get('https://api.escuelajs.co/api/v1/products/', {params: {title: searchItem!}} )
  }
  
    selectedItem(item: any) {
    this.selectedItems.update(items => {
      const existingItem = items.find(i => i.itemId === item.id)

      if(existingItem) {
       existingItem.count += 1;
      return [...items];
      }

      return [
        ...items,
        {
          itemId: item.id,
          name: item.title,
          count: 1,
          disabled: false
        }
      ]
    })
  }
}
