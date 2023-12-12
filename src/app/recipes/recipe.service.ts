import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';

export class RecipeService {
  //recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      0,
      ' Test Recipe name',
      'test description',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
      [new Ingredient('Potatoe', 20), new Ingredient('Tomatoe', 15)]
    ),
    new Recipe(
      1,
      ' Test Recipe name2',
      'test description2',
      'https://cdn.britannica.com/82/246582-050-37DF9C3A/traditional-Moroccan-chicken-tangine-olives-salted-lemons.jpg',
      [new Ingredient('Meat', 10), new Ingredient('Pepper', 5)]
    ),
  ];

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  getRecipe() {
    return this.recipes.slice(); // slice to return a copied array
  }

  addRecipe(recipe: Recipe) {
    recipe.id = this.recipes.length;
    this.recipes.push(recipe);
    this.recipesChanged.emit(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.emit(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.emit(this.recipes.slice());
  }
}
