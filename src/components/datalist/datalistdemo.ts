import {autoinject} from 'aurelia-framework';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';

@autoinject
export class DataListDemo {

  cars: Car[];

  selectedCar: Car;

  displayDialog: boolean;

  constructor(private carService: CarService){

  }

  activate(){
    return this.carService.getCarsLarge().then(cars => this.cars = cars);
  }

  selectCar(car: Car) {
    this.selectedCar = car;
    this.displayDialog = true;
  }

  onDialogHide() {
    this.selectedCar = null;
  }
}
