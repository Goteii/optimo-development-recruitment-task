import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { WidgetService } from './widget.service';
import { WidgetData } from './models/widget-data.model';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
  selector: 'optimo-development-widget',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent implements OnInit {
  readonly #widget = inject(WidgetService);

  readonly initData = input.required<WidgetData[]>();
  readonly data = this.#widget.widgetData;

  readonly currentItemIdx = signal<number>(0);

  ngOnInit(): void {
    this.#widget.getWidgetDataInSequence();
  }
}
