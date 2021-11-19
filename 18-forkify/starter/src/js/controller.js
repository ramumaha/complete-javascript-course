import * as model from './view/model.js';
import recipeView  from './view/recipeview.js';
import resultsView  from './view/resultsView.js';


// import icons from '../img/icons.svg' //parcel

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './view/searchView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes=async function(){
  try{
    const id=window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner();
    //1)loading recipie
    await model.loadRecipe(id);

  //2)rendering recipie
  recipeView.render(model.state.recipe);
  
  }catch(err){
    recipeView.renderError();
    console.error(err);
  }
};
const controlSearchResults=async function(){
  try{
    resultsView.renderSpinner();
    //1 Get search query
    const query=searchView.getQuery();
    if(!query)return;
    //2 load search results
   await model.loadSearchResults(query);
   //3 render result
   console.log(model.state.search.results);

  }catch(err){
    console.log(err);
  }
}

controlSearchResults();
const init=function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}();
