import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { WidgetData } from '../models/widget-data.model';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'optimo-development-carousel',
  standalone: true,
  imports: [TileComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  readonly data = input.required<WidgetData[]>();

  readonly FIRST_ITEM_IDX = 0;

  readonly currentSlide = signal<number>(0);

  onPreviousClick(): void {
    const previous = this.currentSlide() - 1;
    this.setCurrentSlide(
      previous < this.FIRST_ITEM_IDX ? this.data().length - 1 : previous
    );
  }

  onNextClick(): void {
    const next = this.currentSlide() + 1;
    this.setCurrentSlide(
      next === this.data().length ? this.FIRST_ITEM_IDX : next
    );
  }

  private setCurrentSlide(val: number): void {
    this.currentSlide.set(val);
  }
}
