import { Component } from "@angular/core";
import { ChildrenOutletContexts, RouterOutlet } from "@angular/router";
import { slideInAnimation } from "./animations";
import { SessiontimerService } from "./_services/sessiontimer.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  animations: [slideInAnimation],
})
export class AppComponent {
  title = "my-app";

  constructor(
    private contexts: ChildrenOutletContexts,
    private session: SessiontimerService
  ) {}

  getRouteAnimationData() {
    return this.contexts.getContext("primary")?.route?.snapshot?.data?.[
      "animation"
    ];
  }
}
