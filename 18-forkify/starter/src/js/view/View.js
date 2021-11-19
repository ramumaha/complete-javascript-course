import icons from 'url:../../img/icons.svg';//parcel

export default class View{ 
    _data
    render(data){
      this._data=data;
      const markup=this._generateMarkup();
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin',markup);
      
    }
    
    _clear(){
      this._parentElement.innerHTML='';
    }

   renderSpinner=function(){
        const markup=`
        <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
      this._parentElement.innerHTML='';
      this._parentElement.insertAdjacentHTML('afterbegin',markup);
      }
    
      renderError(message = this._errorMessage) {
        const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }


}