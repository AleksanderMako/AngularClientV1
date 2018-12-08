import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from '../session-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private session: SessionService, private router: Router) { }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  canAccessElement() {

    const shouldAccessRole = this.session.getSession('currentTypeOfUser');

    if (shouldAccessRole === 'simple') {
      return false;
    } else {
      return true;
    }
  }
}
