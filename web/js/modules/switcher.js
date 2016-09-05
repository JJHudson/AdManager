/**
* Switcher
*
* Module to allow easy switching between sections.
*
*/
define(['transitions'], function (Transitions) {
    function Switcher(options) {
        this.settings = options || {};
        this.sections = this.settings.sections || {};
        this.duration = this.settings.duration || 0;
        this.transition = this.settings.transition || this.swap;
        this.order = [];

        for (var section in this.sections) {
            this.setupSection(section, this.sections[section]);
        }

        this.updatePreviousNext();

        if (typeof this.currentSection.onShow === 'function') {
            this.currentSection.onShow.apply(this.currentSection, arguments);
        }
    }

    /**
    * Setup a section
    * @param  {object} section The section settings
    */
    Switcher.prototype.setupSection = function (key, section) {
        var _this = this;

        section._key = key;
        section._parent = this.sections;

        // Retrieve the actual element
        section.elem = document.getElementById(section.id);

        section.show = function(direction) {
            _this.showSection(section, direction, this.transition);
        };

        // Set the current section and hide the rest
        if (!this.currentSection) {
            this.currentSection = section;
        } else {
            section.elem.style.display = 'none';
        }

        // Run setup if set
        if (typeof section.onSetup === 'function') {
            section.onSetup.apply(section, arguments);
        }

        this.order.push(key);
    };

    /**
    * Show a section
    * @param  {object} section The section to show
    */
    Switcher.prototype.showSection = function (section, direction) {
        var from = this.currentSection.elem,
            to = section.elem,
            onShow = section.onShow;

            $('body').trigger('showing', to);
        
        var transition = new Transitions({
            'type': this.transition,
            'section': section,
            'from': from,
            'to': to,
            'duration': this.duration,
            'direction': direction,
            'onShow': onShow
        });
        //this.transition.call(section, from, to, this.duration, direction, onShow);
        this.currentSection = section;
        this.updatePreviousNext();
    };


    /**
    * Update the previous and next helpers
    */
    Switcher.prototype.updatePreviousNext = function () {
        var i = this.order.indexOf(this.currentSection._key);

        this.sections.current = this.currentSection;
        this.sections.next = this.getSibling(i);
        this.sections.prev = this.getSibling(i, true);
    };
    
    /**
    * Get the sibling of a section
    * @param  {number} current  The current index
    * @param  {boolen} previous Whether to fetch the previous sibling - defaults to next
    * @return {object}          Returns a section
    */
    Switcher.prototype.getSibling = function (current, previous) {
        var i = previous ? current - 1 : current + 1;

        i = i > this.order.length - 1 ? 0 : i;
        i = i < 0 ? this.order.length - 1 : i;

        return this.sections[this.order[i]];
    };
    
    return Switcher;
});