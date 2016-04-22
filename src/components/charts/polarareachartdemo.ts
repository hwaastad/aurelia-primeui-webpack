import {Message} from '../../feature/prime/api/message';

export class PolarareachartDemo {
  data: any[];

  msgs: Message[];

  updated: boolean;

  constructor() {
    this.data = [{
      value: 300,
      color:"#F7464A",
      highlight: "#FF5A5E",
      label: "Red"
    },
    {
      value: 50,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: "Green"
    },
    {
      value: 100,
      color: "#FDB45C",
      highlight: "#FFC870",
      label: "Yellow"
    },
    {
      value: 40,
      color: "#949FB1",
      highlight: "#A8B3C5",
      label: "Grey"
    },
    {
      value: 120,
      color: "#4D5360",
      highlight: "#616774",
      label: "Dark Grey"
    }];
  }

  onSegmentClick(event) {
    if(event.segments) {
      this.msgs = [{severity: 'info', summary: 'Segment Selected', 'detail': event.segments[0].label}];
    }
  }
}
