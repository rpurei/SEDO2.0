export interface IEvent {
  date: Date;
  id: number; //guid
  eventTitle: string; //title
  venue: string; //className
  author: string;
  dateStart: string; //start
  dateEnd: string; //end
  description: string;
  eventType: string;
}
