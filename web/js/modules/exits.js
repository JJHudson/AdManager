define(function () {

    /**
     * Initialise the exits
     * @param  Array exits A list of all the available exits
     */
     function Exit(options){

        // Setup clicks
        $('body').on('click', '.js-exit', function(){
            var name = this.getAttribute('data-exit');

            if(typeof options[name] === 'function' ){
                $("body").trigger('collapseAd');
                options[name]();
            }
        });

    }

    return Exit;

});