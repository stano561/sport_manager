import { Injectable } from '@angular/core';
import { IRoster } from '../interfaces/roster.interface';
import { Observable, of, map, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SimulatedRosterService {
  private rosterData: IRoster[] = [
    {
      teamdId: 1,
      member: { id: 1, name: 'name1' },
      role: 'player',
      position: 'Attack',
    },
    {
      teamdId: 1,
      member: { id: 2, name: 'name2' },
      role: 'player',
      position: 'Defense',
    },
    {
      teamdId: 2,
      member: { id: 3, name: 'name3' },
      role: 'player',
      position: 'Goalkeeper',
    },
    { teamdId: 2, member: { id: 4, name: 'name4' }, role: 'coach' },
    { teamdId: 2, member: { id: 1, name: 'name1' }, role: 'coach' },
  ];

  constructor() {}

  getRosters(): Observable<IRoster[]> {
    return of(this.rosterData);
  }

  getRosterByTeamId(teamId: number): Observable<IRoster[]> {
    const rosterByTeam = this.rosterData.filter(
      (rosterData) => rosterData.teamdId === teamId
    );
    return of(rosterByTeam);
  }

  addRosterData(rosterData: IRoster): Observable<IRoster> {
    this.rosterData.push(rosterData);
    return of(rosterData);
  }

  deleteRosterData(teamdId: number, memberId: number): Observable<boolean> {
    const rosterIndex = this.rosterData.findIndex(
      (rosterData) =>
        rosterData.teamdId === teamdId && rosterData.member.id === memberId
    );

    if (rosterIndex < 0) {
      return of(false);
    } else {
      this.rosterData.slice(rosterIndex, 1);
      return of(true);
    }
  }

  getRosterDataByMemberId(memberId: number): Observable<IRoster[]> {
    const memberRosterData = this.rosterData.filter(
      (rosterData) => rosterData.member.id === memberId
    );

    return of(memberRosterData);
  }
}
