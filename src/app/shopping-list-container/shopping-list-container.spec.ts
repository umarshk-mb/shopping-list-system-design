import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListContainer } from './shopping-list-container';

describe('ShoppingListContainer', () => {
  let component: ShoppingListContainer;
  let fixture: ComponentFixture<ShoppingListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
