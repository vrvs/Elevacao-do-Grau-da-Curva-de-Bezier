/* *****************************************************************************
Projeto de Processamento Grafico
Alunos: Jônatas de Oliveira Clementino e Valdemiro Rosa Vieira Santos
********************************************************************************/

var points = [];
var polygon = [];
var c_points = [];
var c_polygon = [];
var t = 500;
var points_visible = true;
var polygon_visible = true;
var curve_visible = true;
var polygon_color ='black';
var points_color = 'blue';
var curve_color = '#00FF00';
var polygon_size = 2;
var points_size = 6;
var curve_size = 3;


function deCasteljau(){
	var aux = [];
	var aux2 = [];
	var point;
	for(var i = 0; i<=t; i++){

		//igualando aux a points, sem ser circulos
		for(var j = 0; j<points.length;j++){
			aux.push(new Point(points[j].attr('x'), points[j].attr('y')));
		}

		while(aux.length > 1){
			for(var k = 0; k<aux.length-1;k++){
				point = interpolate(aux[k], aux[k+1], i/t);
				aux2.push(point);
			}
			aux = aux2;
			aux2 = [];
		}
		c_points.push(aux[0]);
	}
	c_polygon = makePath(c_points, curve_color, curve_size);
}

//https://www.cs.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/Bezier/bezier-elev.html
//{P0, P1, ..., Pn} -> {Q0, Q1, ..., Qn, Qn+1}
function elevate(){
	if(points.length > 1){
		var x = 0, y = 0;
		var n = (points.length-1);
		var aux = [];
		//Q0 = P0
		aux.push(points[0]);

		for(var i = 1; i < points.length; i++){

			x = ((i/(n+1))*points[i-1].attr('x')) + ((1 - (i/(n+1)))*points[i].attr('x'));
			y = ((i/(n+1))*points[i-1].attr('y')) + ((1 - (i/(n+1)))*points[i].attr('y'));
			var point = new Circle(x, y, points_size).attr('fillColor', points_color);
			
			makePointOperate(point);

			aux.push(point);
		}

		//Qn+1 = Pn
		aux.push(points[n]);
		points = aux;
	}
}

function interpolate(p1, p2, t){
	var point = new Point((((1-t)*p1.x) + (t*p2.x)), (((1-t)*p1.y) + (t*p2.y)));
	return point;
}

function makePath(points, color, stroke_size){
	var aux = [];
	var x1 = 0, x2 = 0;
	var y1 = 0, y2 = 0;

	for(var i = 0; i < points.length-1; i++){
		//se for instância de Circle
		if(points[i] instanceof Circle){
			x1 = points[i].attr('x');
			y1 = points[i].attr('y');
			x2 = points[i+1].attr('x');
			y2 = points[i+1].attr('y');			
		}
		//se for instância de Point
		else{
			x1 = points[i].x;
			y1 = points[i].y;
			x2 = points[i+1].x;
			y2 = points[i+1].y;
		}
		aux.push(new Path([['moveTo', x1, y1],
			 					['lineTo', x2, y2]
			 					]).stroke(color, stroke_size));
	}
	return aux;
}

function draw(){
	var stageObjects = [];
	if(curve_visible){
		c_polygon.forEach(function(path){
			stageObjects.push(path);
		});
	}
	if(polygon_visible){
		polygon.forEach(function(path){
			stageObjects.push(path);
		});
	}
	if(points_visible){
		points.forEach(function(circle){
			stageObjects.push(circle);
		});
	}
	stage.children(stageObjects);
}

function existedPoint(p){
	for(var i = 0; i<points.length;i++){
		if(p.target == points[i])
			return true;
	}
	return false;
}

function makePointOperate(point){
	point.on('drag', function(p){
			this.attr({x: p.x, y: p.y});
		});

		point.on('doubleclick', function(p){
			var aux = [];
			for(var i = 0; i<points.length;i++){
				if(p.target != points[i])
					aux.push(points[i]);
			}
			points = aux;
			polygon = [];
			c_polygon = [];
			c_points = [];
			if(points.length > 2)
				polygon = makePath(points, polygon_color, polygon_size);

			deCasteljau();
			draw();
		});
}

stage.on('click', function(p) {
	c_polygon = [];
	c_points = [];

	if(!existedPoint(p)){
		point = new Circle(p.x, p.y, points_size).attr('fillColor', points_color);
		points.push(point);
		makePointOperate(point);
		
	}
	if(points.length > 2)
		polygon = makePath(points, polygon_color, polygon_size);

	deCasteljau();
	draw();
});

stage.on('message:elevateDegree', function(data){

	elevate();
	polygon = [];
	c_polygon = [];
	c_points = [];

	polygon = makePath(points, polygon_color, polygon_size);
	deCasteljau();
	draw();

});

stage.on('message:deleteCurve', function(data){
	points = [];
	polygon = [];
	c_polygon = [];
	c_points = [];
	draw();
});

stage.on('message:receiveEvaluationNumber', function(data){
	t = data.data;
	c_polygon = [];
	c_points = [];
	deCasteljau();
	draw();
});

stage.on('message:receiveControlPoints', function(data){
	points_visible = data.data;
	draw();
});

stage.on('message:receiveControlPolygon', function(data){
	polygon_visible = data.data;
	draw();
});

stage.on('message:receiveCurvePoints', function(data){
	curve_visible = data.data;
	draw();
});
