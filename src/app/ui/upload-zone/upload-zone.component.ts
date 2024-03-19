import { AsyncPipe, NgFor } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Subject, filter, fromEvent, map, merge, scan, take } from 'rxjs';
import { IconComponent } from '../icon/icon.component';

type FilePreview = {
  readonly name: string;
  readonly url: string;
  readonly original: File;
};

function filePreviewFromFile(file: File): FilePreview {
  return {
    name: file.name,
    url: URL.createObjectURL(file),
    original: file,
  };
}

function filePreviewsFromFileList(
  list: FileList | null | undefined
): FilePreview[] {
  return Array.from(list ?? []).map(filePreviewFromFile);
}

type FileAction = {
  action: 'add' | 'remove';
  files: FilePreview[];
};

@Component({
  selector: 'app-upload-zone',
  templateUrl: './upload-zone.component.html',
  styleUrls: ['./upload-zone.component.scss'],
  standalone: true,
  imports: [IconComponent, NgFor, AsyncPipe],
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
        map(() => input.files),
        map(filePreviewsFromFileList)
      )
      .subscribe((files) => this.filesToAdd$.next(files));

    input.click();
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    // prevent default to browser from handling the drop event
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  @HostListener('drop', ['$event'])
  handleDrop(event: DragEvent) {
    // prevent default to browser from handling the drop event
    event.preventDefault();
    event.stopImmediatePropagation();

    const files = filePreviewsFromFileList(event.dataTransfer?.files);
    this.filesToAdd$.next(files);
  }

  private readonly filesToAdd$ = new Subject<FilePreview[]>();
  private readonly filesToRemove$ = new Subject<FilePreview[]>();
  private readonly actions$ = merge<FileAction[]>(
    this.filesToAdd$.pipe(map((files) => ({ action: 'add', files }))),
    this.filesToRemove$.pipe(map((files) => ({ action: 'remove', files })))
  );

  readonly files$ = this.actions$.pipe(
    filter(({ files }) => files.length > 0),
    scan((previous: FileAction, current: FileAction): FileAction => {
      if (current.action === 'add') {
        return {
          action: current.action,
          files: [...previous.files, ...current.files],
        };
      } else if (current.action === 'remove') {
        return {
          action: current.action,
          files: previous.files.filter((currentFile) =>
            current.files.some(
              (fileToRemove) => fileToRemove.url !== currentFile.url
            )
          ),
        };
      } else {
        console.warn(`Unknown action "${current.action}" was called.`);
        return previous;
      }
    }),
    map(({ files }) => files)
  );

  removeFile(file: FilePreview, event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    this.filesToRemove$.next([file]);
  }
}
