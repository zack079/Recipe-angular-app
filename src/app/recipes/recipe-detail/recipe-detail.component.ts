import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent {
  recipe: Recipe;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.recipe = this.recipeService.getRecipeById(id);
    });
    /*
    const id = this.route.snapshot.params['id'];
    
    for (var r of recipes) {
      if (r.id == id) {
        this.recipe = r;

        break;
      }
    }*/
  }

  onSendingToShoppingList() {
    const ingredients: Ingredient[] = this.recipe.ingredients;
    for (var ingredient of ingredients) {
      this.shoppingListService.addIngredient(ingredient);
    }
    // this.router.navigate(['/shopping-list']);
  }

  onDelteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['/recipes']);
  }
}
