import { Component } from '@angular/core';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'home',
  styleUrls: ['./home.style.css'],
  templateUrl: './home.template.html'
})
export class HomeComponent {

  public user: string;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  public openUserPage(user: string) {
    this.router.navigate(['user', user]);
  }
}
