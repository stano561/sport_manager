import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTeamSearchComponent } from './member-team-search.component';

describe('MemberTeamSearchComponent', () => {
  let component: MemberTeamSearchComponent;
  let fixture: ComponentFixture<MemberTeamSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberTeamSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberTeamSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
