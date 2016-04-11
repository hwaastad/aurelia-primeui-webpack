import {autoinject} from 'aurelia-framework';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';

@autoinject
export class OrderListDemo {
  cars: Car[];

  constructor(private carService: CarService) { }

  activate() {
    return this.carService.getCarsSmall().then(cars => this.cars = cars);
  }
}
