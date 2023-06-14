;
(function(BX, document, window) {
  'use strict';

  if (!window.RS) {
    window.RS = {};
  }

  if (!!window.RS.Basket || !BX) {
    return;
  }

  function Basket() {
    this.ajaxUrl = '/bitrix/components/redsign/lightbasket.basket/ajax.php';
    //this.ajaxUrl = '/local/components/redsign/lightbasket.basket/ajax.php';
    this.inBasketProducts = [];
  }

  Basket.prototype.inbasket = function(ids, isRewrite) {

    isRewrite = isRewrite || false;

    if (ids) {
      ids = $.isArray(ids) ? ids : [ids];

      if (isRewrite) {
        this.inBasketProducts = ids;
      } else {
        this.inBasketProducts = BX.util.array_merge(this.inBasketProducts, ids);
      }
    }

    return this.inBasketProducts;
  };
  
  Basket.prototype.frombasket = function (removeId) {
    this.inBasketProducts.forEach(function (id, index) {
      if (id == removeId) {
        this.inBasketProducts = BX.util.deleteFromArray(this.inBasketProducts, index);
      } 
    }.bind(this));
  }

  Basket.prototype.add = function(productId, quantity) {
    var params = {};

    params.action = 'add2basket';
    params.product_id = productId;
    params.sessid = BX.bitrix_sessid();

    if (quantity) {
      params.quantity = quantity;
    }

    return BX.ajax.post(this.ajaxUrl, params, function(result) {
      result = BX.parseJSON(result);
      if (result) {
        this.inbasket(productId, false);
        BX.onCustomEvent('add2basket.rs_lightbasket');
      }
    }.bind(this));

    return url;
  };

  Basket.prototype.updateQuantity = function(itemId, newQuantity) {
    var params = {};

    params.action = 'update';
    params.id = itemId;
    params.quantity = newQuantity;
    params.sessid = BX.bitrix_sessid();

    return BX.ajax.post(this.ajaxUrl, params, function(result) {
      result = BX.parseJSON(result);

      if(result) {
        BX.onCustomEvent('update.rs_lightbasket', [result.DATA]);
      }
    });
  };
  
  Basket.prototype.delete = function(itemId) {
    var params = {};

    params.action = 'delete';
    params.id = itemId;
    params.sessid = BX.bitrix_sessid();

    return BX.ajax.post(this.ajaxUrl, params, function(result) {
      result = BX.parseJSON(result);

      if(result) {
        this.frombasket(result['DATA']['ID']);
        BX.onCustomEvent('delete.rs_lightbasket', [result.DATA]);
      }
    }.bind(this));
  };

        
  Basket.prototype.clear = function() {
      var params = {};

    params.action = 'clear';
    params.sessid = BX.bitrix_sessid();

    return BX.ajax.post(this.ajaxUrl, params, function(result) {
      result = BX.parseJSON(result);

      if(result) {
        this.inbasket([], true);
        BX.onCustomEvent('clear.rs_lightbasket', [result.DATA]);
      }
    }.bind(this));
  }

  window.Basket = new Basket;

}(BX, document, window));
