import { Injectable } from '@angular/core';
import { IMember } from '../interfaces/member.interface';
import { Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SimulatedMemberService {
  private members: IMember[] = [
    { id: 1, name: 'name1' },
    { id: 2, name: 'name2' },
    { id: 3, name: 'name3' },
  ];

  constructor() {}

  getMembers(): Observable<IMember[]> {
    return of(this.members);
  }

  getMemberById(id: number): Observable<IMember | null> {
    return of(this.members).pipe(
      map((members: IMember[]): IMember | null => {
        const memberSearchResult = members.find((member) => member.id === id);

        if (memberSearchResult === undefined) return null;
        else return memberSearchResult;
      })
    );
  }
}
