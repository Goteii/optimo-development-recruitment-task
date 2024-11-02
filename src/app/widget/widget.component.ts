import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { WidgetService } from './widget.service';
import { TileComponent } from './tile/tile.component';
import { WidgetData } from './models/widget-data.model';

@Component({
  selector: 'optimo-development-widget',
  standalone: true,
  imports: [TileComponent],
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
    console.log('init data', this.initData());
    console.log('data', this.data());
    this.#widget.getWidgetDataInSequence();
  }
}
