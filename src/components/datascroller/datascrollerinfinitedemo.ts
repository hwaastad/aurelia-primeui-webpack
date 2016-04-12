import {autoinject,bindable} from 'aurelia-framework';
import {Car} from '../domain/car';
import {CarService} from '../service/carservice';
import {Message} from '../../feature/prime/api/message';

@autoinject
export class DataScrollerInfiniteDemo {
  cars: Car[];

  msgs: Message[] = [];

  constructor(private carService: CarService) { }

  loadData(event) {
    //initialize
    if(!this.cars) {
      this.carService.getCarsSmall().then(cars => this.cars = cars);
    }
    //in real application, newArray should be loaded from a remote datasource
    else {
      let newArray = this.cars.slice(0);
      for(let i = 0; i < newArray.length; i++) {
        this.cars.push(newArray[i]);
      }
      this.msgs = [];
      this.msgs.push({severity:'info', summary:'Data Loaded', detail:'Between ' + event.first + ' and ' + (event.first + +event.rows)});
    }
  }
}
