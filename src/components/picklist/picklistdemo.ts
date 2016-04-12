import {autoinject} from 'aurelia-framework';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';

@autoinject
export class PickListDemo {
  sourceCars: Car[];

  targetCars: Car[];

  constructor(private carService: CarService) { }

  activate() {
    this.targetCars = [];
    return this.carService.getCarsSmall().then(cars => this.sourceCars = cars);
  }
}
