import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  //index
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 20),
    new Ingredient('Tomatoe', 20),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  updateIngredient(ingredient: Ingredient, index: number) {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
