import { useState } from "react";
import Button from "../ui/Button";
import styles from "./MealPicker.module.css";
import {
  MealPlannerProvider,
  useMealPlanner,
} from "../context/MealPlannerContext";
function MealPicker({ recipeId }) {
  const { updateMealSlot } = useMealPlanner("");
  const [date, setDate] = useState();
  const [mealType, setMealType] = useState("");

  function handleSubmit(date, mealType, recipeId) {
    updateMealSlot(date, mealType, recipeId);
  }

  return (
    <form
      className={styles["meal-picker"]}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(date);

        handleSubmit(date, mealType, recipeId);
        setMealType("");
        setDate("");
      }}
    >
      <h3>Add To Meal Plan</h3>
      <input
        value={date || ""}
        required
        onChange={(e) => setDate(e.target.value)}
        type="date"
      />
      <select
        required
        value={mealType}
        name="mealType"
        id="mealType"
        onChange={(e) => setMealType(e.target.value)}
      >
        <option disabled hidden value="">
          Select Meal
        </option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>
      <Button
        text="Add to Plan"
        className={`${styles["submit"]} btn-primary `}
        type="submit"
      />
    </form>
  );
}

export default MealPicker;
