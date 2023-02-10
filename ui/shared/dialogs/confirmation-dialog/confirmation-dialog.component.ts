import { Component, OnInit, Inject } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
    @Inject('data') public data: { title: string, message: string, actionButtons: Array<{ text: string, cancelText: string, onAction: Function }> }) { }

  ngOnInit(): void {
    console.log('1111')
    console.log(this.data)
  }

  executeAction(onAction: Function) {
    if (!!onAction) {
      const result = onAction();
      this.activeModal.close(result);
    } else {
      this.activeModal.dismiss();
    }
  }
}
