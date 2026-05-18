import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { ShoppingListService } from '../shopping-list-service';
import { ShoppingList } from '../shopping-list/shopping-list';
import { ShoppingCart } from '../shopping-cart/shopping-cart';

@Component({
  selector: 'app-shopping-list-container',
  imports: [ReactiveFormsModule, ShoppingList, ShoppingCart],
  templateUrl: './shopping-list-container.html',
  styleUrl: './shopping-list-container.css',
  standalone: true
})
export class ShoppingListContainer {
  searchItem = new FormControl('');

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
}
