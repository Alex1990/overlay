/*!
 * overlay
 * http://alex1990.github.com/overlay
 */
;(function(global, $){

    'use strict';

    var $doc = $(document);

    // Default settings
    var defaults = $.fn.overlayDefaults = {
        backgroundColor: '#000',
        closeDuration: 150,
        closeOnEvent: 'click',
        effect: 'fade',
        name: '',
        opacity: 0.6,
        openDuration: 250,
        parent: document.body,
        zIndex: 100
    };

    // The constructor
    function Overlay(opts) {

        // This check is only for backward compatibility
        if (opts && opts.closeOnClick === false) {
            opts.closeOnEvent = false;
        }

        this.opts = opts = $.extend({}, defaults, opts);

        this.eventPrefix = '';
        this.$el = [];
        this.isClosed = true;

        this.init(opts);
    }

    $.extend(Overlay.prototype, {

        // Initialize an `Overlay` instance
        init: function(opts){
            this.opts = opts = $.extend({}, this.opts, opts);
            this.eventPrefix = opts.name + (opts.name ? '.' : '');

            var $parent = $(opts.parent),
                parentPosition = $(opts.parent).css('position');

            if (parentPosition === 'auto' || parentPosition === 'static') {
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

            if ($parent.get(0) === document.body) {
                this.$el.height(Math.max($parent.height(), $(window).height()));
            }

            this.$el.appendTo($parent);
            this.bindEvents();
        },

        // Bind some useful events
        bindEvents: function(){
            var self = this,
                eventName = self.opts.closeOnEvent;

            eventName && self.$el.on(eventName, function(){
                self.close();
            });

            $doc.on(self.eventPrefix + 'overlay.open', function(){
                self.open();
            });
            $doc.on(self.eventPrefix + 'overlay.close', function(){
                self.close();
            });

        },

        // Open the overlay
        open: function(){
            var self = this;

            $doc.trigger(self.eventPrefix + 'overlay.beforeopen');

            Overlay.openEffects[self.opts.effect].call(self, function(){
                this.isClosed = false;
                $doc.trigger(this.eventPrefix + 'overlay.afteropen');
            });
        },

        // Close the overlay
        close: function(){
            var self = this;

            $doc.trigger(self.eventPrefix + 'overlay.beforeclose');

            Overlay.closeEffects[self.opts.effect].call(self, function(){
                this.isClosed = true;
                $doc.trigger(this.eventPrefix + 'overlay.afterclose');
            });

        },

        // Destroy the overlay
        destroy: function(){
            var self = this,
                eventPrefix = self.eventPrefix;

            self.$el.remove();
            $doc.off(eventPrefix + 'overlay.open');
            $doc.off(eventPrefix + 'overlay.close');
            $doc.trigger(eventPrefix + 'overlay.removed');
        }
    });

    // The animation to be executed when open the overlay
    Overlay.openEffects = {
        none: function(afterCallback){
            this.$el.show();
            afterCallback.call(this);
        },
        fade: function(afterCallback){
            var self = this;
            self.$el.css({
                display: 'block',
                opacity: 0
            }).animate({
                opacity: self.opts.opacity
            }, self.opts.openDuration, function(){
                afterCallback.call(self);
            });
        }
    };

    // The animation to be executed when close the overlay
    Overlay.closeEffects = {
        none: function(afterCallback){
            this.$el.hide();
            afterCallback.call(this);
        },
        fade: function(afterCallback){
            var self = this;
            self.$el.animate({
                opacity: 0
            }, self.opts.closeDuration, function(){
                $(this).hide();
                afterCallback.call(self);
            });
        }
    };

    // Export Overlay into global scope
    global.Overlay = Overlay;

})(window, this.jQuery || this.Zepto);