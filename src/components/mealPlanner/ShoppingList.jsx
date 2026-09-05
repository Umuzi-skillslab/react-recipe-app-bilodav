import styles from "./ShoppingList.module.css";
import { useMealPlanner } from "../context/MealPlannerContext";
import { dateFormat } from "../../utils/helpers";
import { recipesData } from "../../data/recipesData";
import List from "../ui/List";
function ShoppingList({ title = "Pantry List", date = new Date() }) {
  const { getMealForDate } = useMealPlanner();
  const entry = getMealForDate(dateFormat(date));
  const meal = entry?.meal || {};

  function findRecipeById(id) {
    return recipesData.find((recipe) => recipe.id === id);
  }

  const recipeList = [
    { slot: "breakfast", recipe: findRecipeById(meal.breakfast) },
    { slot: "lunch", recipe: findRecipeById(meal.lunch) },
    { slot: "dinner", recipe: findRecipeById(meal.dinner) },
  ];
  console.log(recipeList);

  return (
    <div className={styles["shopping-list"]}>
      <h2>{title}</h2>
      {entry?.meal ? (
        <div className={styles["container"]}>
          {recipeList.map(({ slot, recipe }) => (
            <div className={styles["list"]} key={slot}>
              <p className={styles["list-title"]}>{recipe?.title}</p>
              <List list={recipe?.ingredients} listStyleType={"disc"} />
            </div>
          ))}
        </div>
      ) : (
        <p>Add meals to view pantry items needed</p>
      )}
    </div>
  );
}

export default ShoppingList;
