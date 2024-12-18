import { render } from "../framework/render.js";
import Statistics from "../view/statistics-component.js";
import TrainingForm from "../view/training-form-component.js";
import FilterBar from "../view/filter-bar-component.js";
import TrainingList from "../view/training-list-component.js";
import TrainingItem from "../view/training-item-component.js";
import Container from "../view/container-component.js";
import {workouts} from '../mock/mock.js';


export default class TrainingPresenter {
    constructor(container) {
        this.container = container;
        this.trainings = [...workouts];
        this.filteredTrainings = [...this.trainings];
    }

    init() {
        this.statisticsComponent = new Statistics();
        this.formComponent = new TrainingForm();
        this.filterComponent = new FilterBar();
        this.trainingListComponent = new TrainingList(this.filteredTrainings, this.handleDeleteWorkout.bind(this));
        this.children = [this.statisticsComponent, this.formComponent, this.filterComponent, this.trainingListComponent];
        this.containerComponent = new Container(this.children);
        render(this.containerComponent, this.container);
        this.setFormSubmitHandler();
        this.setFilterChangeHandler();
        this.renderWorkouts();
        this.updateTotalWorkouts();
    }

    renderWorkouts() {
        const container = this.trainingListComponent.getElement().querySelector('#workouts-container')
        container.innerHTML = '';

        this.filteredTrainings.forEach((training, index) => {
            const trainingItem = new TrainingItem(training, index, this.handleDeleteWorkout.bind(this));
            trainingItem.setDeleteHandler(this.handleDeleteWorkout.bind(this));
            render(trainingItem, container);
        });
    }

    updateTotalWorkouts() {
        this.statisticsComponent.update(this.filteredTrainings.length);
    }
    setFormSubmitHandler() {
        this.formComponent.setSubmitHandler( (evt) => {
            evt.preventDefault();
             const values = this.formComponent.getValues();
            if (values.sport && values.duration && values.intensity && values.date) {
                this.trainings.push(values);
                this.filteredTrainings = [...this.trainings];
                this.renderWorkouts();
                this.updateTotalWorkouts();
                this.formComponent.reset();
            }
        });
    }
     handleDeleteWorkout (e) {
      const index = e.target.dataset.index;
        this.trainings.splice(index, 1);
          this.filteredTrainings = [...this.trainings];
        this.renderWorkouts()
       this.updateTotalWorkouts()
    }

    setFilterChangeHandler() {
          this.filterComponent.setFilterHandler(() => {
              let filteredTrainings = [...this.trainings];
               const values = this.filterComponent.getFilterValues();
                if (values.sport ) {
                   filteredTrainings = filteredTrainings.filter(
                        (training) => training.sport === values.sport
                    );
                }

                if (values.date) {
                    filteredTrainings = filteredTrainings.filter(
                        (training) => training.date === values.date
                    );
                }
                this.filteredTrainings = filteredTrainings;
                this.renderWorkouts();
                this.updateTotalWorkouts()
          });
    }
}
