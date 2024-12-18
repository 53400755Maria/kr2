import Component from '../framework/component.js';
import TrainingItem from './training-item-component.js';

export default class TrainingList extends Component {
  constructor(trainings, onDelete) {
    super();
    this.trainings = trainings;
    this.onDelete = onDelete;
  }

  get template() {
    return `<div id="workouts-container"></div>`;
  }

  render() {
    super.render();
      this.trainings.forEach((training, index) => {
      const trainingItem = new TrainingItem(training, index, this.onDelete);
      trainingItem.setDeleteHandler(this._callback.deleteClick)
      this.element.querySelector('#workouts-container').append(trainingItem.getElement());
    });
     return this.element
  }
    setDeleteHandler (cb){
    this._callback.deleteClick = cb;
    }
    update(trainings) {
    this.trainings = trainings;
    this.element.querySelector('#workouts-container').innerHTML = '';
    this.render();
  }
}