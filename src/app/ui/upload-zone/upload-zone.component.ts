import { Component, HostListener } from '@angular/core';
import { Subject, filter, fromEvent, map, scan, take } from 'rxjs';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-upload-zone',
  templateUrl: './upload-zone.component.html',
  styleUrls: ['./upload-zone.component.scss'],
  standalone: true,
  imports: [IconComponent],
})
export class UploadZoneComponent {
  @HostListener('click')
  handleClick() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    fromEvent(input, 'change')
      .pipe(
        take(1),
        map(() => input.files)
      )
      .subscribe((files) => this.filesToAdd$.next(files));

    input.click();
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    // prevent default to browser from handling the drop event
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  handleDrop(event: DragEvent) {
    // prevent default to browser from handling the drop event
    event.preventDefault();

    this.filesToAdd$.next(event.dataTransfer?.files);
  }

  private readonly filesToAdd$ = new Subject<FileList | undefined | null>();

  readonly files$ = this.filesToAdd$.pipe(
    map((fileList) => Array.from(fileList ?? { length: 0 })),
    filter((files) => files.length > 0),
    scan((previous, current) => [...previous, ...current])
  );
}
