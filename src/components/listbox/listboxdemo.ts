import {SelectItem} from '../../feature/prime/api/selectitem';

export class ListBoxDemo {
  cities: SelectItem[];

  selectedCity: string;

  selectedCities: string[];

  cars: SelectItem[];

  selectedCar: string = 'BMW';

  constructor() {
    this.cities = [];
    this.cities.push({label:'New York', value:'New York'});
    this.cities.push({label:'Rome', value:'Rome'});
    this.cities.push({label:'London', value:'London'});
    this.cities.push({label:'Istanbul', value:'Istanbul'});
    this.cities.push({label:'Paris', value:'Paris'});

    this.cars = [];
    this.cars.push({label: 'Audi', value: 'Audi'});
    this.cars.push({label: 'BMW', value: 'BMW'});
    this.cars.push({label: 'Fiat', value: 'Fiat'});
    this.cars.push({label: 'Ford', value: 'Ford'});
    this.cars.push({label: 'Honda', value: 'Honda'});
    this.cars.push({label: 'Jaguar', value: 'Jaguar'});
    this.cars.push({label: 'Mercedes', value: 'Mercedes'});
    this.cars.push({label: 'Renault', value: 'Renault'});
    this.cars.push({label: 'VW', value: 'VW'});
    this.cars.push({label: 'Volvo', value: 'Volvo'});
  }

  updateSelected(event) {
    this.selectedCity=event;
  }

  updateMultiSelected(event) {
    this.selectedCities=[];
    for (var key in event){
      this.selectedCities.push(event[key]);
    }
  }

  updateSelectedCar(event) {
    this.selectedCar=event;
  }
}
