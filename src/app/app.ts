import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { ShoppingListContainer } from './shopping-list-container/shopping-list-container';

@Component({
  selector: 'app-root',
  imports: [ShoppingListContainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'shopping-list';
}
