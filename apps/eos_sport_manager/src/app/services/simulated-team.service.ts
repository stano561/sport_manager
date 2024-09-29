import { Injectable } from '@angular/core';
import { ITeam } from '../interfaces/team.interface';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SimulatedTeamService {
  private team1: ITeam = { id: 1, name: 'team1' };
  private team2: ITeam = { id: 2, name: 'team2' };

  private teams: ITeam[] = [this.team1, this.team2];

  constructor() {}

  private generateId(): number {
    if (this.teams.length > 0) {
      let max: number = 0;
      for (let i: number = 0; i < this.teams.length; i++) {
        if (max <= this.teams[i].id) {
          max = this.teams[i].id;
        }
      }
      return max + 1;
    } else {
      return 1;
    }
  }

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

  addTeam(teamName: string): Observable<ITeam> {
    const newTeam: ITeam = {
      id: this.generateId(),
      name: teamName,
    };

    this.teams.push(newTeam);
    return of(newTeam);
  }

  updateTeam(teamId: number, name: string): Observable<ITeam | null> {
    const team = this.teams.find((team) => team.id === teamId);

    if (team) {
      team.name = name;
      return of(team);
    } else {
      return of(null);
    }
  }

  deleteTeam(id: number): Observable<boolean> {
    const teamIndex = this.teams.findIndex((team) => team.id === id);

    if (teamIndex < 0) {
      return of(false);
    } else {
      this.teams.splice(teamIndex, 1);
      return of(true);
    }
  }
}
