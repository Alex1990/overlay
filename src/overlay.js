/*!
 * overlay
 * http://alex1990.github.com/overlay
 */
;(function($){

    'use strict';

    var $win = $(window),
        $doc = $(document);

    // Default settings
    var defaults = $.fn.overlayDefaults = {
        name: '',
        closeOnClick: true,
        parent: document.body,
        effect: 'fade',
        openDuration: 250,
        closeDuration: 150,
        backgroundColor: '#000',
        opacity: 0.6,
        zIndex: 100,
    };

    // The constructor
    function Overlay(opts) {
        this.opts = opts = $.extend({}, defaults, opts);

        this.eventPrefix = '';
        this.$el = [];
        this.isClosed = true;

        this.init(opts);
    }

    // Initialize an `Overlay` instance
    Overlay.prototype.init = function(opts){
        this.opts = opts = $.extend({}, this.opts, opts);

        this.eventPrefix = opts.name + (opts.name ? '.' : '');

        var $parent = $(opts.parent),
            parentPosition = $(opts.parent).css('position');

        if ((parentPosition === 'auto' || parentPosition === 'static') &&
                $parent.get(0) !== document.body) {
            $parent.css('position', 'relative');
        }

        this.$el = $('<div class="overlay' + (opts.name ? ' ' + opts.name + '-overlay' : '') + '"></div>');
        this.$el.css({
            display: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: opts.backgroundColor,
            opacity: opts.opacity,
            zIndex: opts.zIndex
        });
        this.$el.appendTo(opts.parent);

        this.bindEvents();
    };

    // Bind some useful events
    Overlay.prototype.bindEvents = function(){
        var self = this;

        // resize and orientationchange
        $win.on('resize', function(){
            self.$el.css({
                width: $(self.opts.parent).width(),
                height: $(self.opts.parent).height()
            });
        });

        self.opts.closeOnClick && self.$el.on('click', function(){
            self.close();
        });

        $doc.on(this.eventPrefix + 'overlay.open', function(){
            self.open();
        });
        $doc.on(this.eventPrefix + 'overlay.close', function(){
            self.close();
        });

    };

    // Open the overlay
    Overlay.prototype.open = function(){

        $doc.trigger(this.eventPrefix + 'overlay.beforeopen');

        Overlay.openEffects[this.opts.effect].call(this, function(){
            this.isClosed = false;
            $doc.trigger(this.eventPrefix + 'overlay.afteropen');
        });
    };

    // Close the overlay
    Overlay.prototype.close = function(){

        $doc.trigger(this.eventPrefix + 'overlay.beforeclose');

        Overlay.closeEffects[this.opts.effect].call(this, function(){
            this.isClosed = true;
            $doc.trigger(this.eventPrefix + 'overlay.afterclose');
        });

    };

    // Destroy the overlay
    Overlay.prototype.destroy = function(){
        this.$el.remove();
        $doc.off(this.eventPrefix + 'overlay.open');
        $doc.off(this.eventPrefix + 'overlay.close');
        $doc.trigger(this.eventPrefix + 'overlay.removed');
    };

    // The animation to be executed when open the overlay
    Overlay.openEffects = {
        none: function(afterCallback){
            this.$el.show();
            afterCallback.call(this);
        },
        fade: function(afterCallback){
            this.$el.fadeIn(this.opts.openDuration, $.proxy(afterCallback, this));
        }
    };

    // The animation to be executed when close the overlay
    Overlay.closeEffects = {
        none: function(afterCallback){
            this.$el.hide();
            afterCallback.call(this);
        },
        fade: function(afterCallback){
            this.$el.fadeOut(this.opts.closeDuration, $.proxy(afterCallback, this));
        }
    };

    // Export Overlay into global scope
    window.Overlay = Overlay;

})(jQuery || Zepto);