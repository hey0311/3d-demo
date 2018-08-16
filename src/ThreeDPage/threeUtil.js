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
            //添加提示框
            addSprite(editor);
            //调整相机视角
            setCameraPosition(editor);
            //添加光源
            addLight(editor);
            //设置背景
            setBackground(editor);
            //设置模型大小
            resetSceneScale(editor);
            //添加天空盒
            addSkyBox(editor);
            editor.select(null);
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
    let jpgFileArr=[posx,negx,posy,negy,posz,negz];
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

function addSprite(editor) {
    var devices = [
        {
            text: '横锯回程',
            position: [-200, 500, 200],
            size: [280, 120, 280],
            fontSize: 72
        }, {
            text: '横锯进给',
            position: [-200, 500, -325],
            size: [280, 120, 280],
            fontSize: 72
        }, {
            text: '纵锯回程',
            position: [-200, 500, -850],
            size: [280, 120, 280],
            fontSize: 72
        }, {
            text: '纵锯进给',
            position: [-200, 500, -1375],
            size: [280, 120, 280],
            fontSize: 72
        },
        {
            text: '出口',
            position: [800, 300, -300],
            size: [180, 120, 180],
            fontSize: 120
        }, {
            text: '中部',
            position: [800, 300, -720],
            size: [180, 120, 180],
            fontSize: 120
        }, {
            text: '入口',
            position: [800, 300, -1120],
            size: [180, 120, 180],
            fontSize: 120
        }
    ];
    var sprite = null;
    for (var i = 0; i < devices.length; i++) {
        sprite = createSpriteText(devices[i].position,
            devices[i].text, devices[i].size,
            devices[i].fontSize,
            devices[i].size[0] < 200 ? true : false);
        editor.scene.add(sprite);
    }

}

function createSpriteText(pos, text, size, fontSize, short) {
    //先用画布将文字画出
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = 'rgb(9,16,45,0.8)';
    ctx.strokeStyle = '#016487';
    ctx.lineWidth = 15;
    ctx.fillRect(0, 0, canvas.width - 5, canvas.height - 5);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#16ffff";
    ctx.font = "Bold " + fontSize / 10 + "px Arial";
    ctx.lineWidth = 8;
    if (short) {
        ctx.fillText(text, 25, 114);
    } else {
        ctx.fillText(text, 4, 104);
    }
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    //使用Sprite显示文字
    var material = new THREE.SpriteMaterial({map: texture});
    var textObj = new THREE.Sprite(material);
    textObj.name = 'test';
    textObj.scale.set(size[0] / 1000, size[1] / 1000, size[2] / 1000);
    textObj.position.set(pos[0] / 1000, pos[1] / 1000, pos[2] / 1000);
    return textObj;
}

function onWindowResize(event) {
    editor.signals.windowResize.dispatch();
}

Number.prototype.format = function () {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
