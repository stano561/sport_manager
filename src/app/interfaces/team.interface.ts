import { IMember } from './member.interface';

export interface ITeam {
  id: number;
  name: string;
  members: IMember[];
}
