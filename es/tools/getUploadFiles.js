var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export default (function (fileList, params) {
    if (fileList === void 0) { fileList = []; }
    params = __assign({ keys: ['id', 'url'] }, params);
    var valueList = [];
    fileList.forEach(function (file) {
        var fileStatus = file.status, xhr = file.xhr, _a = file.response, response = _a === void 0 ? '' : _a;
        if (fileStatus) {
            if (fileStatus === 'done' && response) {
                var _b = file.response, status_1 = _b.status, _c = _b.data, data_1 = _c === void 0 ? {} : _c;
                if (status_1 === 'success') {
                    var fileData_1 = {};
                    params.keys.forEach(function (key) {
                        fileData_1[key] = data_1[key];
                    });
                    valueList.push(fileData_1);
                }
            }
        }
        else {
            valueList.push(file);
        }
    });
    return valueList;
});
export var getUploadFilesKey = function (fileList, params) {
    if (fileList === void 0) { fileList = []; }
    params = __assign({ key: 'id' }, params);
    var valueList = [];
    fileList.forEach(function (file) {
        var fileStatus = file.status, xhr = file.xhr, _a = file.response, response = _a === void 0 ? '' : _a;
        if (fileStatus) {
            if (fileStatus === 'done' && response) {
                var _b = file.response, status_2 = _b.status, _c = _b.data, data = _c === void 0 ? {} : _c;
                if (status_2 === 'success') {
                    valueList.push(data[params.key]);
                }
            }
        }
        else {
            valueList.push(file[params.key] || file.uid);
        }
    });
    return valueList;
};
