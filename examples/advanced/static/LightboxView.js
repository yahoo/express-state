YUI.add('lightboxView', function(Y, name) {
    var LightboxView = Y.Base.create("lightboxView", Y.View, [], {

        events: {
            '.lightbox-hide': {
                click: "hide"
            }
        },

        template:
            '<img class="pure-u-1 lightbox-image" src="{large}"> '+
            '<div class="lightbox-meta">' +
                '<a class="pure-button lightbox-link" href="{url}">View on Flickr</a>' +
                '<button class="pure-button lightbox-link lightbox-hide">Hide</button>' +
            '</div>',

        initializer: function (config) {
            var model = this.get('model'),
                container = this.get('container');
                // We'll also re-render the view whenever the data of one of the models in
                // the list changes.
                //model.after('*:change', this.render, this);
                container.on('click', this.hide, this);

        },

        show: function () {
            this.get('container').removeClass('hidden');
        },

        hide: function () {
            this.get('container').addClass('hidden');
        },

        render: function () {
            var container = this.get('container'),
                html      = Y.Lang.sub(this.template, this.get('model').toJSON());

            // Render this view's HTML into the container element.
            container.setHTML(html);

            // Append the container element to the DOM if it's not on the page already.
            if (!container.inDoc()) {
              Y.one('body').append(container);
            }

            this.show();
            return this;
        }

    }, {
        ATTRS: {
            container: {
              valueFn: function () {
                return Y.Node.create('<div class="lightbox pure-u"/>');
              }
            }
        }
    });


    Y.LightboxView = LightboxView;

}, '0.0.1', {
    requires: ['node', 'view', 'event-outside']
});
