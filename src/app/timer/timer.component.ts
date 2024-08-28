import { Component } from "@angular/core";

@Component({
  selector: "app-timer",
  standalone: true,
  imports: [],
  templateUrl: "./timer.component.html",
  styleUrl: "./timer.component.css",
})
export class TimerComponent {
  time: number;

  constructor() {
    this.time = 0;
  }

  // Start timer that counts every second
  ngOnInit() {
    setInterval(() => {
      this.time += 1;
    }, 1000);
  }
}
