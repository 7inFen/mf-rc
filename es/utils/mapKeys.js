export default (function (list, config) {
    if (list === void 0) { list = []; }
    if (config === void 0) { config = {
        key: 'key',
        name: 'name'
    }; }
    return list.reduce(function (prev, next) {
        prev[next[config.key]] = next[config.name];
        return prev;
    }, {});
});
