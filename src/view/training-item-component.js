import Component from '../framework/component.js';
export default class TrainingItem extends Component{
    constructor(){
        super();
    }

    get template(){
         return  `<div class="workout-card">
                <span>${this.training.sport}</span>
                <span>${this.training.duration} мин</span>
                <span>${this.training.intensity}</span>
                <span>${this.training.date}</span>
                <button class="delete-btn" data-index="${this.index}">Удалить</button>
            </div>`;
    }
}