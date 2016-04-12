import {autoinject,bindable} from 'aurelia-framework';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';

@autoinject
export class DataScrollerInlineDemo {
  cars: Car[];

  selectedCar: Car;

  displayDialog: boolean;

  constructor(private carService: CarService) { }

  activate() {
    return this.carService.getCarsMedium().then(cars => this.cars = cars);
  }

  selectCar(car: Car) {
    this.selectedCar = car;
    this.displayDialog = true;
  }

  onDialogHide() {
    this.selectedCar = null;
  }
}
