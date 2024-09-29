import { IMember } from './member.interface';

export interface IRoster {
  id: number;
  teamdId: number;
  member: IMember;
  role: 'player' | 'coach' | 'both';
  position?: string;
}
