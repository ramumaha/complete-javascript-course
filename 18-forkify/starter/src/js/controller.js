import * as model from './view/model.js';
import recipeView  from './view/recipeview.js';
import resultsView  from './view/resultsView.js';
import PaginationView  from './view/paginationView.js';


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
const init=function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}();
