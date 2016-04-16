import {autoinject,bindable,customElement} from 'aurelia-framework';
@customElement('p-schedule')
@autoinject
export class ScheduleComponent {
  @bindable events: any[];
  @bindable header: any;
  @bindable style: string;
  @bindable styleClass: string;
  @bindable rtl: boolean;
  @bindable weekends: boolean;
  @bindable hiddenDays: number[];
  @bindable fixedWeekCount: boolean;
  @bindable weekNumbers: boolean;
  @bindable businessHours: any;
  @bindable height: any;
  @bindable contentHeight: any;
  @bindable aspectRatio: number = 1.35;
  @bindable eventLimit: any;
  @bindable defaultDate: any;
  @bindable editable: boolean;
  @bindable eventStartEditable: boolean;
  @bindable eventDurationEditable: boolean;
  @bindable defaultView: string = 'month';
  @bindable allDaySlot: boolean = true;
  @bindable slotDuration: any = '00:30:00';
  @bindable slotLabelInterval: any;
  @bindable snapDuration: any;
  @bindable scrollTime: any = '06:00:00';
  @bindable minTime: any = '00:00:00';
  @bindable maxTime: any = '24:00:00';
  @bindable slotEventOverlap: boolean = true;
  @bindable nowIndicator: boolean;
  @bindable dragRevertDuration: number = 500;
  @bindable dragOpacity: number = .75;
  @bindable dragScroll: boolean = true;
  @bindable eventOverlap: any;
  @bindable eventConstraint: any;
  @bindable locale: any;

  @bindable onDayClick;
  @bindable onEventClick;
  @bindable onEventMouseover;
  @bindable onEventMouseout;
  @bindable onEventDragStart;
  @bindable onEventDragStop;
  @bindable onEventDrop;
  @bindable onEventResizeStart;
  @bindable onEventResizeStop;
  @bindable onEventResize;

  initialized: boolean;

  stopNgOnChangesPropagation: boolean;

  schedule: any;

  constructor(private element: Element) {
    this.initialized = false;
  }

  attached() {
    this.schedule = jQuery((<HTMLElement>this.element).children[0]);
    let options = {
      theme: true,
      header: this.header,
      isRTL: this.rtl,
      weekends: this.weekends,
      hiddenDays: this.hiddenDays,
      fixedWeekCount: this.fixedWeekCount,
      weekNumbers: this.weekNumbers,
      businessHours: this.businessHours,
      height: this.height,
      contentHeight: this.contentHeight,
      aspectRatio: this.aspectRatio,
      eventLimit: this.eventLimit,
      defaultDate: this.defaultDate,
      editable: this.editable,
      eventStartEditable: this.eventStartEditable,
      eventDurationEditable: this.eventDurationEditable,
      defaultView: this.defaultView,
      allDayslot: this.allDaySlot,
      slotDuration: this.slotDuration,
      slotLabelInterval: this.slotLabelInterval,
      snapDuration: this.snapDuration,
      scrollTime: this.scrollTime,
      minTime: this.minTime,
      maxTime: this.maxTime,
      slotEventOverlap: this.slotEventOverlap,
      nowIndicator: this.nowIndicator,
      dragRevertDuration: this.dragRevertDuration,
      dragOpacity: this.dragOpacity,
      dragScroll: this.dragScroll,
      eventOverlap: this.eventOverlap,
      eventConstraint: this.eventConstraint,
      events: (start, end, timezone, callback) => {
        callback(this.events);
      },
      dayClick: (date, jsEvent, view) => {
        if(this.onDayClick){
          this.onDayClick({
            'date': date,
            'jsEvent': jsEvent,
            'view': view
          });
        }
      },
      eventClick: (calEvent, jsEvent, view) => {
        if(this.onEventClick){
          this.onEventClick({
            'calEvent': calEvent,
            'jsEvent': jsEvent,
            'view': view
          });
        }
      },
      eventMouseover: (calEvent, jsEvent, view) => {
        if(this.onEventMouseover){
          this.onEventMouseover({
            'calEvent': calEvent,
            'jsEvent': jsEvent,
            'view': view
          });
        }
      },
      eventMouseout: (calEvent, jsEvent, view) => {
        if(this.onEventMouseout){
          this.onEventMouseout({
            'calEvent': calEvent,
            'jsEvent': jsEvent,
            'view': view
          });
        }
      },
      eventDragStart: (event, jsEvent, ui, view) => {
        this.onEventDragStart({
          'event': event,
          'jsEvent': jsEvent,
          'view': view
        });
      },
      eventDragStop: (event, jsEvent, ui, view) => {
        if(this.onEventDragStop){
          this.onEventDragStop({
            'event': event,
            'jsEvent': jsEvent,
            'view': view
          });
        }
      },
      eventDrop: (event, delta, revertFunc, jsEvent, ui, view) => {
        if(this.onEventDragStop){
          this.onEventDragStop({
            'event': event,
            'delta': delta,
            'revertFunc': revertFunc,
            'jsEvent': jsEvent,
            'view': view
          });
        }
      },
      eventResizeStart: (event, jsEvent, ui, view) => {
        if(this.onEventResizeStart){
          this.onEventResizeStart({
            'event': event,
            'jsEvent': jsEvent,
            'view': view
          });
        }
      },
      eventResizeStop: (event, jsEvent, ui, view) => {
        if(this.onEventResizeStop){
          this.onEventResizeStop({
            'event': event,
            'jsEvent': jsEvent,
            'view': view
          });
        }
      },
      eventResize: (event, delta, revertFunc, jsEvent, ui, view) => {
        if(this.onEventResize){
          this.onEventResize({
            'event': event,
            'delta': delta,
            'revertFunc': revertFunc,
            'jsEvent': jsEvent,
            'view': view
          });
        }
      }
    };

    if(this.locale) {
      for(var prop in this.locale) {
        options[prop] = this.locale[prop];
      }
    }

    this.schedule.fullCalendar(options);
    this.initialized = true;
  }

  propertyChanged(property,newVal,oldVal){
    if(this.initialized){
      this.schedule.fullCalendar('refetchEvents');
    }
  }


  detached() {
    this.schedule.fullCalendar('destroy');
    //jQuery((<HTMLElement>this.element).children[0]).fullCalendar('destroy');
    this.initialized = false;
    this.schedule = null;
  }
}
