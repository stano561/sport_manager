import { Injectable } from '@angular/core';
import { IRoster } from '../interfaces/roster.interface';
import { Observable, of, map, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SimulatedRosterService {
  private rosterData: IRoster[] = [
    {
      id: 1,
      teamdId: 1,
      member: { id: 1, name: 'name1' },
      role: 'player',
      position: 'Attack',
    },
    {
      id: 2,
      teamdId: 1,
      member: { id: 2, name: 'name2' },
      role: 'player',
      position: 'Defense',
    },
    {
      id: 3,
      teamdId: 2,
      member: { id: 3, name: 'name3' },
      role: 'player',
      position: 'Goalkeeper',
    },
    { id: 4, teamdId: 2, member: { id: 4, name: 'name4' }, role: 'coach' },
    { id: 5, teamdId: 2, member: { id: 1, name: 'name1' }, role: 'coach' },
  ];

  constructor() {}

  private generateId(): number {
    if (this.rosterData.length > 0) {
      let max: number = 0;
      for (let i: number = 0; i < this.rosterData.length; i++) {
        if (max <= this.rosterData[i].id) {
          max = this.rosterData[i].id;
        }
      }
      return max + 1;
    } else {
      return 1;
    }
  }

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
    rosterData.id = this.generateId();
    this.rosterData.push(rosterData);
    return of(rosterData);
  }

  updateRosterData(
    id: number,
    updatedRosterData: IRoster
  ): Observable<boolean> {
    // ak supiska neexistuje tak findIndex vrati -1 preto test podmienky
    const indexRosterData = this.rosterData.findIndex(
      (roster) => roster.id === id
    );

    if (indexRosterData !== -1) {
      this.rosterData[indexRosterData] = { ...updatedRosterData, id };
      return of(true);
    } else {
      return of(false);
    }
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
