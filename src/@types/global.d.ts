interface DateInfo {
  currentDate: Date;
}

interface Display {
  mode: 'monthly' | 'weekly';
  weekIndex: number;
}

interface EventForm {
  open: boolean;
  startDate: Date;
  endDate: Date;
  mode: 'create' | 'edit';
}

interface Plan {
  timestamp: Date;
  seq: string;
}

interface Event {
  sid: number;
  startTime: number;
  endTime: number;
  title: string;
}

interface CalState {
  dateInfo: DateInfo;
  display: Display;
  eventForm: EventForm;
  events: Event[];
}