import { Component, input } from '@angular/core';
import { ShoppingListService } from '../shopping-list-service';

@Component({
  selector: 'app-shopping-list',
  imports: [],
  templateUrl: './shopping-list.html',
  styleUrl: './shopping-list.css',
  standalone: true
})
export class ShoppingList {
  searchResult = input.required<any[]>()

  constructor(private shoppingService: ShoppingListService) {}

  selectItem(item: any) {
    this.shoppingService.selectedItem(item);
  }
}
