import View from './View.js';
import icons from 'url:../../img/icons.svg';//parcel
class PaginationView extends View{
    _parentElement=document.querySelector('.pagination');


    addHandlerClick(handler){
      this._parentElement.addEventListener('click',function(e){
        const btn=e.target.closest('.btn--inline');
        if(!btn) return;
        const gotoPage=+btn.dataset.goto;
        handler(gotoPage);
      })
    }
    _generateMarkup(){
        const curr=this._data.page;
        const numPages=Math.ceil(this._data.results.length/this._data.resultsPerPage);
        console.log(numPages);
        //page 1,there are other pages
        if(curr===1 && numPages>1){
                return `
                 <button data-goto="${curr+1}" class="btn--inline pagination__btn--next">
                <span>Page ${curr+1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`;

        }

        
        //last page
        if(curr===numPages && numPages>1){
            return `
            <button data-goto="${curr-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curr-1}</span>
          </button>`
           ;
        }
         
        //someother page
        if(curr<numPages){
            return `
            <button data-goto="${curr-1}"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curr-1}</span>
          </button>
          <button data-goto="${curr+1}"class="btn--inline pagination__btn--next">
          <span>Page ${curr+1}</span>
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>`;
        }
       
        //page 1,no other pages
        return ''
    }
}

export default new PaginationView();