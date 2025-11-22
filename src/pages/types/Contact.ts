export type OnlineStatus = 'online' | 'offline' | 'busy';

export interface Contact {
  id: string;
  username: string;
  gmail: string;
  skill: string;
  avatar: string;
  status: OnlineStatus;
  lastSeen?: string;
}