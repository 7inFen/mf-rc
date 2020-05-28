export var setThousandSign = function (number) {
    if (!number) {
        if (number === 0) {
            return "" + number;
        }
        return '-';
    }
    var numberString = "" + number;
    var isNegative = numberString.startsWith('-');
    var numberList = (isNegative ? numberString.slice(1) : numberString).split('.');
    var list = [];
    numberList[0]
        .split('')
        .reverse()
        .map(function (item, idx) {
        if (idx && idx % 3 === 0) {
            item += ',';
        }
        list.push(item);
        return false;
    });
    numberList[0] = list.reverse().join('');
    var resultNumber = numberList.join('.');
    return isNegative ? "-" + resultNumber : resultNumber;
};
export default setThousandSign;
