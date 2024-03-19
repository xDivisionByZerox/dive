import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  inject,
  numberAttribute,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';

@Component({
  selector: 'app-icon',
  template: '',
  standalone: true,
})
export class IconComponent implements AfterViewInit {
  @Input({ required: true })
  set name(value: string) {
    this.name$.next(value);
  }

  @Input({ transform: numberAttribute })
  set size(value: number) {
    this.size$.next(value);
  }

  private readonly name$ = new BehaviorSubject('');
  private readonly iconElement$ = this.name$.pipe(
    takeUntilDestroyed(),
    switchMap((name) =>
      this.http.get(`/assets/svg/${name}.svg`, { responseType: 'text' })
    )
  );

  private readonly size$ = new BehaviorSubject(48);

  private readonly http = inject(HttpClient);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  ngAfterViewInit(): void {
    combineLatest({
      iconContent: this.iconElement$,
      size: this.size$,
    }).subscribe({
      next: ({ iconContent, size }) => {
        this.elementRef.nativeElement.innerHTML = iconContent;
        const svgElement = this.elementRef.nativeElement.querySelector('svg');
        svgElement?.setAttribute('height', size.toString());
        svgElement?.setAttribute('width', size.toString());
      },
    });
  }
}
