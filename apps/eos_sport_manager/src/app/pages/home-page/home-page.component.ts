import { Component, inject } from '@angular/core';
import { ITeam } from '../../interfaces/team.interface';
import { SimulatedTeamService } from '../../services/simulated-team.service';
import { SubscriptionManager } from '../../shared/subscription-manager';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatListModule, MatButtonModule, RouterModule, MatMenuModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly subManager: SubscriptionManager = new SubscriptionManager();
  teams: ITeam[] = [];
  selectedTeam: ITeam = { id: -1, name: '' };

  constructor(
    private simlatedTeamService: SimulatedTeamService,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.subManager.newSubs = this.simlatedTeamService
      .getTeams()
      .subscribe((teamsResponse) => {
        this.teams = teamsResponse;
      });
  }

  addTeam(): void {
    this.router.navigate(['/add-team']);
  }

  teamDetail(teamId: number): void {
    this.router.navigate(['/team', teamId]);
  }

  setTheme(theme: string): void {
    this.themeService.setTheme(theme);
  }
}
