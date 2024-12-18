import Component from '../framework/component.js';
export default class HeaderComponent extends Component{
    constructor(){
        super();
    }

    get template(){
         return  ` <div class="container">
                    <h1>Мой Фитнес Трекер</h1>
                </div>`;
    }
}
