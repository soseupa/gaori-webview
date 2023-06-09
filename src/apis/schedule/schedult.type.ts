export type SCHEDULE = {
  id: number;
  latitude: number;
  location: string;
  longitude: number;
  orderIndex?: number;
  title: string;
};

export type SCHEDULE_USER = {
  userId: number;
  nickname: string;
};

export type SCHEDULE_LIST = {
  scheduleDetails: SCHEDULE[];
  scheduleUsers: SCHEDULE_USER[];
};
