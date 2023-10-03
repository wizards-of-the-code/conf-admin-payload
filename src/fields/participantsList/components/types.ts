export type ParticipantEventData = {
  event_id: string | number;
  role: 'participant' | 'organizer' | 'speaker' | 'volunteer';
  is_payed: boolean;
  attended: boolean;
  description: string;
  payment_method: string;
  payment_date: Date;
  sum: string;
};

export type Participant = {
  id: string;
  events: ParticipantEventData[];
  tg: {
    tg_id: number;
    username: string;
    first_name: string;
    last_name: string;
  };
  username: string;
};

export type PaymentMethod = {
  id: string;
  currency: string;
  source: string;
};
