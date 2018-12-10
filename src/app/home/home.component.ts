import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  images = [1, 2, 3].map(() => `https://picsum.photos/2000/300?travel&t=${Math.random()}`);

  ngOnInit() {
  }

}
