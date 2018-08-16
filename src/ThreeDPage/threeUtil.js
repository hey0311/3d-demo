/* eslint-disable */
import fileObj from '../res/fa1.obj';
import fileMtl from '../res/fa1.mtl';
import negx from '../images/negx.jpg';
import negy from '../images/negy.jpg';
import negz from '../images/negz.jpg';
import posx from '../images/posx.jpg';
import posy from '../images/posy.jpg';
import posz from '../images/posz.jpg';
var THREE = window.THREE;
export const render3d = (threeConfig) => {
    window.URL = window.URL || window.webkitURL;
    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
    var editor = new Editor();
    threeConfig.editor = editor;
    var viewport = new Viewport(editor);
    document.getElementById('three-container').appendChild(viewport.dom);
    var script = new Script(editor);
// document.getElementById('three-container').appendChild(script.dom);
    var player = new Player(editor);
// document.getElementById('three-container').appendChild(player.dom);
    var toolbar = new Toolbar(editor);
// document.getElementById('three-container').appendChild(toolbar.dom);
    var menubar = new Menubar(editor);
    // document.getElementById('three-container').appendChild(menubar.dom);
    var sidebar = new Sidebar(editor);
    // document.getElementById('three-container').appendChild(sidebar.dom);
    var modal = new UI.Modal();
// document.getElementById('three-container').appendChild(modal.dom);
    editor.setTheme(editor.config.getKey('theme'));
    console.log(editor);
    readTextFile(fileMtl, function (file) {
        var mtl = new THREE.MTLLoader().parse(file);
        mtl.preload();
        readTextFile(fileObj, function (file1) {
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(mtl);
            var object = objLoader.parse(file1);
            editor.execute(new AddObjectCommand(object));
            threeConfig.modelObj = editor.scene.children[0];
            //设置模型大小
            resetSceneScale(editor);
            //添加提示框
            addSprite(editor);
            //调整相机视角
            setCameraPosition(editor);
            //添加光源
            addLight(editor);
            //设置背景
            setBackground(editor);
            //添加天空盒
            addSkyBox(editor);
            editor.select(null);
            console.log(editor.scene.children[0].position)
        })
    });
    //缩放事件
    window.addEventListener('resize', onWindowResize, false);
    onWindowResize();
    //模型点击事件
    editor.signals.objectSelected.add(function (obj) {
        if (!obj) {
            return
        }
        threeConfig.objectSelectedFn(obj);
    });
};

function resetSceneScale(editor) {
    for (var i = 0; i < editor.scene.children.length; i++) {
        editor.scene.children[i].scale.x = 0.01;
        editor.scene.children[i].scale.y = 0.01;
        editor.scene.children[i].scale.z = 0.01;
    }
}

function addSkyBox(editor) {

    //创建盒子，并设置盒子的大小为( 5000, 5000, 5000 )
    var skyGeometry = new THREE.BoxGeometry(5000, 5000, 5000);
    //设置盒子材质
    var materialArray = [];
    let jpgFileArr = [posx, negx, posy, negy, posz, negz];
    for (var i = 0; i < 6; i++)
        materialArray.push(new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture(jpgFileArr[i]),//将图片纹理贴上
            side: THREE.BackSide/*镜像翻转，如果设置镜像翻转，那么只会看到黑漆漆的一片，因为你身处在盒子的内部，所以一定要设置镜像翻转。*/
        }));
    var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);//创建一个完整的天空盒，填入几何模型和材质的参数
    editor.scene.add(skyBox);//在场景中加入天空盒
}

function setBackground(editor) {
    editor.scene.background.r = 8 / 255;
    editor.scene.background.g = 12 / 255;
    editor.scene.background.b = 14 / 255;
}

function addLight(editor) {
    var box = new THREE.Box3();
    let obj = editor.scene.children[0];
    box.expandByObject(obj);

    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    ambientLight.position.set(box.min.x, box.min.y, box.min.z);
    editor.scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(box.min.x, box.min.y, box.min.z);
    editor.scene.add(spotLight);

    var pointColor = "#ffffff";
    var directionLight2 = new THREE.DirectionalLight(pointColor);
    var directionLight3 = new THREE.DirectionalLight(pointColor);
    directionLight2.position.set(box.max.x - 800, box.max.y + 2000, box.max.z);
    directionLight3.position.set(box.max.x + 800, box.max.y + 2000, box.max.z);

    editor.scene.add(directionLight2);
    editor.scene.add(directionLight3);

}

function setCameraPosition(editor) {
    //调整视角
    editor.camera.position.x += (-27);
    editor.camera.position.y += (27.45 - 5);
    editor.camera.position.z += (21.87 - 10);
    editor.camera.rotation.x += (-51.46 + 26.57) * Math.PI / 180;
    editor.camera.rotation.y += -(37.35) * Math.PI / 180;
    editor.camera.rotation.z += -37.43 * Math.PI / 180;
    editor.signals.cameraChanged.dispatch();
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("text/plain");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

/**
 * 天空盒
 * @param editor
 */
function addSprite(editor) {
    var devices = [
        {
            text: '横锯回程',
            position: [-1.5, 4, 1.5],
            size: [3, 1],
            fontSize: 73
        }, {
            text: '横锯进给',
            position: [-1.5, 4, -3.5],
            size: [3, 1],
            fontSize: 73
        }, {
            text: '纵锯回程',
            position: [-1.5, 4, -8.75],
            size: [3, 1],
            fontSize: 73
        }, {
            text: '纵锯进给',
            position: [-1.5, 4, -13.95],
            size: [3, 1],
            fontSize: 73
        },
        {
            text: '出口',
            position: [8, 3, -2.4],
            size: [3, 1],
            fontSize: 73
        }, {
            text: '中部',
            position: [8, 3, -6.6],
            size: [3, 1],
            fontSize: 73
        }, {
            text: '入口',
            position: [8, 3, -10.8],
            size: [3, 1],
            fontSize: 73
        }
    ];
    var sprite = null;
    for (var i = 0; i < devices.length; i++) {
        sprite = makeTextSprite(devices[i].text,{
            fontsize:devices[i].fontSize,
            position:devices[i].position,
            size:devices[i].size
        })
        editor.scene.add(sprite);
    }
}

function makeTextSprite(message, parameters) {
    if (parameters === undefined) parameters = {};
    var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
    var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
    var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : {r: 0, g: 0, b: 0, a: 1.0};
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : {
        r: 255,
        g: 255,
        b: 255,
        a: 1.0
    };
    var textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : {r: 0, g: 0, b: 0, a: 1.0};

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;
    var metrics = context.measureText(message);
    var textWidth = metrics.width;

    context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;
    roundRect(context, borderThickness / 2, borderThickness / 2, (textWidth + borderThickness) * 1.1, fontsize * 1.4 + borderThickness, 8);

    context.fillStyle = "rgba(" + textColor.r + ", " + textColor.g + ", " + textColor.b + ", 1.0)";
    context.fillText(message, borderThickness, fontsize + borderThickness);

    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial({map: texture, useScreenCoordinates: false});
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(...parameters.size);
    sprite.position.set(...parameters.position);
    return sprite;
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function onWindowResize(event) {
    editor.signals.windowResize.dispatch();
}

Number.prototype.format = function () {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
