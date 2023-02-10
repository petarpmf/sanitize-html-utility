import { environment } from '../../environments/environment';

interface Script {
  name: string;
  src: string;
}

interface Style {
  name: string;
  href: string;
}

export const WidgetScriptStore: Script[] = [
  { name: 'listbox', src: '//lksprod.dst.ibm.com/wl/v3/js/listbox.js' },
  { name: 'evaluator', src: '//lksprod.dst.ibm.com/wl/v3/js/evaluator.js' },
  { name: 'button', src: '//lksprod.dst.ibm.com/wl/v3/js/button.js' },
  { name: 'serviceJS', src: `${environment.widgetsURL}/modules/service.js` },
  { name: 'admin', src: `${environment.widgetsURL}/modules/crud/widget.js` },
  { name: 'widget', src: `${environment.widgetsURL}/modules/widget.js` },
  { name: 'feedbackWidget', src: `${environment.widgetsURL}/modules/feedback/widget.js` },
  { name: 'entityStatusWidget', src: `${environment.widgetsURL}/modules/entitystatus/widget.js` },
  { name: 'attachmentWidget', src: `${environment.widgetsURL}/modules/attachment/widget.js` },
  { name: 'progressWidget', src: `${environment.widgetsURL}/modules/progress/widget.js` },
  { name: 'entityWidget', src: `${environment.widgetsURL}/modules/entity/widget.js` },
  { name: 'entityAdminWidget', src: `${environment.widgetsURL}/modules/entityadmin/widget.js` },
  { name: 'singleTemplate', src: `${environment.widgetsURL}/modules/templatedetails/widget.js` },

];

export const WidgetStyleStore: Style[] = [
  { name: 'mainWidgetCss', href: `${environment.widgetsURL}/modules/widget.css` },
  { name: 'example', href: `${environment.widgetsURL}/examples/example.css` },
  { name: 'lkw', href: `${environment.widgetsURL}/modules/lkw.css` },
  { name: 'skinCss', href: `${environment.widgetsURL}/modules/skin.css` },
  { name: 'widgetCss', href: `${environment.widgetsURL}/modules/entity/widget.css` },
  { name: 'entityAdminWidgetCss', href: `${environment.widgetsURL}/modules/entityadmin/widget.css` },
  { name: 'attachmentCss', href: `${environment.widgetsURL}/modules/attachment/widget.css` },
  { name: 'entityStatusCss', href: `${environment.widgetsURL}/modules/entitystatus/widget.css` },
  { name: 'entityStatusWrapperCss', href: `${environment.widgetsURL}/modules/entitystatus/wrapper.css` },
  { name: 'feedbackWrapperCss', href: `${environment.widgetsURL}/modules/feedback/lt_wrapper.css` },
  { name: 'feedbackCss', href: `${environment.widgetsURL}/modules/feedback/widget.css` },
  { name: 'progressCss', href: `${environment.widgetsURL}/modules/progress/widget.css` },
  { name: 'listbox', href: `${environment.widgetLibraryURL}/v5/css/listbox-core.css` }
];
