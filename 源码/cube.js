/**
 * Created by Administrator on 2015/7/8 0008.
 */


//和样式表单里的transition过度属性，保持一致。
var transition={
    duration:0.8,
    delay   :0.1,
    get sumDelay(){
        return (this.duration+this.delay)*1.2;
    }
};
(function (){
    (function (){
        this.VARS   =   {
            cube_arr        : [],
            arr             : [],
            from_to         : [],
            axises_Angle    : {X:undefined,Y:undefined,Z:undefined},
            move_Angle      : {
                start       :   undefined,
                end         :   undefined,
                get    angle(){
                    if(typeof this.start == 'undefined' || typeof this.end == 'undefined'){
                        return NaN;
                    }
                    else{
                        return getAngle_From_Point1_To_Point2(this.start, this.end);
                    }
                },
                allReset    :   function(){
                    this.start   =   undefined;
                    this.end     =   undefined;
                }
            },
            stepsAlreadyMoved : {
                steps:[],
                thumbSteps:0
            },
            transitionDelay :  700
        };
        VARS.cube_arr    =   [
            [".corner_cube_7"    ,   [   -1,   -1,  -1]  ],
            [".edge_cube_11"     ,   [    0,   -1,  -1]  ],
            [".corner_cube_6"    ,   [    1,   -1,  -1]  ],
            [".edge_cube_12"     ,   [   -1,    0,  -1]  ],
            [".center_cube_2"    ,   [    0,    0,  -1]  ],
            [".edge_cube_10"     ,   [    1,    0,  -1]  ],
            [".corner_cube_8"    ,   [   -1,    1,  -1]  ],
            [".edge_cube_9"      ,   [    0,    1,  -1]  ],
            [".corner_cube_5"    ,   [    1,    1,  -1]  ],
            [".edge_cube_7"      ,   [   -1,   -1,   0]  ],
            [".center_cube_5"    ,   [    0,   -1,   0]  ],
            [".edge_cube_6"      ,   [    1,   -1,   0]  ],
            [".center_cube_6"    ,   [   -1,    0,   0]  ],
            [".core"             ,   [    0,    0,   0]  ],
            [".center_cube_4"    ,   [    1,    0,   0]  ],
            [".edge_cube_8"      ,   [   -1,    1,   0]  ],
            [".center_cube_3"    ,   [    0,    1,   0]  ],
            [".edge_cube_5"      ,   [    1,    1,   0]  ],
            [".corner_cube_3"    ,   [   -1,   -1,   1]  ],
            [".edge_cube_3"      ,   [    0,   -1,   1]  ],
            [".corner_cube_2"    ,   [    1,   -1,   1]  ],
            [".edge_cube_4"      ,   [   -1,    0,   1]  ],
            [".center_cube_1"    ,   [    0,    0,   1]  ],
            [".edge_cube_2"      ,   [    1,    0,   1]  ],
            [".corner_cube_4"    ,   [   -1,    1,   1]  ],
            [".edge_cube_1"      ,   [    0,    1,   1]  ],
            [".corner_cube_1"    ,   [    1,    1,   1]  ]];
        VARS.arr    =   [
            [   [{cube:VARS.cube_arr[0]  , currentDir:[ -1, -1, -1 ] },{cube:VARS.cube_arr[1]  , currentDir:[ 0, -1, -1 ] },{ cube:VARS.cube_arr[2]  , currentDir:[ 1, -1, -1 ] }],
                [{cube:VARS.cube_arr[3]  , currentDir:[ -1,  0, -1 ] },{cube:VARS.cube_arr[4]  , currentDir:[ 0,  0, -1 ] },{ cube:VARS.cube_arr[5]  , currentDir:[ 1,  0, -1 ] }],
                [{cube:VARS.cube_arr[6]  , currentDir:[ -1,  1, -1 ] },{cube:VARS.cube_arr[7]  , currentDir:[ 0,  1, -1 ] },{ cube:VARS.cube_arr[8]  , currentDir:[ 1,  1, -1 ] }]],
            [   [{cube:VARS.cube_arr[9]  , currentDir:[ -1, -1,  0 ] },{cube:VARS.cube_arr[10] , currentDir:[ 0, -1,  0 ] },{ cube:VARS.cube_arr[11] , currentDir:[ 1, -1,  0 ] }],
                [{cube:VARS.cube_arr[12] , currentDir:[ -1,  0,  0 ] },{cube:VARS.cube_arr[13] , currentDir:[ 0,  0,  0 ] },{ cube:VARS.cube_arr[14] , currentDir:[ 1,  0,  0 ] }],
                [{cube:VARS.cube_arr[15] , currentDir:[ -1,  1,  0 ] },{cube:VARS.cube_arr[16] , currentDir:[ 0,  1,  0 ] },{ cube:VARS.cube_arr[17] , currentDir:[ 1,  1,  0 ] }]],
            [   [{cube:VARS.cube_arr[18] , currentDir:[ -1, -1,  1 ] },{cube:VARS.cube_arr[19] , currentDir:[ 0, -1,  1 ] },{ cube:VARS.cube_arr[20] , currentDir:[ 1, -1,  1 ] }],
                [{cube:VARS.cube_arr[21] , currentDir:[ -1,  0,  1 ] },{cube:VARS.cube_arr[22] , currentDir:[ 0,  0,  1 ] },{ cube:VARS.cube_arr[23] , currentDir:[ 1,  0,  1 ] }],
                [{cube:VARS.cube_arr[24] , currentDir:[ -1,  1,  1 ] },{cube:VARS.cube_arr[25] , currentDir:[ 0,  1,  1 ] },{ cube:VARS.cube_arr[26] , currentDir:[ 1,  1,  1 ] }]]];
        Object.seal(VARS);
        Object.seal(VARS.arr);
        Object.seal(VARS.axises_Angle);
        Object.seal(VARS.stepsAlreadyMoved);
        Object.seal(VARS.transitionDelay);
        Object.seal(VARS.move_Angle);
        Object.seal(VARS.move_Angle.angle);
        Object.seal(VARS.move_Angle.allReset);
        Object.freeze(VARS.cube_arr);
    })();
    (function (){
        this.findPositionOfCubeBy_Data_Which    =   function (which){
            for(var i=0; i<VARS.arr.length; i++){
                for(var j=0; j<VARS.arr[i].length; j++){
                    for(var k=0; k<VARS.arr[i][j].length; k++){
                        if(String.trim(VARS.arr[i][j][k].cube[0]) == ("."+String.trim(which) ) ){
                            return VARS.arr[i][j][k].currentDir;
                        }
                    }
                }
            }
        };

        this.getAngle_From_Point1_To_Point2     =   function (point1,   point2){
            var x_dif   =   (point1 instanceof Array)?(point2[0] - point1[0]):( point2.left - point1.left )     ;
            var y_dif   =   (point1 instanceof Array)?(point2[1] - point1[1]):( point2.top - point1.top )       ;
            return (y_dif<0?-1:1)*(Math.acos( ( x_dif / Math.sqrt( x_dif*x_dif+y_dif*y_dif ) )) * 180 / Math.PI-(y_dif<0?360:0));
        };

// 对矩阵做变化，更新信息
        this.circleObjArray                     =  function (position, axis, dir){
            var cir = [];
            for(var i=0; i<position.length; i++){
                var transformedEle = Matrix.matrixMultiplicate( [[position[i][0]], [position[i][1]], [position[i][2]]],
                    Matrix.getThumbedRotateMatrix(Matrix.getMatrix3DFromAngles_WithAxis(axis,dir>0?90:-90),4,4,3,3  ) );

                cir.push([Math.round(transformedEle[0][0]), Math.round(transformedEle[1][0]),Math.round(transformedEle[2][0]) ]);
            }
            // cir 旋转之后的位置， 是从（-1，-1，-1） 到（1，1，1） 的集合一个子集
            var scope =[];
            for(var n=0; n<position.length; n++){
                scope.push (VARS.arr[position[n][2]+1][position[n][1]+1][position[n][0]+1].cube);
            }
            for(var p=0; p<position.length; p++){
                VARS.arr[cir[p][2]+1][cir[p][1]+1][cir[p][0]+1].cube        =   scope[p];
            }
        };

        this.cubesToSquares                     =  function (axis, layer){
            var squares = [];
            $.each(calculateCubes(axis, layer), function(index, cube){
                $.each($(cube[0]), function(index, ele){
                    squares.push(ele);
                });
            });
            return squares;
        };

        this.calculateCubes                     =  function (axis, layer, bool){
            var divs =[];
            var position =[];
            switch(axis){
                case 'X':
                    switch (layer){
                        case -1:
                            for(var i = 0; i<3; i++){
                                for(var j = 0; j<3; j++){
                                    divs.push(VARS.arr[i][j][0].cube);
                                    position.push([-1,j-1,i-1]);
                                }
                            }
                            break;
                        case 0:
                            for(i = 0; i<3; i++){
                                for( j = 0; j<3; j++){
                                    if(i==1&&j==1){
                                        continue;
                                    }
                                    divs.push(VARS.arr[i][j][1].cube);
                                    position.push([0,j-1,i-1]);
                                }
                            }
                            break;
                        case 1:
                            for( i = 0; i<3; i++){
                                for( j = 0; j<3; j++){
                                    divs.push(VARS.arr[i][j][2].cube);
                                    position.push([1,j-1,i-1]);
                                }
                            }
                            break;
                    }
                    break;
                case 'Y':
                    switch (layer){
                        case -1:
                            for( i = 0; i<3; i++){
                                for( j = 0; j<3; j++){
                                    divs.push(VARS.arr[i][0][j].cube);
                                    position.push([j-1,-1,i-1]);
                                }
                            }
                            break;
                        case 0:
                            for( i = 0; i<3; i++){
                                for( j = 0; j<3; j++){
                                    if(i==1&&j==1){
                                        continue;
                                    }
                                    divs.push(VARS.arr[i][1][j].cube);
                                    position.push([j-1,0,i-1]);
                                }
                            }
                            break;
                        case 1:
                            for( i = 0; i<3; i++){
                                for( j = 0; j<3; j++){
                                    divs.push(VARS.arr[i][2][j].cube);
                                    position.push([j-1,1,i-1]);
                                }
                            }
                            break;
                    }
                    break;
                case 'Z':
                    switch (layer){
                        case -1:
                            for( i = 0; i<3; i++){
                                for( j = 0; j<3; j++){
                                    divs.push(VARS.arr[0][i][j].cube);
                                    position.push([j-1,i-1,-1]);
                                }
                            }
                            break;
                        case 0:
                            for( i = 0; i<3; i++){
                                for( j = 0; j<3; j++){
                                    if(i==1&&j==1){
                                        continue;
                                    }
                                    divs.push(VARS.arr[1][i][j].cube);
                                    position.push([j-1,i-1,0]);
                                }
                            }
                            break;
                        case 1:
                            for( i = 0; i<3; i++){
                                for( j = 0; j<3; j++){
                                    divs.push(VARS.arr[2][i][j].cube);
                                    position.push([j-1,i-1,1]);
                                }
                            }
                            break;
                    }
                    break;
                default :
                    divs=[];
                    position = [];
                    break;
            }
            return bool?position:divs;
        };

        this.matrix3dToMatrix                   =  function (str){
            var result = str.match(/matrix(?:3d)?\((.*)\)/);
            if(result!=null)
                result= result[1].split(",");
            else{
                return ("matrix3d  属性转化为矩阵时候的 正则匹配结果为空！");
            }

            var matrixArray = [];

            for(var x=0; x<4; x++){
                matrixArray[x] = [];
            }

            var count = 0;
            if(result.length==16){
                for(var i=0; i<4; i++){
                    for(var j=0; j<4; j++){
                        matrixArray[j][i]= parseFloat(result[count]);
                        count++;
                    }
                }
            }
            else {

                for(var m=0; m<4; m++){
                    for(var n=0; n<4; n++){
                        matrixArray[n][m]= 0;
                    }
                }
                for(var p=0; p<2; p++){
                    for(var q=0; q<2; q++){
                        matrixArray[q][p]= parseFloat(result[count]);
                        count++;
                    }
                }
                matrixArray[0][3]=parseFloat(result[4]);
                matrixArray[1][3]=parseFloat(result[5]);
                matrixArray[3][3]=1;
                matrixArray[2][2]=1;

            }
            return matrixArray;
        };

        this.matrixToMatrix3d                   =  function (arr_){
            var str = 'matrix3d(';
            var height = arr_.length;
            var width = ( arr_[0] instanceof Array)?arr_[0].length:1;

            var arr_temp =[];
            for(var i=0; i<4; i++){
                arr_temp[i] = [];
                for(var j=0; j<4; j++){
                    arr_temp[i][j]=0;
                    if(i==j)
                        arr_temp[i][j] = 1;
                }
            }
            arr_temp[3][3] = 1;

            for(var h=0; h<height; h++){
                for(var w=0; w<width; w++){

                    arr_temp[h][w] =arr_[h][w];
                }
            }

            for(var m=0; m<4; m++){
                for(var n=0; n<4; n++){
                    str +=arr_temp[n][m]+",";
                }
            }
            return str.slice(0,-1)+");";
        };
        Object.defineProperties(this,{
            findPositionOfCubeBy_Data_Which     :{enumerable:true,writable:false,configurable:false},
            getAngle_From_Point1_To_Point2      :{enumerable:true,writable:false,configurable:false},
            circleObjArray                      :{enumerable:true,writable:false,configurable:false},
            cubesToSquares                      :{enumerable:true,writable:false,configurable:false},
            calculateCubes                      :{enumerable:true,writable:false,configurable:false},
            matrix3dToMatrix                    :{enumerable:true,writable:false,configurable:false},
            matrixToMatrix3d                    :{enumerable:true,writable:false,configurable:false}
        });
    })();
    (function (){
        function turn( flag, axis, layer, dir ){
            if(arguments.length==0){
                var from = findPositionOfCubeBy_Data_Which(VARS.from_to[0]);
                var to = findPositionOfCubeBy_Data_Which(VARS.from_to[1]);
                var vector = Matrix.matrix_Dif(from, to);
                flag    =   false;
                (function(){
                    var count = 0;
                    for(var i=0; i<vector.length; i++){
                        count +=(vector[i] == 0)?(0):(1);
                    }
                    var start   = undefined;
                    var end     = undefined;
                    switch (count){
                        case 1: //只改变了一个维度坐标，需要考虑 ，有两个维度的坐标没变
                            var axis_changed    =   from[0]!=to[0]?("X"):(from[1]!=to[1]?"Y":(from[2]!=to[2]?"Z":0));
                            //下面的分支判断，只为了找出中间层做变换的时候（layer=0)应该旋转的坐标轴和方向
                            switch (axis_changed){
                                case "X":
                                    if(from[1]==0){
                                        axis    =   "Y";
                                        layer   =   0;
                                        dir     =   (to[0]-from[0]>0?1:-1)*(from[2]>0?1:-1);
                                    }
                                    else
                                    if(from[2]==0){
                                        axis    =   "Z";
                                        layer   =   0;
                                        dir     =   (to[0]-from[0]>0?-1:1)*(from[1]>0?1:-1);
                                    }
                                    //edge边该坐旋转的时候，的分支判断，
                                    break;
                                case "Y":
                                    if(from[2]==0){
                                        axis    =   "Z";
                                        layer   =   0;
                                        dir     =   (to[1]-from[1]>0?1:-1)*(from[0]>0?1:-1);
                                    }
                                    else
                                    if(from[0]==0){
                                        axis    =   "X";
                                        layer   =   0;
                                        dir     =   (to[1]-from[1]>0?1:-1)*(from[2]>0?-1:1);
                                    }
                                    break;
                                case "Z":
                                    if(from[0]==0){
                                        axis    =   "X";
                                        layer   =   0;
                                        dir     =   (to[2]-from[2]>0?1:-1)*(from[1]>0?1:-1);
                                    }
                                    else
                                    if(from[1]==0){
                                        axis    =   "Y";
                                        layer   =   0;
                                        dir     =   (to[2]-from[2]>0?-1:1)*(from[0]>0?1:-1);
                                    }
                                    break;
                                default:
                                    break;
                            }

                            return false;
                        case 2:
                            axis    = (vector[0]==0) ? ("X" ) : (vector[1]==0) ? ("Y") : ("Z");
                            layer   = (vector[0]==0) ? (from[0]) : (vector[1]==0) ? (from[1]) : (from[2]);
                            switch (axis){
                                case "X":
                                    start   =   getAngle_From_Point1_To_Point2([0,0],[from[1],from[2]]);
                                    end     =   getAngle_From_Point1_To_Point2([0,0],[to[1],to[2]]);
                                    break;
                                case "Y":
                                    start   =   getAngle_From_Point1_To_Point2([0,0],[from[2],from[0]]);
                                    end     =   getAngle_From_Point1_To_Point2([0,0],[to[2],to[0]]);
                                    break;
                                case "Z":
                                    start   =   getAngle_From_Point1_To_Point2([0,0],[from[0],from[1]]);
                                    end     =   getAngle_From_Point1_To_Point2([0,0],[to[0],to[1]]);
                                    break;
                            }
                            var dif = (end-start);
                            dir    =   (dif==-180||dif==180||dif==0||dif==360)?0:(dif>180||(dif<0&&dif>-180))?-1:1;
                            return false;
                        case 3:
                            turnPerspective();
                            return true;
                    }

                })();
            }

            if(!((axis=="X"||axis=="Y"||axis=="Z")  && (layer==0||layer==-1||layer==1) &&( dir==-1||dir==1))){
                return;
            }
            axis = axis.toUpperCase();
            var firstStepLeftMatrix   = Matrix.getMatrix3DFromAngles_WithAxis(axis, dir>0? 1.5: -1.5);
            var secondStepLeftMatrix  = Matrix.getMatrix3DFromAngles_WithAxis(axis, dir>0?88.5:-88.5);
            var finalStepLeftMatrix   = Matrix.getMatrix3DFromAngles_WithAxis(axis, dir>0?90:-90);
            var squaresToTransform = cubesToSquares(axis, layer);

            $.each(squaresToTransform,function(index,dom){
                var presentMatrix = matrix3dToMatrix($(dom).css("transform"));
                var firstMatrix   = Matrix.matrixMultiplicate  ( presentMatrix, firstStepLeftMatrix);
                var secondMatrix  = Matrix.matrixMultiplicate  ( presentMatrix, secondStepLeftMatrix);
                var finalMatrix   = roundTheMatrix(Matrix.matrixMultiplicate  ( presentMatrix, finalStepLeftMatrix));
                var firstMatrix3d = matrixToMatrix3d ( firstMatrix  );
                var secondMatrix3d= matrixToMatrix3d ( secondMatrix  );
                var finalMatrix3d = matrixToMatrix3d ( finalMatrix);

                function roundTheMatrix(array){
                    if(array instanceof Array){
                        for(var i=0; i<this.length; i++){
                            for(var j=0; j<this[0].length; j++){
                                array[i][j]=parseInt(array[i][j]);
                            }
                        }
                        return array;
                    }
                    else
                        throw "Error!";
                }


                function transition(step){
                    var timeStyle="transition-duration: ";
                    switch (step){
                        case 2:
                            timeStyle +=window.transition.duration+"s;transition-delay:"+window.transition.delay;
                            break;
                        case 1:
                        case 3:
                            return ';';
                    }
                    timeStyle+="s;transition-timing-function:ease-in-out;transition-property:all;";
                    return timeStyle;
                }
                $(dom)[0].setAttribute("style",";transform:"+firstMatrix3d+";"+transition(1));
                setTimeout(function(){
                    $(dom)[0].setAttribute("style",";transform:"+secondMatrix3d+";"+transition(2));
                    setTimeout(function(){
                        $(dom)[0].setAttribute("style",";transform:"+finalMatrix3d+";"+transition(3));
                    },window.transition.duration*1200);
                },window.transition.delay*1000);
            });

            //数组arr 存储的信息做相应调换，
            circleObjArray(calculateCubes(axis, layer, true), axis,  dir);
            if(typeof flag == 'boolean'){
                VARS.stepsAlreadyMoved.steps[VARS.stepsAlreadyMoved.steps.length] = [axis, layer, dir, flag?true:false];
            }
            VARS.move_Angle.allReset();

        }
        function turnPerspective(cubeRotate){
            if(typeof cubeRotate == 'undefined'){
                cubeRotate  =   VARS.move_Angle.angle;
            }
            var axis_X_Angle    =   VARS.axises_Angle.X;
            var axis_Y_Angle    =   VARS.axises_Angle.Y;
            var axis_Z_Angle    =   VARS.axises_Angle.Z;
            var returnNo    =   whichAxisShouldBeRotated(cubeRotate, axis_X_Angle, axis_Y_Angle, axis_Z_Angle);
            var axisToRotate=returnNo==1?"X":(returnNo==2?"Y":"Z");
            var dirToRotate =   getDirSign(cubeRotate, returnNo==1?axis_Y_Angle:(returnNo==2?axis_Z_Angle:axis_X_Angle));
            turn( true, axisToRotate, -1, dirToRotate );
            turn( true, axisToRotate,  0, dirToRotate );
            turn( true, axisToRotate,  1, dirToRotate );
            VARS.move_Angle.allReset();


            function getDirSign(moveAngle, thirdAxisAngle){
                var angle   =    Math.abs(moveAngle-thirdAxisAngle);
                return  Math.min(360-angle, angle)>90?1:-1;
            }
            function whichAxisShouldBeRotated(angle, angle1_, angle2_, angle3_){
                function includedAngle(angle1, angle2){
                    return Math.abs(90- Math.min(Math.abs(angle1-angle2), 360- Math.abs(angle1-angle2)));
                }
                var array   =   [includedAngle(angle,angle1_), includedAngle(angle,angle2_), includedAngle(angle, angle3_)];
                return  1+(array[(array[0]<array[1]?0:1)]<array[2]?(array[0]<array[1]?0:1):2);
            }
        }
        function turnBackOneStep(){
            var len =VARS.stepsAlreadyMoved.steps.length;
            if(len<=0){
                console.log("Already Turned Back To The First Step!");
                return;
            }

            turn(null, VARS.stepsAlreadyMoved.steps[len-1][0], VARS.stepsAlreadyMoved.steps[len-1][1], (VARS.stepsAlreadyMoved.steps[len-1][2]>0?-1:1) );
            if(VARS.stepsAlreadyMoved.steps[len-1][3]==true){
                turn(null, VARS.stepsAlreadyMoved.steps[len-2][0], VARS.stepsAlreadyMoved.steps[len-2][1], (VARS.stepsAlreadyMoved.steps[len-2][2]>0?-1:1) );
                turn(null, VARS.stepsAlreadyMoved.steps[len-3][0], VARS.stepsAlreadyMoved.steps[len-3][1], (VARS.stepsAlreadyMoved.steps[len-3][2]>0?-1:1) );
                VARS.stepsAlreadyMoved.steps.length -= 3;
            }
            else{
                VARS.stepsAlreadyMoved.steps.length -= 1;
            }
            VARS.stepsAlreadyMoved.thumbSteps -= 1;
        }
        function allTurnBack(){
            var len = VARS.stepsAlreadyMoved.thumbSteps;
            if(len<1)
                return;
            for(var i=0; i<len; i++){
                (function(i){
                    setTimeout( turnBackOneStep, window.transition.sumDelay*i*1000);
                })(i);
            }
        }
        function randomTurn(){
            var count = Math.random()*10+8;
            for(var i=0; i<count; i++){
                (function(i){
                    setTimeout( function(){
                        if(Math.random()*100>80){
                            turnPerspective(Math.random()*360);
                        }
                        else{
                            var axises  = ["X", "Y", "Z"];
                            turn(false, axises[Math.floor(Math.random()*3)], Math.round(Math.random()*2-1), Math.random()*2>1?1:-1);
                        }
                        VARS.stepsAlreadyMoved.thumbSteps+=1;
                    }, window.transition.sumDelay*i*1000);
                })(i);
            }
        }
        this.turn               =   turn;
        this.turnPerspective    =   turnPerspective;
        this.turnBackOneStep    =   turnBackOneStep;
        this.allTurnBack        =   allTurnBack;
        this.randomTurn         =   randomTurn;

        Object.defineProperties(window, {
            turn                    : {enumerable:true,writable:true,configurable:true},
            turnPerspective         : {enumerable:true,writable:true,configurable:true},
            turnBackOneStep         : {enumerable:true,writable:true,configurable:true},
            allTurnBack             : {enumerable:true,writable:true,configurable:true},
            randomTurn              : {enumerable:true,writable:true,configurable:true}
        });

        this.activateInteract   =   function (){
            window.turn               =   turn;
            window.turnPerspective    =   turnPerspective;
            window.turnBackOneStep    =   turnBackOneStep;
            window.allTurnBack        =   allTurnBack;
            window.randomTurn         =   randomTurn;
            console.log("activateAPI:");
        };

        this.freezeInteract    =    function (){
                delete window.turn;
                delete window.turnPerspective;
                delete window.turnBackOneStep;
                delete window.allTurnBack    ;
                delete window.randomTurn     ;
                console.log("FreezeAPI!");
        };
        //(activateInteract()());

       //Object.defineProperties(this,{
       //    turn                        :   {enumerable:true,writable:false,configurable:false},
       //    turnPerspective             :   {enumerable:true,writable:false,configurable:false},
       //    turnBackOneStep             :   {enumerable:true,writable:false,configurable:false},
       //    allTurnBack                 :   {enumerable:true,writable:false,configurable:false},
       //    randomTurn                  :   {enumerable:true,writable:false,configurable:false},
       //    freezeInteract              :   {enumerable:true,writable:false,configurable:false},
       //    activateInteract            :   {enumerable:true,writable:false,configurable:false}
       //});
    })();
    (function (){
        this.Matrix  =   {
            matrix_Dif                  :   function (matrix1, matrix2){
                var array = [];
                if(!(matrix1[0] instanceof Array)){
                    for(var i=0; i<matrix1.length; i++){
                        array[i] = matrix2[i] - matrix1[i];
                    }
                    return array;
                }
                else{
                    for(i=0; i<matrix1.length; i++){
                        array[i] = [];
                        for(var j=0; j<matrix1[i].length; j++){
                            matrix1[i][j] = matrix2[i][j] - matrix1[i][j];
                        }
                    }
                    return array;
                }
            },
            isRegularMatrix             :   function (matrix, rows, columns){
                if(matrix instanceof Array && matrix.length==rows && matrix[0].length==columns){
                    for(var row=0; row<rows; row++){
                        if(!(matrix[row] instanceof Array && matrix[row].length==columns))
                            return false;
                        for(var column=0; column<columns; column++){
                            if(matrix[row][column] instanceof Array || typeof matrix[row][column] !='number'){
                                return false;
                            }
                        }
                    }
                    return true;
                }
                else{
                    return false;
                }
            },
            transposeMatrix             :   function (matrix){
                if(!(matrix[0] instanceof Array)){
                    matrix = [matrix];
                }
                if(!(matrix instanceof Array)){
                    console.log("所给的数据不是一个矩阵,不可以进行转置！");
                    return;
                }
                var width  = matrix.length;
                var height = matrix[0].length;
                var array  = [];

                for(var n=0; n<height; n++){
                    array[n] = [];
                }
                for(var i=0; i<width; i++){
                    for(var j=0; j<height; j++){
                        array[j][i] = matrix[i][j];
                    }
                }
                return (array);
            },
            getThumbedRotateMatrix      :   function (array, rows, columns, row, column){

                if(Matrix.isRegularMatrix(array, rows, columns)){

                    if(row==undefined&&column==undefined){
                        row = rows-1;
                        column = columns-1;
                    }
                    var thumbedMatrix = [];
                    var height = array.length;
                    var width  = array[0].length;
                    for(var i=0; i<height; i++){
                        if(i!=row){
                            thumbedMatrix.push([]);
                            for(var j=0; j<width; j++){
                                if(j!=column){
                                    thumbedMatrix[thumbedMatrix.length-1].push(array[i][j]);
                                }
                            }
                        }
                    }
                    return thumbedMatrix;
                }
                else{
                    throw "Matrix given can not be thumbed!";
                }
            },
            getInverseMatrix            :   function (matrix){
                if(Matrix.getDeterminantValueOfMatrix(matrix)==0){
                    return "Matrix given is not a Inversible Matrix!"
                }

            },
            getDeterminantValueOfMatrix :   function (matrix){

                if( typeof matrix == 'number' ){
                    return matrix;
                }

                if(!( matrix instanceof Array )){
                    alert( "也是醉了，您给的参数无论如何都不可以看做矩阵！");
                    return NaN;
                }
                if(typeof matrix[0] == 'number'){
                    if(matrix.length!=1){
                        alert("所给的矩阵不可以进行行列式计算，不是方阵！");
                        return NaN;
                    }
                    else
                        return matrix[0];
                }
                if( matrix[0] instanceof Array){
                    if(matrix.length!=matrix[0].length){
                        alert("所给的矩阵不可以进行行列式计算，不是方阵！");
                        return NaN;
                    }
                }

                if( matrix[0].length==1 ){
                    return matrix[0][0];
                }
                else{
                    var value = 0;
                    for(var i=0; i<matrix.length; i++){
                        value += (i%2==0?1:-1)*matrix[0][i]*Matrix.getDeterminantValueOfMatrix(Matrix.getAlgebraicComplementOfMatrix_Row_Column(matrix, 0, i))
                    }
                }
                return value;
            },
            getAlgebraicComplementOfMatrix_Row_Column
                :   function (matrix, row, column){
                if(matrix[row][column]==0){
                    return 0;
                }
                var len = matrix[0].length;

                var array = [[]];
                for(var count=0; count<len-1; count++){
                    array[count] =[];
                }

                count=0;

                for(var i=0; i<len; i++){
                    if(i==row)
                        continue;
                    for(var j=0; j<len; j++){
                        if(j==column){
                            continue;
                        }
                        array[count].push(matrix[i][j]);
                    }
                    count++;
                }
                return array;
            },
            matrixMultiplicate          :   function (matrix1, matrix2){
                    var rightMatrixHeight   = matrix1.length;
                    var leftMatrixWidth     = matrix2[0].length;

                    var rightMatrixWidth    = matrix1[0].length;
                    var leftMatrixHeight    = matrix2.length;

                if(!(leftMatrixWidth==rightMatrixHeight)){
                    throw ("矩阵相乘时，宽高不匹配！");
                }
                var array = [];
                for(var i=0; i<leftMatrixHeight; i++){
                    array[i] = [];
                }
                for(var h=0; h<leftMatrixHeight; h++){
                    for(var w=0; w<rightMatrixWidth; w++){
                        array[h][w]=Matrix.rowTimesColumnOnce( Matrix.matrixRow(matrix2, h),Matrix.matrixColumn(matrix1, w));
                    }
                }
                return array;
            },
            rowTimesColumnOnce          :   function (arr1, arr2){
                if(!(arr2 instanceof  Array && arr1 instanceof  Array && arr1.length==arr2.length))
                    return ("矩阵单行单列相乘时，长度不匹配！");
                var value = 0;
                for(var i=0; i<arr1.length; i++){
                    value += arr1[i]*arr2[i];
                }
                return value;
            },
            matrixRow                   :   function (arr_, nth){
                if(arr_ instanceof Array && !(arr_[nth] instanceof Array) && nth==0){
                    return arr_;
                }
                else
                if(!(arr_[nth] instanceof Array)){
                    return "Wrong argument given in for function matrixRow!";
                }

                var array = [];
                var len = arr_[nth].length;
                for(var i=0; i<len; i++){
                    array[i]=arr_[nth][i];
                }
                return array;
            },
            matrixColumn                :   function (arr_, nth){
                if(arr_ instanceof Array &&!(arr_[nth] instanceof Array) && nth>=0 &&nth<arr_.length){
                    return [arr_[nth]];
                }
                else
                if(!(arr_[nth] instanceof Array)){
                    return "Wrong argument given in for function matrixRow!";
                }
                var array = [];
                var len = arr_.length;
                for(var i=0; i<len; i++){
                    array[i]=arr_[i][nth];
                }
                return array;},
            matrixRotateAxis            :   function (axis, dir){

                if(!(axis=="X"||axis=="x"||axis=="Y"||axis=="y"||axis=="Z"||axis=="z")){
                    throw ("Arguments Error: When Function 'matrixRotateAxis()' was called, the first argument must be 'x', 'y' or 'z'!\n");
                }
                if(dir!=1&&dir!=-1){
                    throw ("Arguments Error: When Function 'matrixRotateAxis()' was called, the second argument must be 1 or -1!\n");
                }
                switch (axis){
                    case "X":
                    case "x":
                        return dir==1?[[1,0,0,0],[0,0,-1,0],[0,1,0,0],[0,0,0,1]]:[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
                    case "Y":
                    case "y":
                        return dir==1?[[0,0,1,0],[0,1,0,0],[-1,0,0,0],[0,0,0,1]]:[[0,0,-1,0],[0,1,0,0],[1,0,0,0],[0,0,0,1]];
                    case "Z":
                    case "z":
                        return dir==1?[[0,-1,0,0],[1,0,0,0],[0,0,1,0],[0,0,0,1]]:[[0,1,0,0],[-1,0,0,0],[0,0,1,0],[0,0,0,1]];
                }
            },
            getAngleFromMatrix3D        :   function (matrix3d, axis){
                if(Matrix.isRegularMatrix(matrix3d, 4, 4)){
                    var tempMatrix = Matrix.getThumbedRotateMatrix(matrix3d, 4, 4, 3, 3);
                    console.log(tempMatrix);
                    if(axis=="X"||axis=="x"){
                        tempMatrix = Matrix.getThumbedRotateMatrix(tempMatrix, 3, 3, 0, 0);
                    }
                    else
                    if(axis=="Y"||axis=='y'){

                        tempMatrix = Matrix.getThumbedRotateMatrix(tempMatrix, 3, 3, 1, 1);
                    }
                    else
                    if(axis=="Z"||axis=="z"){

                        tempMatrix = Matrix.getThumbedRotateMatrix(tempMatrix, 3, 3, 2, 2);
                    }
                    else{
                        throw "Argument Error: axis invalid!"
                    }
                    console.log(tempMatrix);
                }
                else{
                    throw "Argument Error: not a Matrix with 4 rows and 4 columns!"
                }
            },
            getMatrix3DFromAngles_WithAxis
                :   function (axis, angle){
                var sin = Math.sin;
                var cos = Math.cos;
                angle   =   angle*Math.PI/180;
                if(axis=='x'||axis=='X'){
                    return [
                        [    1,         0,            0,    0],
                        [    0,cos(angle),  -sin(angle),    0],
                        [    0,sin(angle),   cos(angle),    0],
                        [    0,         0,            0,    1]
                    ];
                }
                if(axis=='y'||axis=='Y'){
                    return [
                        [  cos(angle),   0,  sin(angle),    0],
                        [           0,   1,           0,    0],
                        [ -sin(angle),   0,  cos(angle),    0],
                        [           0,   0,           0,    1]
                    ];
                }
                if(axis=='z'||axis=='Z'){
                    return [
                        [cos(angle),  -sin(angle),    0,    0],
                        [sin(angle),   cos(angle),    0,    0],
                        [         0,            0,    1,    0],
                        [         0,            0,    0,    1]
                    ];
                }

            },
            getMatrix3DFromAngles_WithAxises
                :   function (x, y, z){
                var func = Matrix.matrixMultiplicate;
                var sub  = Matrix.getMatrix3DFromAngles_WithAxis;
                return func(func(sub("x",x),sub("y",y)),sub("z",z));
            },
            getTrueMatrix3D_WithOffSet  :   function (alpha, beta, gamma, offsetX, offsetY, offsetZ){
                var m  =   Matrix.getMatrix3DFromAngles_WithAxises(alpha, beta, gamma);
                return [
                    [m[0][0], m[0][1], m[0][2], offsetX],
                    [m[1][0], m[1][1], m[2][2], offsetY],
                    [m[2][0], m[2][1], m[2][2], offsetZ],
                    [      0,       0,       0,       1]
                ];
            }
        };
        Object.freeze(this.Matrix);
    })();
    function readyJS(){
        (function initialAxisesVector(){
            var core_pos    =    $(".core").offset()            ;
            var X_pos       =    $(".center_square_4").offset() ;
            var Y_pos       =    $(".center_square_3").offset() ;
            var Z_pos       =    $(".center_square_1").offset() ;
            VARS.axises_Angle.X  =    getAngle_From_Point1_To_Point2(core_pos, X_pos);
            VARS.axises_Angle.Y  =    getAngle_From_Point1_To_Point2(core_pos, Y_pos);
            VARS.axises_Angle.Z  =    getAngle_From_Point1_To_Point2(core_pos, Z_pos);
        })();
        (function addListeners(){
            $(".cube").children().bind(
                {
                    mousedown:function(event){
                        VARS.from_to[0] = $(this).data("which");
                        VARS.move_Angle.start = [event.pageX, event.pageY ];
                    },
                    mouseup:function(event){
                        VARS.from_to[1] = $(this).data("which");
                        VARS.move_Angle.end = [event.pageX, event.pageY ];
                        if(typeof VARS.move_Angle.start!="undefined"){
                            window.turn();
                            VARS.stepsAlreadyMoved.thumbSteps +=1;
                        }
                        else{
                            VARS.move_Angle.allReset();
                        }
                    }
                }
            );
            $("#background").bind(
                {
                    mousedown:function(event){
                        VARS.move_Angle.start = [event.pageX, event.pageY ];
                    },
                    mouseup:function(event){
                        VARS.move_Angle.end = [event.pageX, event.pageY ];
                        if(VARS.move_Angle.end[0]==VARS.move_Angle.start[0]&&VARS.move_Angle.end[1]==VARS.move_Angle.start[1])
                            return;
                        if(typeof VARS.move_Angle.start!="undefined"){
                            window.turnPerspective();
                            VARS.stepsAlreadyMoved.thumbSteps +=1;
                        }
                        else{
                            VARS.move_Angle.allReset();
                        }


                    }
                });
        })();
    }
    $(document).ready(function(){
        readyJS();
    });
})();