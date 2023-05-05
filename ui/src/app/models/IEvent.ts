export interface IEvent {
  className: string;
  dateEnd: Date;
  guid: string;
  org: string;
  softId?: string;
  dateStart: Date;
  subdiv?: string;
  title?: string;
  type: string;
  author: string;
}

export interface IEventDetails {
  className: {
    type: string;
    guid: string;
    name: string;
  };
  committeeType: {
    type?: string;
    guid?: string;
    name?: string;
  };
  desc: string | undefined;
  duration: number;
  end: string;
  files?: any[];
  importance: string;
  initiator: {
    type: string;
    guid: string;
    name: string;
  };
  leader: {
    type?: string;
    guid?: string;
    name?: string;
  };
  notification: any[];
  org: {
    type: string;
    guid: string;
    name: string;
  };
  participants: Participants[];
  secretary: {
    type?: string;
    guid?: string;
    name?: string;
  };
  softId: string;
  start: string;
  subdiv: {
    type?: string;
    guid?: string;
    name?: string;
  };
  type: {
    type: string;
    guid: string;
    name: string;
  };
  title: string;
  violations?: any[];
}

export interface Participants {
  deputy: {
    type?: string;
    guid?: string;
    name?: string;
  };
  isAbsent: boolean;
  isKnow: string;
  isMust: boolean;
  name: {
    type: string;
    guid: string;
    name: string;
  };
  order: number;
  role: {
    type: string;
    guid: string;
    name: string;
  };
  typePart: string;
  typePartRus: string;
}
