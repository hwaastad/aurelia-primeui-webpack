import {Message} from '../../feature/prime/api/message';

export class DoughnutDemo {

  data1: any[];

  data2: any[];

  msgs: Message[];

  updated: boolean;

  constructor() {
    this.data1 = [{
      value: 300,
      color: '#F7464A',
      highlight: '#FF5A5E',
      label: 'Red'
    },
    {
      value: 50,
      color: '#46BFBD',
      highlight: '#5AD3D1',
      label: 'Green'
    },
    {
      value: 100,
      color: '#FDB45C',
      highlight: '#FFC870',
      label: 'Yellow'
    }];

    this.data2 = [{
      value: 125,
      color: '#2196F3',
      highlight: '#64B5F6',
      label: 'Comedy'
    },
    {
      value: 50,
      color: '#673AB7',
      highlight: '#9575CD',
      label: 'Drama'
    },
    {
      value: 75,
      color: '#00897B',
      highlight: '#26A69A',
      label: 'Action'
    },
    {
      value: 22,
      color: '#FF9800',
      highlight: '#FFB74D',
      label: 'Romance'
    },
    {
      value: 100,
      color: '#FF5722',
      highlight: '#FF8A65',
      label: 'Sci-fi'
    }];
  }

  onSegmentClick(event) {
    if(event.segments) {
      this.msgs = [{severity: 'info', summary: 'Segment Selected', 'detail': event.segments[0].label}];
    }
  }

  removeYellow() {
    this.data1.pop();
    this.updated = true;
  }
}
