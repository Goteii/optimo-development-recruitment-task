import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WidgetData } from '../models/widget-data.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'optimo-development-tile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent {
  data = input.required<WidgetData>();
}
