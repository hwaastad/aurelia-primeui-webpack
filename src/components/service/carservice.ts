import {autoinject} from 'aurelia-framework';
import {Car} from '../domain/car';
import {HttpClient,json} from 'aurelia-fetch-client';

@autoinject
export class CarService {

  constructor(private http:HttpClient){}

  getCarsSmall(): Promise<Car[]> {
    console.log('fetching cars...');
    return this.http.fetch('resources/data/cars-small.json')
    .then(response => response.json())
    .then(data =>{
      return <Car[]>data.data;
    });
  }

  getCarsLarge(): Promise<Car[]> {
    return this.http.fetch('resources/data/cars-large.json')
    .then(response => response.json())
    .then(data =>{
      return <Car[]>data.data;
    });
  }
}
