window.RS=window.RS||{},RS.DLMenu=function(){var n=function(n,i,t){var s={animationend:["webkitAnimationEnd","oAnimationEnd","MSAnimationEnd","animationend"]};s[i]&&s[i].forEach(function(i){$(n).on(i,t)})},i=function(n,i){var t={animationend:["webkitAnimationEnd","oAnimationEnd","MSAnimationEnd","animationend"]};t[i]&&t[i].forEach(function(i){$(n).off(i)})},t=function(n,i){this.options=$.extend({},t.defaultOptions,i),this.$menu=n,this.$items=this.$menu.find(this.options.selectors.items).not(this.options.selectors.back),this.$back=this.$menu.find(this.options.selectors.back),this.initEvents()};return t.defaultOptions={animationIn:"animate-in",animationOut:"animate-out",selectors:{items:"li",submenu:"ul",isOpen:".is-open",back:".is-back"}},t.prototype.hasSubmenu=function(n){return n.children(this.options.selectors.submenu).length>0},t.prototype.openSubmenu=function(t){var s=t.children(this.options.selectors.submenu).clone().css("opacity",0).insertAfter(this.$menu);setTimeout(function(){s.addClass(this.options.animationIn),this.$menu.addClass(this.options.animationOut),n(this.$menu,"animationend",function(){i(this.$menu,"animationend"),this.$menu.removeClass(this.options.animationOut).addClass("is-view"),t.addClass("is-open").closest(this.options.selectors.submenu).addClass("is-view"),s.remove()}.bind(this))}.bind(this))},t.prototype.back=function(t){var s=t.closest(this.options.selectors.submenu).clone().insertAfter(this.$menu);setTimeout(function(){s.addClass(this.options.animationOut),this.$menu.addClass(this.options.animationIn),n(this.$menu,"animationend",function(){i(this.$menu,"animationend"),this.$menu.removeClass(this.options.animationIn),s.remove()}.bind(this)),t.closest(".is-open").removeClass("is-open"),t.closest(".is-view").removeClass("is-view")}.bind(this))},t.prototype.initEvents=function(){var n=this;n.$items.on("click",function(i){i.stopPropagation();var t=$(this);n.hasSubmenu(t)&&(i.preventDefault(),n.openSubmenu(t))}),n.$back.on("click",function(i){i.stopPropagation(),i.preventDefault(),n.back($(this))})},t}();