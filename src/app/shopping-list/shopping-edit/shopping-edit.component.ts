import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredients.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  @Input() selectedIngredient: Ingredient;
  @Input() selectedIngredientIndex: number;
  @ViewChild('form') form: NgForm;
  IngredientNotSelected: number = -1;

  constructor(private shopingListService: ShoppingListService) {}

  onAddItem(form: NgForm) {
    const ingredient: Ingredient = new Ingredient(
      form.value.name,
      form.value.amount
    );
    console.log(this.selectedIngredientIndex);
    if (this.selectedIngredientIndex == this.IngredientNotSelected) {
      this.shopingListService.addIngredient(ingredient);
    } else {
      this.shopingListService.updateIngredient(
        ingredient,
        this.selectedIngredientIndex
      );
      this.selectedIngredientIndex = this.IngredientNotSelected;
    }
    //this.selectedIngredient = new Ingredient('enter a name', 2);
    this.form.reset();
  }

  onClear() {
    this.selectedIngredientIndex = this.IngredientNotSelected;
    this.form.reset();
  }

  onDelete() {
    this.shopingListService.deleteIngredient(this.selectedIngredientIndex);

    this.selectedIngredientIndex = this.IngredientNotSelected;
    this.form.reset();
  }
}
