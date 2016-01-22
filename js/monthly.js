/*!
    Monthly: jquery plugin for calendar month
*/
(function($) {

    $.fn.Monthly = function(options) {
        var settings = $.extend({
                months: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
                topOffset: 10,
                numberOfYears: 2
            }, options),
            d = new Date(),
            dateNow = d.getFullYear(),

            Monthly = function(el) {
                this._el = $(el);
                this._renderContainer();
                this._bind();
                this._resizeHideElement();
            };

        Monthly.prototype = {
            _renderContainer: function() {
                var options = {
                        position: 'absolute',
                        float: 'left'
                    },
                    total = settings.numberOfYears,
                    _contains = ['<div class="wrapMonth mHide">'],
                    i = 0;

                for (; i < total; i += 1) {
                    _contains.push('<div class="contentMonths"></div>');
                }
                _contains.push('</div>');
                $(this._el).addClass('hasMonthly');

                if ($('.wrapMonth').length === 0) {
                    $('body').append(_contains.join(''));
                    this._renderHeader();
                    this._renderMonths();
                }
            },

            _resizeHideElement: function() {
                $(window).on('resize', $.proxy(this._hide, this));
            },

            _renderHeader: function() {
                var max = settings.numberOfYears,
                    i = 0;

                for (; i < max; i += 1) {
                    markup = ['<div class="mHeader">'];
                    markup.push('<div class="mYear">' + (dateNow + i) + '</div>');
                    markup.push('</div>');
                    $('.contentMonths').eq(i).append(markup.join(''));
                }
            },

            _renderMonths: function() {
                var markup = ['<table border="1" cellspacing="0" cellpadding="0">', '<tr>'];

                $.each(settings.months, function(i, month) {
                    if (i > 0 && i % 4 === 0) {
                        markup.push('</tr>');
                        markup.push('<tr>');
                    }

                    markup.push('<td><button data-value="' + i + '">' + month + '</button></td>');
                });

                markup.push('</tr>');
                markup.push('</table>');
                $('.contentMonths').append(markup.join(''));
            },

            _bind: function() {
                $(document).on('click', $.proxy(this._hide, this));
                $(this._el).on('click', $.proxy(this._show, this));
                $('.contentMonths').find('button').on('click', $.proxy(this._onSelectMonth, this));
            },

            _onSelectMonth: function(e) {
                var _this = $(e.target),
                    dataValue = _this.data('value');
                month = settings.months[dataValue];
                _this.parents('.wrapMonth').find('button').removeClass('monthSelected');

                _this.addClass('monthSelected');
                $(this._el).val(month + ', ' + _this.parents('.contentMonths').find('.mYear').text())
                    .removeClass('bInput');
            },

            _show: function(e, teste) {
                e.preventDefault();
                e.stopPropagation();

                $(this._el).blur();
                $(this._el).addClass('bInput');
                var cardMonth = $('.wrapMonth'),
                    pos = $(this._el).offset(),
                    w = $(window).width(),
                    wCardMonth = cardMonth.width(),
                    wCalc = pos.left + wCardMonth,
                    wDiff = 0;

                if (wCalc > w) {
                    wDiff = wCalc - w;
                }

                cardMonth.removeClass('mHide').css({
                    width: ((cardMonth.find('.contentMonths').eq(0).width()) * 2) + 5,
                    top: (pos.top + this._el.outerHeight()) + (settings.topOffset),
                    left: pos.left - wDiff
                });
            },

            _hide: function(e) {
                $(this._el).removeClass('bInput');
                $('.wrapMonth').addClass('mHide');
            },
        };

        return this.each(function() {
            return new Monthly(this);
        });

    };
})(jQuery);
