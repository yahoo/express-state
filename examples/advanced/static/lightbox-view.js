YUI.add('lightbox-view', function(Y, name) {
    var LightboxView = Y.Base.create("lightbox-view", Y.View, [], {

        events: {
            '.lightbox-hide, .lightbox': {
                click: "hide"
            }
        },

        template: Y.one('#lightbox-template').getHTML(),

        initializer: function (config) {
            this.after('photoChange', this.render, this);
        },

        show: function () {
            this.get('container').removeClass('hidden');
        },

        hide: function () {
            this.get('container').addClass('hidden');
        },

        render: function () {
            var container = this.get('container'),
                compiled  = Y.Handlebars.compile(this.template),
                html      = compiled(this.get('photo').toJSON());

            // Render this view's HTML into the container element.
            container.empty().append(html);

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
                return Y.Node.create('<div class="lightbox"/>');
              }
            }
        }
    });


    Y.LightboxView = LightboxView;

}, '0.0.1', {
    requires: ['node', 'view', 'handlebars']
});
