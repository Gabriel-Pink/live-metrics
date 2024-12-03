import { UserActivities } from './userActivities';

export interface ClientData {
  ip: string | undefined;
  userAgent: string | undefined;
  entryTime: Date;
  exitTime?: Date;
  userActivities: UserActivities[];
}