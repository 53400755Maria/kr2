import Component from '../framework/component.js';
export default class Statistics extends Component{
    constructor(){
        super();
    }

    get template(){
         return  ` <div class="statistics">
            <h2>Статистика</h2>
            <div class="stats-block">
                <p>Всего тренировок: <span id="total-workouts">${this.count}</span></p>
              
            </div>
        </div>`;
    }
}