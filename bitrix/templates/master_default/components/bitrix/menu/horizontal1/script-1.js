RS.computeMainMenu = function() {
  var $menu = $('.js-menu');
  var $nav = $menu.children('.js-menu__nav')
  var $menuMore = $('.js-menu__more-items');
  var menuWidth = $menu.width();
  var busyWidth = 0;
  var $item, $hideItems, lastIndex;

  console.log(menuWidth)

  $menuMore.children().remove();
  $nav.find('> li:hidden').show();
  $('.js-menu__more').hide();

  if (!RS.Application().inBreakpoint('sm')) {
    return false;
  }

  $menu.find('> .js-menu__nav > li:not(.js-menu__more)').each(function(index) {
    var $item = $(this);

    if (busyWidth + 110 > menuWidth) {
      lastIndex = index - 2;
      return false;
    } else if (busyWidth + $item.outerWidth() > menuWidth) {
      lastIndex = index - 1;
      return false;
    }

    busyWidth += $item.outerWidth();
  });

  if (lastIndex) {
    $hideItems = $nav.find('> li:gt(' + (lastIndex) + ')');

    $hideItems.hide();
    $('.js-menu__more').show();

    $hideItems.each(function(index) {
      if (!$(this).hasClass('js-menu__more')) {
        $menuMore.append(
          $('<li>').append($(this).find('> a').clone())
        );
      }
    });
  }

  if (!$menu.hasClass()) {
    $menu.addClass('is-compute');
  }
}

RS.Application().ready(function() {
  RS.computeMainMenu();
  $(window).resize(BX.debounce(RS.computeMainMenu, 250));

  /* Main menu hover */
  var $menu = $('.js-menu');

  var activate = function(row) {
    if (RS.Application().inBreakpoint('sm')) {
      var $row = $(row),
        $subrow;

      if ($row.hasClass('dropdown')) {
        $subrow = $row.find('.dropdown-menu:eq(0)');
        $row.css('visibility', 'hidden').addClass('open');

        if (RS.Application().getWidth() > $subrow.offset().left + $subrow.outerWidth()) {
          $row.css('visibility', 'visible');
        } else {
          $row.removeClass('open').css('visibility', 'visible');
        }
      } else {
        $row.addClass('open');
      }

      if ($row.hasClass('is-full-menu')) {
        var $fullItems = $row.find('.b-horizontal-menu__full-items:eq(0)');

        if ($row.closest('.js-menu').width() - $row.offset().left < $row.closest('.js-menu').width() / 2) {
          $fullItems.addClass('is-right');
        } else if ($fullItems.hasClass('is-right')) {
          $fullItems.removeClass('is-right');
        }
      }
    }
  }

  var deactivate = function(row) {
    if (RS.Application().inBreakpoint('sm')) {
      var $row = $(row);

      $row.removeClass('open');
      $row.find('.open').removeClass('open');
    }
  }

  var normalItemsSelector = '.js-menu__nav > .dropdown > a,.js-menu__more-btn';

  if ($menu.data('type') == 'AIM') {
    $menu.find('.dropdown-menu').each(function() {
      if ($(this).closest('.is-full-menu').length == 0) {
        $(this).menuAim({
          activate: activate,
          deactivate: deactivate,
          exitMenu: function(menu) {
            return true;
          }
        });
      }

    });
  } else {
    normalItemsSelector = 'a';
  }

  $menu.find(normalItemsSelector).on('mouseover', function() {
    var row = this.parentNode;

    activate(this.parentNode);

    $(row).one('mouseleave', function() {
      deactivate(row);
    });
  }).on('click', function(event) {
    if (RS.Application().inBreakpoint('sm')) {
      event.stopPropagation();
    }
  });

  $menu.find('.js-menu__plus').on('click', function(event) {
    event.preventDefault();
    $(this).closest('li').toggleClass('open');
  });

  $menu.find('a').on('click', function(event) {
    event.stopPropagation();
  });

  $menu.find('.b-horizontal-menu__full-items').on('click', function(event) {
    event.stopPropagation();
  })
});
