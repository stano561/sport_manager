import { Injectable } from '@angular/core';
import { ITeam } from '../interfaces/team.interface';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SimulatedTeamService {
  private team1: ITeam = {
    id: 1,
    name: 'team1',
    members: [
      { name: 'name1', age: 18, role: 'player' },
      { name: 'name2', age: 18, role: 'player' },
      { name: 'name3', age: 18, role: 'coach' },
    ],
  };

  private team2: ITeam = {
    id: 2,
    name: 'team2',
    members: [
      { name: 'name4', age: 18, role: 'player' },
      { name: 'name5', age: 18, role: 'player' },
      { name: 'name6', age: 18, role: 'both' },
    ],
  };

  private teams: ITeam[] = [this.team1, this.team2];

  constructor() {}

  getTeams(): Observable<ITeam[]> {
    return of(this.teams);
  }

  getTeamById(id: number): Observable<ITeam | null> {
    return of(this.teams).pipe(
      map((teams: ITeam[]): ITeam | null => {
        const teamSearchResult = teams.find((team) => team.id === id);

        if (teamSearchResult === undefined) return null;
        else return teamSearchResult;
      })
    );
  }

  addTeam(team: ITeam): Observable<string> {
    this.teams.push(team);
    return of('success');
  }
}
