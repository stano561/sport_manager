import { Injectable } from '@angular/core';
import { IRoster } from '../interfaces/roster.interface';
import { Observable, of, map, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SimulatedRosterService {
  private rosterData: IRoster[] = [
    { teamdId: 1, memberId: 1, role: 'player', position: 'Attack' },
    { teamdId: 1, memberId: 2, role: 'player', position: 'Defense' },
    { teamdId: 2, memberId: 3, role: 'player', position: 'Goalkeeper' },
    { teamdId: 2, memberId: 4, role: 'coach' },
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
        rosterData.teamdId === teamdId && rosterData.memberId === memberId
    );

    if (rosterIndex < 0) {
      return of(false);
    } else {
      this.rosterData.slice(rosterIndex, 1);
      return of(true);
    }
  }
}
