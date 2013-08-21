YUI.add('photoView', function(Y, name) {
    var PhotoView = Y.Base.create("photoView", Y.View, [], {

        events: {},

        template: '<img class="pure-u-1" src="{src}"> '+
            '</a>' +
            '<a class="photo-link" href="{url}">View on Flickr</a>',

        initializer: function (config) {
            var model = this.get('model');
                // We'll also re-render the view whenever the data of one of the models in
                // the list changes.
                model.after('*:change', this.render, this);
        },

        render: function () {
            var container = this.get('container'),
                html      = Y.Lang.sub(this.template, this.get('model').toJSON());

            // Render this view's HTML into the container element.
            container.setHTML(html);

            // Append the container element to the DOM if it's not on the page already.
            if (!container.inDoc()) {
              Y.one('#photoList').append(container);
            }

            return this;
        }

    }, {
        ATTRS: {
            container: {
              valueFn: function () {
                return Y.Node.create('<div class="photo pure-u-1-6"/>');
              }
            }
        }
    });


    Y.PhotoView = PhotoView;

}, '0.0.1', {
    requires: ['node', 'view']
});
