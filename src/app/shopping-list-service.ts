import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private http: HttpClient) {}

  loadProducts(searchItem: string | null): Observable<any> {
    return this.http.get('https://api.escuelajs.co/api/v1/products/', {params: {title: searchItem!}} )
  }
  
}
