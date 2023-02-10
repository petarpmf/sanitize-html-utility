import { CommonModalService } from 'shared/services/common-modal.service';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UtilService } from 'shared/services/util.service';
import * as sanitizeHtml from 'sanitize-html';
import { sanitizedConstants } from 'shared/constants/sanitized-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ui';
  table = 'collection';
  column:any;
  columns: any = [];
  ids:any;
  responseHtml =[];
  dropdownListForTags = [];
  selectedItemsForTags = [];
  dropdownSettingsForTags = {};
  dropdownListForAttributes = [];
  selectedItemsForAttributes = [];
  dropdownSettingsForAttributes = {};
  deselectedItemsForTags = [];
  deselectedItemsForAttributes = [];
  
  allowedTags = {
    allowedTags: sanitizedConstants.ALLOWED_TAGS,
    allowedAttributes: {'*': this.filterSelectedAttributes(sanitizedConstants.ALLOWED_ATTRIBUTES)}
  };

  constructor(private utilService: UtilService, 
              private changeDetectorRef: ChangeDetectorRef, 
              private commonModalService: CommonModalService){}

  async ngOnInit(){
    //Settings for "Allowed Tags" multiselect dropdown
    this.dropdownSettingsForTags = {
      singleSelection: false,
      idField: 'tags_id',
      textField: 'tags_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0,
      allowSearchFilter: false,
      enableCheckAll: false,
      noDataAvailablePlaceholderText:'NO DATA',
    };

    //Settings for "Allowed Attributes" multiselect dropdown
    this.dropdownSettingsForAttributes = {
      singleSelection: false,
      idField: 'attributes_id',
      textField: 'attributes_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0,
      allowSearchFilter: false,
      enableCheckAll: false,
      noDataAvailablePlaceholderText:'NO DATA',
    };
    this.selectedItemsForTags = sanitizedConstants.ALLOWED_TAGS;  
    this.selectedItemsForAttributes = this.filterSelectedAttributes(sanitizedConstants.ALLOWED_ATTRIBUTES);
    this.changeDetectorRef.markForCheck();
    this.fillColumnDropdowns(this.table);
    let html = await this.loadResponseHtml();
    this.responseHtml = html;
    this.dropdownListForTags = this.fillDropdownListForTags(html);      
    this.dropdownListForAttributes = this.fillDropdownListForAttributes(html);
  }
  ngAfterViewInit(){
    //Hide number of selected tags/attributes text from dropdown
    setTimeout(()=>{
      var multiselectTagArrowEl = document.querySelector('#itemsForTag span.dropdown-multiselect__caret').parentElement;
      multiselectTagArrowEl.children[0].innerHTML="";
      var multiselectTagArrowEl = document.querySelector('#itemsForAttribute span.dropdown-multiselect__caret').parentElement;
      multiselectTagArrowEl.children[0].innerHTML="";
     }, 2000);
  }
  //Get all attributes from HTML
  public fillDropdownListForAttributes(html){
    let consolidatedТext = [];
    //HTML attributes
    html.forEach(element => {
      //Get all attributes from HTML.
      let arrayOfAttributes = element.originalText.match(/([a-z-]{1,})="/g);
      if(!!arrayOfAttributes){
        arrayOfAttributes.forEach(attribute => {
          //Remove = sign from attribute
          let replacedAttr = attribute.replace('="','').trim();
          //Check if attribute exist in array
          if(!(consolidatedТext.indexOf(replacedAttr) > -1)){
            consolidatedТext.push(replacedAttr);
          }
        });
      } 
    });
    return consolidatedТext;
  }
  //Get all tags from HTML
  public fillDropdownListForTags(html){
    let consolidatedТext = [];
    //HTML tags
    html.forEach(element => {
      //Get all tags from HTML.
      let arrayOfTags = element.originalText.match(/\<(\w{0,})\s|<(\w{0,})>/g);
      if(!!arrayOfTags){
        arrayOfTags.forEach(attribute => {
          //Remove < and > sign from tags
          let replacedAttr = attribute.replace('<','').replace('>','').trim();
          //Check if tags exist in array
          if(!(consolidatedТext.indexOf(replacedAttr) > -1)){
            consolidatedТext.push(replacedAttr);
          }
        });
      }
    });
    return consolidatedТext;
  }
  //Execute this function when Tag is selected
  async onTagSelect(item: any) {
    this.allowedTags = { allowedTags: this.selectedItemsForTags, allowedAttributes: {'*': this.selectedItemsForAttributes}}
    let html = await this.loadResponseHtml();
    this.responseHtml = html;
    this.changeDetectorRef.markForCheck();
  }
  //Execute this function when Tag is deselected
  async onTagDeSelect(items: any) {
    this.allowedTags = { allowedTags: this.selectedItemsForTags, allowedAttributes: {'*': this.selectedItemsForAttributes}}
    let html = await this.loadResponseHtml();
    this.responseHtml = html;
    this.changeDetectorRef.markForCheck();
  }
  //Execute this function when Attribute is selected
  async onAttributeSelect(item: any) {
    this.allowedTags = { allowedTags: this.selectedItemsForTags, allowedAttributes: {'*': this.selectedItemsForAttributes}}
    let html = await this.loadResponseHtml();
    this.responseHtml = html;
    this.changeDetectorRef.markForCheck();
  }
  //Execute this function when Attribute is deselected
  async onAttributeDeSelect(items: any) {
    this.allowedTags = { allowedTags: this.selectedItemsForTags, allowedAttributes: {'*': this.selectedItemsForAttributes}}
    let html = await this.loadResponseHtml();
    this.responseHtml = html;
    this.changeDetectorRef.markForCheck();
  }
  //Fill Column Dropdown when column Table is selected
  public fillColumnDropdowns(table){
    switch(table){
      case 'collection':
        this.column = 'description';
        this.columns = sanitizedConstants.COLLECTION_COLUMNS;
        break;
      case 'collection_entity':
        this.column = 'context';
        this.columns = sanitizedConstants.COLLECTION_ENTITY_COLUMNS;
        break;
      case 'other_entity':
        this.column = 'description';
        this.columns = sanitizedConstants.OTHER_ENTITY_COLUMNS;
        break;
      default:
        break
    }
  }
  //Execute this function when Table dropdown is selected
  async onChangeTable(value){
    this.fillColumnDropdowns(this.table);
    let html = await this.loadResponseHtml();
    this.responseHtml = html;
    this.dropdownListForTags = this.fillDropdownListForTags(html);
    this.selectedItemsForTags = sanitizedConstants.ALLOWED_TAGS;  
    this.dropdownListForAttributes = this.fillDropdownListForAttributes(html);
    this.selectedItemsForAttributes = this.filterSelectedAttributes(sanitizedConstants.ALLOWED_ATTRIBUTES);
  }
  //Execute this function when Column dropdown is selected
  async onChangeColumn(value){
    let html = await this.loadResponseHtml();
    this.responseHtml = html;
    this.dropdownListForTags = this.fillDropdownListForTags(html);
    this.selectedItemsForTags = sanitizedConstants.ALLOWED_TAGS;     
    this.dropdownListForAttributes = this.fillDropdownListForAttributes(html);
    this.selectedItemsForAttributes = this.filterSelectedAttributes(sanitizedConstants.ALLOWED_ATTRIBUTES);
  }
  //Execute this function when Ids input is selected
  async onChangeIds(value){
    let html = await this.loadResponseHtml();
    this.responseHtml = html;
    this.dropdownListForTags = this.fillDropdownListForTags(html);
    this.selectedItemsForTags = sanitizedConstants.ALLOWED_TAGS;     
    this.dropdownListForAttributes = this.fillDropdownListForAttributes(html);
    this.selectedItemsForAttributes = this.filterSelectedAttributes(sanitizedConstants.ALLOWED_ATTRIBUTES);
  }
  //Sanitize Html function
  private sanitizeHtml(dirty){
    const clean = sanitizeHtml(dirty, this.allowedTags);
    return clean;
  }

  //Execute this function for one row.
  public async sanitizeRow(id){
    if (!id) {
      const message = 'You id is not defined.';
      const actions = [{
        text: 'OK', onAction: () => {
          return true;
        }
      }];
       this.commonModalService.openValidationMessageDialog(CommonModalService.WARNING_MSG_TITLE, message, actions);
       return;
    }else{
      const message = 'Are you sure that you want to sanitize this row with id '+id +'?';
      const actions = [{
        text: 'OK', cancelText: 'Cancel', onAction: async() => {
          let params = {
            id: id,
            tableVal: this.table,
            columnVal: this.column,
            selectedItemsForTags: this.selectedItemsForTags,
            selectedItemsForAttributes: this.selectedItemsForAttributes
          };
          const reqObj = this.prepareReqObj(params);
          let response = await this.utilService.LKWServiceCall('/sanitize-html', 'PUT', reqObj);
          if(response.status = 204){
            this.commonModalService.openValidationMessageDialog(CommonModalService.INFO_MSG_TITLE, response.message, [{text: 'OK', onAction: async() => {
              location.reload();
            }}]);
          }else{
            this.commonModalService.openValidationMessageDialog(CommonModalService.ERROR_MSG_TITLE, response.message, [{text: 'OK', onAction: async() => {
              location.reload();
            }}]);
          }
          return true;
        }
      }];
       this.commonModalService.openValidationMessageDialog(CommonModalService.WARNING_MSG_TITLE, message, actions);
       return;
    }
  }
  //Execute this function for all rows.
  public sanitizeEntireTable(){
    const message = 'Are you sure that you want to sanitize Entire Table?';
    const actions = [{
      text: 'OK', cancelText: 'Cancel', onAction: async() => {
        let params = {
          tableVal: this.table,
          columnVal: this.column,
          idsVal: this.ids,
          selectedItemsForTags: this.selectedItemsForTags,
          selectedItemsForAttributes: this.selectedItemsForAttributes
        };
        const reqObj = this.prepareReqObj(params);
        let response = await this.utilService.LKWServiceCall('/sanitize-entire-table-html', 'PUT', reqObj);
        if(response.status = 204){
          this.commonModalService.openValidationMessageDialog(CommonModalService.INFO_MSG_TITLE, response.message, [{text: 'OK', onAction: async() => {
            location.reload();
          }}]);
        }else{
          this.commonModalService.openValidationMessageDialog(CommonModalService.ERROR_MSG_TITLE, response.message, [{text: 'OK', onAction: async() => {
            location.reload();
          }}]);
        }
        
        return true;
      }
    }];
     this.commonModalService.openValidationMessageDialog(CommonModalService.WARNING_MSG_TITLE, message, actions);
     return;
  }
  //Prepare request params object
  private prepareReqObj(params) {    
    const reqObj = JSON.parse(JSON.stringify(params));
    return reqObj;
  }
  //Load HTML from DB
  private async loadResponseHtml(){
    this.responseHtml = null;
    let params = {
      tableVal: this.table,
      columnVal: this.column,
      idsVal: this.ids
    };
    let html = await this.utilService.LKWServiceCall('/preview-html?' + UtilService.convertObjectToQueryString(params));
    return html.map(p =>   
        p.text = { ...p, text: this.sanitizeHtml(p.text), originalText: p.text, isEqual: this.sanitizeHtml(p.text).localeCompare( p.text) }
    );
  }

  private filterSelectedAttributes(attributes){
    return attributes.filter(attribute => sanitizedConstants.UNSELECTED_DEFAULT_ATTRIBUTES.indexOf(attribute) == -1)
  }
}