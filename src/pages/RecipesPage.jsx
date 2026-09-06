import { recipesData } from "../data/recipesData";
import styles from "./RecipesPage.module.css";
import SearchBar from "../components/ui/SearchBar";
import RecipeList from "../components/recipe/RecipeList";
import FilterBar from "../components/ui/FilterBar";
import { useState } from "react";
import {
  filterCategory,
  filterCookTime,
  filterCuisine,
  filterDifficulty,
  searchFilter,
  sortRecipes,
} from "../utils/helpers";

function RecipesPage() {
  const [searchValue, setSearchValue] = useState("");
  const [searchByValue, setSearchByValue] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [cuisineValue, setCuisineValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [difficultyValue, setDifficultyValue] = useState("");
  const [cookTimeValue, setCookTimeValue] = useState("");

  let searchRecipes = searchFilter(searchByValue, searchValue, recipesData);

  searchRecipes = sortRecipes(sortBy, searchRecipes);

  searchRecipes = filterCuisine(cuisineValue, searchRecipes);

  searchRecipes = filterCategory(categoryValue, searchRecipes);

  searchRecipes = filterDifficulty(difficultyValue, searchRecipes);

  searchRecipes = filterCookTime(cookTimeValue, searchRecipes);
  return (
    <section className={styles["rec-page"]}>
      <div className={styles["rec-banner"]}>
        <h1>Recipes</h1>
        <p>
          Explore the full recipe collection, from everyday meals to special
          occasion feasts, not forgetting those simple snacks
        </p>
      </div>
      <div>
        <div>
          <SearchBar
            searchBy={searchByValue}
            onSearchBy={setSearchByValue}
            onSearchChange={setSearchValue}
            searchValue={searchValue}
            onSortChange={setSortBy}
            sortValue={sortBy}
          />
          <FilterBar
            cuisineValue={cuisineValue}
            onCuisineChange={setCuisineValue}
            categoryValue={categoryValue}
            onCategoryChange={setCategoryValue}
            difficultyValue={difficultyValue}
            onDifficultyChange={setDifficultyValue}
            cookTimeValue={cookTimeValue}
            onCookTimeChange={setCookTimeValue}
          />
        </div>
        <div className={styles["rec-display"]}>
          {searchRecipes && (
            <>
              {(searchValue ||
                cuisineValue ||
                categoryValue ||
                difficultyValue ||
                cookTimeValue) && <p>Found {searchRecipes.length} Results</p>}
              <RecipeList list={searchRecipes} />;
            </>
          )}
          {recipesData.length > 0 && searchRecipes.length === 0 && (
            <p>There is none that matches your search</p>
          )}
          {recipesData.length === 0 && (
            <p>You have not yet picked any favorites</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default RecipesPage;
