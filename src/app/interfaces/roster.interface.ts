export interface IRoster {
  teamdId: number;
  memberId: number;
  role: 'player' | 'coach' | 'both';
  position?: string;
}
