import { IMember } from './member.interface';

export interface IRoster {
  teamdId: number;
  member: IMember;
  role: 'player' | 'coach' | 'both';
  position?: string;
}
