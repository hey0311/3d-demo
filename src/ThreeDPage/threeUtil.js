/* eslint-disable */
import fileObj from '../res/fa1.obj';
import fileMtl from '../res/fa1.mtl';
var THREE = window.THREE;
export const render3d=()=>{
    console.log(window)

/*    function onWindowResize(event) {
        editor.signals.windowResize.dispatch();
    }*/

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

    window.URL = window.URL || window.webkitURL;
    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
    Number.prototype.format = function () {
        return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };
    var editor = new Editor();
    window.editor=editor;
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
    var obj;
    editor.setTheme(editor.config.getKey('theme'));
    console.log(editor)
//加载文件
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader();

    readTextFile(fileMtl, function (file) {
        var mtl = new THREE.MTLLoader().parse(file);
        mtl.preload();
        readTextFile(fileObj, function (file1) {
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(mtl);
            var object = objLoader.parse(file1);
            editor.execute(new AddObjectCommand(object));
            // editor.focus(editor.scene.children[0].children[0]);
            var devices=[
                {
                    text:'横锯回程',
                    position:[-200,500,200],
                    size:[280,120,280],
                    fontSize:72
                },{
                    text:'横锯进给',
                    position:[-200,500,-325],
                    size:[280,120,280],
                    fontSize:72
                },{
                    text:'纵锯回程',
                    position:[-200,500,-850],
                    size:[280,120,280],
                    fontSize:72
                },{
                    text:'纵锯进给',
                    position:[-200,500,-1375],
                    size:[280,120,280],
                    fontSize:72
                },
                {
                    text:'出口',
                    position:[800,300,-300],
                    size:[180,120,180],
                    fontSize:120
                },{
                    text:'中部',
                    position:[800,300,-720],
                    size:[180,120,180],
                    fontSize:120
                },{
                    text:'入口',
                    position:[800,300,-1120],
                    size:[180,120,180],
                    fontSize:120
                }
            ];
            var sprite=null;
            for(var i=0;i<devices.length;i++){
                sprite=createSpriteText(devices[i].position,
                    devices[i].text,devices[i].size,
                    devices[i].fontSize,
                    devices[i].size[0]<200?true:false);
                editor.scene.add(sprite);
            }

            //调整视角
            // editor.select(null)
            // editor.focus(sprite);
            /*        editor.camera.position.x+=(-2247.7+200);
                    editor.camera.position.y+=(3511.9-500.18);
                    editor.camera.position.z+=(212.06-200.36);*/
            // editor.camera.position.x+=(-2574.1+200);
            // editor.camera.position.y+=(3286.5-500.18);
            // editor.camera.position.z+=(1058.88-200.36);
            // editor.camera.rotation.x+=(-89.77+26.57)*Math.PI/180;
            // editor.camera.rotation.y+=-(34.21)*Math.PI/180;
            // editor.camera.rotation.z+=-89.6*Math.PI/180;

            // editor.camera.position.x+=(-2674.3);
            // editor.camera.position.y+=(3413.57);
            // editor.camera.position.z+=(1077.22);
            // editor.camera.rotation.x+=(-89.78+26.57)*Math.PI/180;
            // editor.camera.rotation.y+=-(33.35)*Math.PI/180;
            // editor.camera.rotation.z+=-89.6*Math.PI/180;
            /*        editor.camera.position.x+=(-2490.3);
                    editor.camera.position.y+=(3223.57);
                    editor.camera.position.z+=(-8);
                    editor.camera.rotation.x+=(-89.78+26.57)*Math.PI/180;
                    editor.camera.rotation.y+=-(37.35)*Math.PI/180;
                    editor.camera.rotation.z+=-89.6*Math.PI/180;*/
            console.log(editor);
            // setCenter(editor.scene.children[3]);
            var box = new THREE.Box3();
            obj = editor.scene.children[0];
            box.expandByObject(obj);

            var ambientLight = new THREE.AmbientLight(0x0c0c0c);
            ambientLight.position.set(box.min.x, box.min.y, box.min.z);
            editor.scene.add(ambientLight);

            var spotLight = new THREE.SpotLight(0xffffff);
            var spotLight1 = new THREE.SpotLight(0xffffff);
            spotLight.position.set(box.min.x, box.min.y, box.min.z);
            spotLight1.position.set(box.max.x, box.max.y, box.max.z);
            editor.scene.add(spotLight);
            var pointColor = "#ffffff";
            var directionLight = new THREE.DirectionalLight(pointColor);
            var directionLight1 = new THREE.DirectionalLight(pointColor);
            var directionLight2 = new THREE.DirectionalLight(pointColor);
            var directionLight3 = new THREE.DirectionalLight(pointColor);
            var directionLight4 = new THREE.DirectionalLight(pointColor);
            directionLight.position.set(box.min.x, box.min.y, box.min.z);
            directionLight1.position.set(box.max.x, box.max.y, box.max.z);
            directionLight2.position.set(box.max.x - 800, box.max.y+2000, box.max.z);
            directionLight3.position.set(box.max.x + 800, box.max.y+2000, box.max.z);

            /*                editor.scene.add(directionLight);
                            editor.scene.add(directionLight1);*/
            editor.scene.add(directionLight2);
            editor.scene.add(directionLight3);
            editor.scene.add(directionLight4);
            editor.scene.background.r=8/255;
            editor.scene.background.g=12/255;
            editor.scene.background.b=14/255;
            //天空盒
            var path = "images/";//设置路径
            var directions  = ["posx", "negx", "posy", "negy", "posz", "negz"];//获取对象
            var format = ".jpg";//格式

            for(var i =0 ;i<editor.scene.children.length;i++){
                editor.scene.children[i].scale.x=0.01;
                editor.scene.children[i].scale.y=0.01;
                editor.scene.children[i].scale.z=0.01;
            }

            //创建盒子，并设置盒子的大小为( 5000, 5000, 5000 )
            var skyGeometry = new THREE.BoxGeometry( 5000, 5000, 5000 );
            //设置盒子材质
            var materialArray = [];
            for (var i = 0; i < 6; i++)
                materialArray.push( new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture( path + directions[i] + format ),//将图片纹理贴上
                    side: THREE.BackSide/*镜像翻转，如果设置镜像翻转，那么只会看到黑漆漆的一片，因为你身处在盒子的内部，所以一定要设置镜像翻转。*/
                }));
            var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
            var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );//创建一个完整的天空盒，填入几何模型和材质的参数
            editor.scene.add( skyBox );//在场景中加入天空盒


            editor.select(null)
            // editor.scene.position.z-=1200;
            // editor.scene.position.x+=500;
            // editor.signals.spaceChanged.dispatch()
            editor.signals.cameraChanged.dispatch();

            /*        var sphere = new THREE.SphereGeometry(8000, 8000, 50);
                    sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

                    var sphereMaterial = new THREE.MeshBasicMaterial();
                    sphereMaterial.map = THREE.ImageUtils.loadTexture('../../3d-models/star.jpg');

                    var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
                    editor.scene.add(sphereMesh);*/
        })
    });
    function createSpriteText(pos,text,size,fontSize,short){
        //先用画布将文字画出
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = 'rgb(9,16,45,0.8)';
        ctx.strokeStyle= '#016487';
        ctx.lineWidth=15;
        ctx.fillRect(0, 0, canvas.width-5, canvas.height-5);
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#16ffff";
        ctx.font = "Bold "+fontSize/10+"px Arial";
        ctx.lineWidth = 8;
        if(short){
            ctx.fillText(text,25,114);
        }else{
            ctx.fillText(text,4,104);
        }
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        //使用Sprite显示文字
        var material = new THREE.SpriteMaterial({map:texture});
        var textObj = new THREE.Sprite(material);
        textObj.name='test';
        textObj.scale.set(size[0]/1000, size[1]/1000, size[2]/1000);
        textObj.position.set(pos[0]/1000,pos[1]/1000,pos[2]/1000);
        return textObj;
    }
//避免bug
// window.addEventListener('resize', onWindowResize, false);
//     onWindowResize();
/*    editor.signals.objectSelected.add(function (obj) {
        if (!obj) {
            return
        }
        for (var i = 0; i < reyaModelMap.length; i++) {
            if (reyaModelMap[i].objName === obj.name) {
                echart_show = 0;
                objName = reyaModelMap[i].objName;
                mes = reyaModelMap[i].mes;
                selectMesName = reyaModelMap[i].mesName;
            }
        }
        for (var i = 0; i < jqModelMap.length; i++) {
            if (jqModelMap[i].objName === obj.name) {
                echart_show = 1;
                objName = jqModelMap[i].objName;
                mes_jq = jqModelMap[i].mes;
                selectMesName = jqModelMap[i].mesName;
            }
        }
    });*/
}