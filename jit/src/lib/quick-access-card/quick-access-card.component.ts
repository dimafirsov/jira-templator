import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { FileService } from '../../services/file.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'jit-quick-access-card',
  templateUrl: './quick-access-card.component.html',
  styleUrls: ['./quick-access-card.component.scss']
})
export class QuickAccessCardComponent implements OnInit {

    constructor(public storage: StorageService, public file: FileService, private cdRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.storage.current$.pipe(take(2)).subscribe(() => {
            this.cdRef.detectChanges();
        });
    }

}
