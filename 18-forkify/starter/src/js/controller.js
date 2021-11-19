import * as model from './view/model.js';
import recipeView  from './view/recipeview.js';


// import icons from '../img/icons.svg' //parcel

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');


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
['hashchange','load'].forEach(ev=>window.addEventListener(ev,controlRecipes));
// window.addEventListener('hashchange',controlRecipes);
// window.addEventListener('load',controlRecipes);
