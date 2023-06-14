window.RS = window.RS || {};

RS.B24CRMForms = (function() {
  'use strict';

  return  {
    init: function () {
	  if (!(RS.options || {})['CRM_FORM_SCRIPT']) {
        return;
      }
        
      if (!window['b24form']) {
        window['Bitrix24FormObject'] = 'b24form';
        window['b24form'] = function () {
          arguments[0].ref = RS.options['CRM_FORM_SCRIPT'];
          window['b24form'].forms = window['b24form'].forms || [];
          window['b24form'].forms[0] = arguments[0];

          if (window.Bitrix24FormLoader) {
            Bitrix24FormLoader.init();
          }
        }.bind(this);
      }

      var s = document.createElement('script');
      var r = 1 * new Date();
      var h = document.getElementsByTagName('script')[0];

      s.async = 1;
      s.src = RS.options['CRM_FORM_SCRIPT'] + '?' + r;
      h.parentNode.insertBefore(s, h);

      s.onload = function () {
        if (window.Bitrix24FormLoader) {
          Bitrix24FormLoader.getUniqueLoadId = function (params) {
            var type = params.type;

            switch(type)
            {
              case 'click':
              case 'button':
              case 'link':
                type = 'button';
                break;
            }

            return type + '_' + params.id + '_' + Math.random().toString(36).substring(2);
          }
        }
      }.bind(this)
    }
  }
}());

RS.B24CRMForms.init();
