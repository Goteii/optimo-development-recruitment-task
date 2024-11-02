import { Route } from '@angular/router';
import { WidgetResolver } from 'src/resolvers/widget.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    title: 'Open Weather - Widget',
    loadComponent: () =>
      import('./widget/widget.component').then((c) => c.WidgetComponent),
    resolve: {
      initData: WidgetResolver,
    },
  },
];
