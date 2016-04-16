import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@autoinject
export class EventService {

  constructor(private http:HttpClient){

  }

  getEvents() {
    return this.http.fetch('resources/data/scheduleevents.json')
    .then(response => response.json())
    .then(data =>{
      return data.data;
    });
  }
  
}
