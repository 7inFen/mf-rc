import React from 'react';
var getTextLength = function (text, length) {
    if (text === void 0) { text = ''; }
    if (length === void 0) { length = 0; }
    var num = 0;
    var lengthIdx = 0;
    text.split('').forEach(function (t) {
        if (/[\u4e00-\u9fa5]/.test(t)) {
            num += 2;
        }
        else {
            num += 1;
        }
        if (length && num <= length) {
            lengthIdx += 1;
        }
    });
    return [num, lengthIdx || text.length];
};
export default function SliceText(props) {
    var _a = props.text, text = _a === void 0 ? '' : _a, _b = props.length, length = _b === void 0 ? 0 : _b, _c = props.showTitle, showTitle = _c === void 0 ? true : _c;
    var _d = getTextLength(text, length), textLength = _d[0], lengthIdx = _d[1];
    var resultText = text;
    if (length && textLength > length) {
        resultText = text.slice(0, lengthIdx) + "...";
    }
    return React.createElement("span", { title: showTitle ? text : '' }, resultText);
}
