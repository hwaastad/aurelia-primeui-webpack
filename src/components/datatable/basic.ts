import {autoinject} from 'aurelia-framework';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';

@autoinject
export class BasicDemo {
  cars: Car[];

  cols: any[];

  constructor(private carService: CarService) { }

  attached(){
    this.cols = [
      {field: 'vin', header: 'Vin'},
      {field: 'year', header: 'Year'},
      {field: 'brand', header: 'Brand'},
      {field: 'color', header: 'Color'}
    ];
  }

  activate() {
    return this.carService.getCarsSmall().then(cars => this.cars = cars);
  }
}
