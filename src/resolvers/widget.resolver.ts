import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { WidgetData } from 'src/app/widget/models/widget-data.model';
import { WidgetService } from 'src/app/widget/widget.service';

export const WidgetResolver: ResolveFn<WidgetData[]> = () => {
  const widget = inject(WidgetService);
  return widget
    .getWidgetRandomCitiesData()
    .pipe(map((data) => widget.getRequiredData(data.list)));
};
