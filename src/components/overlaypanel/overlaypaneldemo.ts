import {autoinject} from 'aurelia-framework';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {OverlayPanelComponent} from '../../feature/prime/overlaypanel/overlaypanel';

@autoinject
export class OverlaypanelDemo {
  cars1: Car[];

  cars2: Car[];

  selectedCar: Car;

  constructor(private carService: CarService) { }

  activate() {
  //  this.carService.getCarsSmall().then(cars => this.cars1 = cars);
  //  this.carService.getCarsSmall().then(cars => this.cars2 = cars);
  }

  selectCar(event,car: Car, overlaypanel: OverlayPanelComponent) {
    this.selectedCar = car;
    overlaypanel.toggle(event);
  }
}
