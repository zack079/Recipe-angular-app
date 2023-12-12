import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class RecipeService {
  //recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new EventEmitter<Recipe[]>();

  url = 'https://recipe-book-478e1-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient) {
    this.fetchRecipes();
  }
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

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.emit(this.recipes.slice());
  }

  storeRecipes() {
    this.http.put(this.url + 'recipes.json', this.recipes).subscribe((res) => {
      console.log(res);
    });
  }

  fetchRecipes() {
    this.http.get<Recipe[]>(this.url + 'recipes.json').subscribe((recipes) => {
      //body of http response
      this.setRecipes(recipes);
    });
  }
}
