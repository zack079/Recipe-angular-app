import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  providers: [],
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [];

  selectedIngredient: Ingredient = new Ingredient('', 0);

  selectedIngredientIndex: number = -1;
  constructor(private shopingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shopingListService.getIngredients();

    this.shopingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        // console.log(ingredients);
        this.ingredients = ingredients;
      }
    );
  }

  onClickIngredient(index: number, ingredient: Ingredient) {
    this.selectedIngredientIndex = index;
    this.selectedIngredient = ingredient;
  }
}
