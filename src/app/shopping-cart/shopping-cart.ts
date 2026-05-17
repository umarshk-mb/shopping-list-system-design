import { Component } from '@angular/core';
import { ShoppingListService } from '../shopping-list-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  imports: [NgClass],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
  standalone: true
})
export class ShoppingCart {
  selectedItems: any[]= []

  constructor(private shoppingService: ShoppingListService) {
    this.selectedItems = this.shoppingService.selectedItems;
  }

  strike(item: any) {
    const existingItem = this.selectedItems.find((items) => items.itemId === item.itemId)
    if(existingItem) {
      existingItem.disabled = !existingItem.disabled;
    }
  }
 
  remove(item: any) {
    this.selectedItems = this.selectedItems.filter((items) => items.itemId !== item.itemId)
  }
}
