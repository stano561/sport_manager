import { Component, OnInit } from '@angular/core';
import { ITeam } from '../../interfaces/team.interface';
import { IRoster } from '../../interfaces/roster.interface';
import { IMember } from '../../interfaces/member.interface';
import { SimulatedTeamService } from '../../services/simulated-team.service';
import { SimulatedRosterService } from '../../services/simulated-roster.service';
import { SimulatedMemberService } from '../../services/simulated-member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SubscriptionManager } from '../../shared/subscription-manager';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatButtonModule],
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.scss',
})
export class TeamDetailComponent implements OnInit {
  private readonly subManager: SubscriptionManager = new SubscriptionManager();
  team?: ITeam;
  rosterData: IRoster[] = [];
  members: IMember[] = [];

  constructor(
    private simulatedTeamService: SimulatedTeamService,
    private simulatedRosterService: SimulatedRosterService,
    private simulatedMemberService: SimulatedMemberService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const teamId = Number(this.route.snapshot.params['id']);

    this.subManager.newSubs = forkJoin({
      team: this.simulatedTeamService.getTeamById(teamId),
      roster: this.simulatedRosterService.getRosterByTeamId(teamId),
      members: this.simulatedMemberService.getMembers(),
    }).subscribe(({ team, roster, members }) => {
      this.team = team || undefined;
      this.rosterData = roster;
      this.members = members;
    });
  }

  editTeam(): void {
    this.router.navigate(['/edit-team', this.team?.id]);
  }

  deleteTeam(): void {
    if (confirm('This action is pernament.')) {
      this.subManager.newSubs = this.simulatedTeamService
        .deleteTeam(this.team!.id)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }

  assignMemberToRoster(): void {
    this.router.navigate(['/assign-member', this.team?.id]);
  }

  getMemberNameById(memberId: number): string {
    const member = this.members.find((member) => member.id === memberId);
    if (member) {
      return member.name;
    } else {
      return 'unknown member by provided id';
    }
  }
}
