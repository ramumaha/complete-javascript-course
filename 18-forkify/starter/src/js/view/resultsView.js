import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';//parcel
class ResultsView extends View{
    _parentElement=document.querySelector('.results');
    _errorMessage='No recipe found for the query!Please try again ;)'
    _message='';
    _generateMarkup(){
      // console.log(this._data);
      return this._data.map(results=>previewView.render(results,false)).join('');  
  }
}

export default new ResultsView();