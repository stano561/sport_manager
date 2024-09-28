import { Component, inject } from '@angular/core';
import { ITeam } from '../../interfaces/team.interface';
import { SimulatedTeamService } from '../../services/simulated-team.service';
import { SubscriptionManager } from '../../shared/subscription-manager';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatListModule, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly subManager: SubscriptionManager = new SubscriptionManager();
  teams: ITeam[] = [];
  selectedTeam: ITeam = { id: -1, name: '' };

  constructor(
    private simlatedTeamService: SimulatedTeamService,
    private router: Router
  ) {
    this.subManager.newSubs = this.simlatedTeamService
      .getTeams()
      .subscribe((teamsResponse) => {
        this.teams = teamsResponse;
      });
  }

  addTeam(): void {
    this.router.navigate(['/team']);
  }
}
