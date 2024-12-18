import Component from '../framework/component.js';
export default class TrainingList extends Component{
    constructor(){
        super();
    }

    get template(){
         return  ` <div id="workouts-container"></div>`;
    }
}