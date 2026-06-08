import { Component } from '@angular/core';
import { RouterOutlet, ChildrenOutletContexts } from '@angular/router';
import { routeTransitionAnimation } from './route-animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="route-host" [@routeAnimations]="getRouteAnimationData()">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        min-height: 100vh;
        position: relative;
        overflow: hidden;
      }
      .route-host {
        position: relative;
        width: 100%;
        min-height: 100vh;
      }
    `,
  ],
  animations: [routeTransitionAnimation],
})
export class AppComponent {
  title = 'portfolio-3d';

  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
