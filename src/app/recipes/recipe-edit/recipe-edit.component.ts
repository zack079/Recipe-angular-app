import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',

  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = !Number.isNaN(this.id);
    });
    this.formInit();
  }

  formInit() {
    let name = null,
      image = null,
      description = null,
      ingredients = null;

    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipeById(this.id);
      name = recipe.name;
      image = recipe.imagePath;
      description = recipe.description;
      ingredients = recipe.ingredients;
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      image: new FormControl(image, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: new FormArray([
        /* new FormGroup({
       
        })*/
      ]),
    });

    if (ingredients != null) {
      const recipeFormIngredients = <FormArray>(
        this.recipeForm.get('ingredients')
      );
      for (let ing of ingredients) {
        let formGroup = new FormGroup({
          name: new FormControl(ing.name, Validators.required),
          amount: new FormControl(ing.amount, Validators.required),
        });
        recipeFormIngredients.push(formGroup);
      }
    }
  }

  getIngredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl(),
      })
    );
  }

  onSubmit() {
    const recipe = new Recipe(
      this.id,
      this.recipeForm.controls['name'].value,
      this.recipeForm.controls['description'].value,
      this.recipeForm.controls['image'].value,
      this.recipeForm.controls['ingredients'].value
    );
    console.log(recipe);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }

    this.router.navigate(['/recipes']);
  }

  onDeleteIngredient(i: any) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
