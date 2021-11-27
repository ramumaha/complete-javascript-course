import * as model from './view/model.js';
import recipeView  from './view/recipeview.js';
import resultsView  from './view/resultsView.js';
import PaginationView  from './view/paginationView.js';
import bookmarksView  from './view/bookmarksView.js';


// import icons from '../img/icons.svg' //parcel

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './view/searchView.js';
import paginationView from './view/paginationView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if(module.hot){
  module.hot.accept;
}


const controlRecipes=async function(){
  try{
    const id=window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner();
    //0 update result vie to mark the selected results
    resultsView.render(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);


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
   resultsView.render(model.getSearchResultsPage(3));

   //render the initial pagination
    paginationView.render(model.state.search);

  }catch(err){
    console.log(err);
  }
}

const controlPagination=function(goToPage){
  //render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //render the new pagination
   paginationView.render(model.state.search); 
}

const controlServings=function(newServings){
  //update recipe servings (in state)
  model.updateServings(newServings);


  //update the recipeview
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
  
}
const controlAddBookmark =function(){
  //add or remove bookamark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else{model.deleteBookmark(model.state.recipe.id); }
  //update recipe view
  recipeView.update(model.state.recipe);

  //render bookmark
  bookmarksView.render(model.state.bookmarks);
}

const init=function(){
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  
}();
