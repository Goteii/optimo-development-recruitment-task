import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    title: 'Open Weather - Widget',
    loadComponent: () =>
      import('./widget/widget.component').then((c) => c.WidgetComponent),
  },
];
