import { Component, HostListener } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { fromEvent, take } from 'rxjs';

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

    fromEvent(input, 'change').pipe(take(1)).subscribe(console.log);

    input.click();
  }
}
