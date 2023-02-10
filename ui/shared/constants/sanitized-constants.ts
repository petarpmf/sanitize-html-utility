export const sanitizedConstants = {
    ALLOWED_TAGS: [
        "address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
        "h5", "h6", "hgroup", "main", "nav", "section", "blockquote", "dd", "div",
        "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre",
        "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
        "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
        "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
        "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "button", 
        "iframe", "img", "form", "input", "label", "ins", "del", "tt", "big", "acronym",
        "applet", "area", "audio", "base", "basefont", "bb", "body", "canvas", "center", 
        "command", "datagrid", "datalist", "details", "dialog", "dir", "embed", "eventsource",
        "fieldset", "font", "frame", "head", "html", "isindex", "keygen", "legend", "link",
        "map", "menu", "meta", "meter", "noframes", "noscript", "object", "optgroup", 
        "option", "output", "param", "progress", "select", "source", "strike",
        "textarea", "title", "track", "video"
        ],
    UNSELECTED_DEFAULT_TAGS: [],
    ALLOWED_ATTRIBUTES: [
        "style", "alt", "src", "class", "href", "target", "width", "height", "data-mce-src",
        "data-mce-href", "data-mce-style", "data-mce-bogus", "data-mce-tabindex",
        "id", "role", "name", "novalidate", "tabindex", "aria-disabled", "for", "rel",
        "border", "cellspacing", "cellpadding", "caption", 
        "title", "align", "center", "bgcolor", "type", "dir", "accept", "accept-charset", "accesskey",
        "action", "allow", "async", "autocapitalize", "autocomplete", "autofocus", "autoplay", "background",
        "buffered", "capture", "challenge", "charset", "checked", "cite", "code", "codebase", "color", "cols",
        "colspan", "content", "contenteditable", "contextmenu", "controls", "coords", "crossorigin", "csp",
        "data", "datetime", "decoding", "default", "defer", "dirname", "disabled", "download", "draggable",
        "enctype", "enterkeyhint", "dropzone", "form", "formaction", "headers", "hidden", "high", "hreflang",
        "http-equiv", "ismap", "keytype", "kind", "label", "lang", "list", "loop", "low", "manifest", "max",
        "maxlength", "media", "method", "min", "multiple", "muted", "onabort", "onafterprint", "onbeforeprint",
        "onbeforeunload", "onblur", "oncanplay", "oncanplaythrough", "onchange", "onclick", "oncontextmenu",
        "oncopy", "oncuechange", "oncut", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave",
        "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror",
        "onfocus", "onhashchange", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload",
        "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmousemove", "onmouseout", 
        "onmouseover", "onmouseup", "onmousewheel", "onoffline", "ononline", "onpagehide", "onpageshow",
        "onpaste", "onpause", "onplay", "onplaying", "onpopstate", "onprogress", "onratechange", "onreset",
        "onresize", "onscroll", "onsearch", "onseeked", "onseeking", "onselect", "onshow", "onstalled", 
        "onstorage", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onunload", "onvolumechange", 
        "onwaiting", "onwheel", "open", "optimum", "pattern", "placeholder", "poster", "preload",
        "readonly", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "scoped",
        "selected", "shape", "size", "sizes", "span", "spellcheck", "srcdoc", "srclang",
        "start", "step", "translate", "usemap", "value", "wrap"
    ],
    UNSELECTED_DEFAULT_ATTRIBUTES: [
        "data-mce-src", "data-mce-href", "data-mce-style", "data-mce-bogus", "data-mce-tabindex", "class"
    ],
    COLLECTION_COLUMNS: [
        {"value" : "description", "name" : "description"}, 
        {"value" : "extended_attributes", "name" : "extended_attributes"}
        ],
    COLLECTION_ENTITY_COLUMNS: [
        {"value" : "context", "name" : "context"}, 
        {"value" : "altDescription", "name" : "altDescription"}, 
        {"value" : "altContent", "name" : "altContent"}
      ],
    OTHER_ENTITY_COLUMNS: [
        {"value" : "description", "name" : "description"}, 
        {"value" : "content", "name" : "content"}
      ]
};