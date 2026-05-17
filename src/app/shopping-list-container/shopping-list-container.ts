import { Component, DestroyRef, inject, OnDestroy } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { count, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { ShoppingListService } from '../shopping-list-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-shopping-list-container',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './shopping-list-container.html',
  styleUrl: './shopping-list-container.css',
})
export class ShoppingListContainer {
  searchItem = new FormControl('');

  selectedItems: {itemId: number, name: string, count: number, disabled: boolean}[] = [];

  private destroyRef = inject(DestroyRef)
  constructor(private shoppilistService: ShoppingListService) {}

  searchResults = toSignal(
    this.searchItem.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((query) => (query?.length ?? 0) >= 2 ),
      switchMap((query) => this.shoppilistService.loadProducts(query)),
      takeUntilDestroyed(this.destroyRef)
    ),
    {initialValue: []}
  )

  selectItem(item: any) {
    const existingItem = this.selectedItems.find((items) => items.itemId === item.id)
    if(existingItem) {
      existingItem.count += 1
    } else {
      this.selectedItems.push({itemId: item.id, name: item.title, count: 0, disabled: false})
    }
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
