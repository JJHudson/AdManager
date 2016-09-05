requirejs.config({
    baseUrl: 'js/modules/',
    paths: {
        app: ''
    }
});

requirejs(['switcher', 'doubleclick', 'exits', 'politeload', 'custom'], function (Switcher, Doubleclick, Exits, PoliteLoad, Custom) {

    var mainSwitcher = new Switcher({
        duration: 1000,
        transition: 'swap',
        sections : {
            loading: {
                id: 'loading-section'
            },
            content: {
                id: 'content-section'
            }
        }
    });

    var doubleclick = new Doubleclick( function(){

        mainSwitcher.sections.content.show();

    });

    var exits = new Exits({
        exit: function(){ Enabler.exit('Exit - Exit', ""); }
    });

    var politeload = new PoliteLoad();


    var custom = new Custom();

});