import { UserActivities } from './userActivities';

export interface ClientData {
  ip: string | undefined;
  userAgent: string | undefined;
  entryTime: number;
  exitTime?: number;
  userActivities: UserActivities[];
}