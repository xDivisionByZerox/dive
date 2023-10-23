import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-icon',
  template: '',
  styleUrls: ['./icon.component.scss'],
  standalone: true,
})
export class IconComponent implements AfterViewInit {
  @Input({ required: true })
  set name(value: string) {
    this.name$.next(value);
  }

  private readonly name$ = new BehaviorSubject('');
  private readonly iconElement$ = this.name$.pipe(
    takeUntilDestroyed(),
    switchMap((name) =>
      this.http.get(`/assets/svg/${name}.svg`, { responseType: 'text' })
    )
  );

  private readonly http = inject(HttpClient);
  private readonly elementRef: ElementRef<Element> = inject(ElementRef);

  ngAfterViewInit(): void {
    this.iconElement$.subscribe({
      next: (svg) => {
        this.elementRef.nativeElement.innerHTML = svg;
      },
    });
  }
}
