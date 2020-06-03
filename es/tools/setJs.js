var _this = this;
var core = {
    insert: function (attr, cb) {
        attr = Object.assign({}, {
            name: 'sdk_' + core.getRandom(),
            src: '',
            type: 'text/javascript'
        }, attr);
        var parent = document.querySelector('#sdk_lib');
        var script = parent.querySelector("[name=" + attr.name + "]");
        if (script) {
            if (typeof cb === 'function') {
                cb.call(_this, script);
            }
        }
        else {
            script = document.createElement('script');
            Object.getOwnPropertyNames(attr).map(function (name) {
                script.setAttribute(name, attr[name]);
            });
            parent.appendChild(script).addEventListener('load', function () {
                if (typeof cb === 'function') {
                    cb.call(_this, script);
                }
            }, false);
        }
    },
    remove: function (name) {
        var parent = document.querySelector('#sdk_lib');
        Array.prototype.slice.call(parent.querySelectorAll("[name=" + name + "]")).map(function (node) {
            parent.removeChild(node);
        });
    },
    getRandom: function (count) {
        if (count === void 0) { count = 8; }
        var str = '';
        for (var i = 0; i < count; i++) {
            str += (Math.random() * 10).toString(36).charAt(parseInt((Math.random() * 5 + 2).toString()));
        }
        return str;
    }
};
export default core;
