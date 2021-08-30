import "./App.css";
import Recipe from "./Recipe";
import React, { useEffect, useState } from "react";

const App = () => {
  const APP_ID = "1ad12552";
  const APP_KEY = "901a0176495a11083e99c8dfac9401cf";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(" ");
  const [query, setQuery] = useState("chicken");
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    // console.log(data.hits);
  };
  const updateSearch = (e) => {
    setSearch(e.target.value);
    // console.log(search);
  };
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          placeholder="Enter recipe"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipes) => (
          <Recipe
            key={recipes.recipe.label}
            title={recipes.recipe.label}
            calories={Math.floor(recipes.recipe.calories)}
            image={recipes.recipe.image}
            ingredients={recipes.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
