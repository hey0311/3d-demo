/* eslint-disable */
export function setWarning(obj, value) {
    if (value <= 80) {
        if (obj.oriMaterial) {
            editor.setObjectMaterial(obj, null, obj.oriMaterial);
            editor.signals.materialChanged.dispatch();
            return;
        } else {
            return;
        }
    }
    var material = new THREE.MeshBasicMaterial({
        color: getColor(value),
        name: 'material-1',
        opacity: 1
    });
    if (!obj.oriMaterial) {
        obj.oriMaterial = editor.getObjectMaterial(obj);
    }
    editor.setObjectMaterial(obj, null, material);
    editor.signals.materialChanged.dispatch();
}
var growItem={
    inTemp:0.7,
    centerTemp:0.7,
    outTemp:0.7,
    crossGive:0.7,
    crossBack:0.7,
    rowGive:0.7,
    rowBack:0.7
};
export function randomData(values, type) {
    var now = new Date();
    var random = Math.random();
    var value = 0;
    var standard,up,down;
    var formatValue;
    switch(type){
        case 'inTemp':
            process(growItem[type],120,2,-2,5);
            formatValue = value / 1.2;
            break;
        case 'centerTemp':
            process(growItem[type],180,2,-2,5);
            formatValue = value / 1.8;
            break;
        case 'outTemp':
            process(growItem[type],80,2,-2,5);
            formatValue = value / 0.8;
            break
        case 'crossGive':
            process(growItem[type],30,2,-2,2);
            formatValue = value / 0.3;
            break
        case 'crossBack':
            process(growItem[type],35,2,-2,2);
            formatValue = value / 0.35;
            break
        case 'rowGive':
            process(growItem[type],32,2,-2,2);
            formatValue = value / 0.32;
            break
        case 'rowBack':
            process(growItem[type],40,2,-2,2);
            formatValue = value / 0.4;
            break
    }
    function process(growItem,standard,up,down,radio) {
        if (values[values.length - 1].value[1] >standard) {
            growItem = growItem - 0.1;
            if (growItem < down) {
                growItem = down;
            }
        } else if (values[values.length - 1].value[1] <= standard) {
            growItem = growItem + 0.1;
            if (growItem > up) {
                growItem = up;
            }
        }
        if (random > growItem) {
            value = values[values.length - 1].value[1] - random * radio;
        } else {
            value = values[values.length - 1].value[1] + random * radio;
        }
    }
    return {
        name: now,
        value: [
            now,
            value
        ],
        formatValue: formatValue
    }
}
export function getColor(value) {
    if (value <= 80) {
        return '#00acee';
    } else if (value > 80 && value < 100) {
        return '#ffff00';
    } else {
        return '#ff0000';
    }
}
