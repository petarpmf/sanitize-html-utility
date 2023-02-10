import { Injectable, Injector } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ConfirmationDialogComponent} from '../dialogs/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CommonModalService {

  public static readonly WARNING_MSG_TITLE = 'Warning';
  public static readonly INFO_MSG_TITLE = 'Information';
  public static readonly ERROR_MSG_TITLE = 'Error';
  private modalRef: NgbModalRef;

  constructor( private router: Router, private nModalService: NgbModal) { }

  public openValidationMessageDialog(title: string, message: string, actionButtons?: Array<{ text: string, onAction?: Function }>) {
    this.modalRef = this.nModalService.open(
      ConfirmationDialogComponent,
      {
        injector: Injector.create({
          providers: [{
            provide: 'data', useValue: {title: title, message: message, actionButtons: actionButtons}
          }]
        })
        , size: 'lg', backdrop: 'static', 
        windowClass: 'add-error-dialog', backdropClass: 'add-error-dialog add-error-backdrop'
      });
  }

  public closeActiveModal(){
    if(this.modalRef != undefined){
      this.modalRef.close()
    }    
  }

  public displayWarningMessageForEditingOEWithOldDataStructure(id) {
    this.nModalService.open(
      ConfirmationDialogComponent,
      {
        injector: Injector.create({
          providers: [{
            provide: 'data', useValue: {
              message: `This is 0 version of assessment and can\'t be edited using new Administrative UI.
                  New Administrative UI support version 1 or higher for Assessments.
                  To edit this Assessment please use older version of Administrative UI. Now you will be redirect to view mode  `,
              actionButtons: [{
                text: 'Ok', onAction: () => {
                  this.router.navigate(['/assessment/view/' + id]);
                  return true;
                }
              }]
            }
          }]
        })
        , backdrop: 'static'
      });
  }
  
}
