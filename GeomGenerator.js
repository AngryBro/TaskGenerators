class Vector {
	constructor(x,y,z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.len2 = x*x + y*y + z*z;
	}
	Print() {
		var cmd = '\\begin{pmatrix} ';
		cmd += String(this.x)+' \\\\ '+String(this.y)+' \\\\ '+String(this.z);
		cmd += '\\end{pmatrix}';
		return cmd;
	}
}
class Det2 {
	constructor(a,b,c,d) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
	}
	Value() {
		return this.a*this.d - this.b*this.c;
	}
	Print() {
		var cmd = '';
		cmd += '\\begin{vmatrix} ';
		cmd += this.a+' & '+this.b+' \\\\ ';
		cmd += this.c+' & '+this.d;
		cmd += '\\end{vmatrix}';
		return cmd;
	}
}
class Det3 {
	constructor(v1,v2,v3) {
		this.m = [[v1.x,v2.x,v3.x],[v1.y,v2.y,v3.y],[v1.z,v2.z,v3.z]];
	}
	Minor(i,j) {
		var m1=[];
		for(var k = 0; k<3; k++) {
			for(var l = 0; l<3; l++) {
				if((k!=i)&&(l!=j)) {
					m1.push(this.m[k][l]);
				}
			}
		}
		return new Det2(m1[0],m1[1],m1[2],m1[3]).Value();
	}
	Print() {
		for(var k = 0; k<3; k++) {
			for(var l = 0; l<3; l++) {
				console.log(this.m[k][l]);
			}
		}
	}
}
function Default() {
	var min = 1;
	var max = 100;
	var count = document.getElementById('input');
	if(count.value<min) {
		count.value = min;
	}
	if(count.value>max) {
		count.value = max;
	}
}
function VectorSum(v1,v2) {
	return new Vector(v1.x+v2.x, v1.y+v2.y, v1.z+v2.z);
}
function VectorSub(v1,v2) {
	return new Vector(v1.x-v2.x, v1.y-v2.y, v1.z-v2.z);
}
function VectorMul(k,v) {
	return new Vector(k*v.x, k*v.y, k*v.z);
}
function VectorSkalar(v1,v2) {
	return v1.x*v2.x+v1.y*v2.y+v1.z*v2.z;
}
function Li_(i,ans) {
	cmd = '';
	cmd += '<text style="font-size:28" hidden id=\"ans'+String(i)+'\">\\(~';
	cmd += ans;
	cmd += '\\)</text>';
	cmd += '</a></li>';
	return cmd;
}
function Ans(ans) {
	if(document.getElementById(ans).hidden) {
		document.getElementById(ans).hidden = false;
	}
	else {
		document.getElementById(ans).hidden = true;
	}		
}
function Li(i) {
	var cmd = '';
	cmd += '<li style=\'font-size:30\'><a href=\"javascript:Ans(\'ans';
	cmd += String(i);
	cmd += '\')\">\n';
	return cmd;
}
function Write(x) {
	if(x>0) {
		return '+'+String(x);
	}
	if(x==0) {
		if(arguments.length>1) {
			return '-0';
		}
		return '';
	}
	return '-'+String(-x);
}
function Brackets(x) {
	if(x.length>1) {
		var cmd = '';
		cmd += '(';
		cmd += x;
		cmd += ')';
		return cmd;
	}
	return x;
}
function RandSign() {
	var temp = Math.round(Math.random());
	if(temp) {
		return '+';
	}
	return '-';
}
function RandMatrix(max) {
	var x = Math.round(Math.random()*max*2)-max;
	var y = Math.round(Math.random()*max*2)-max;
	var z = Math.round(Math.random()*max*2)-max;
	return new Vector(x,y,z);
}
function NOD(a,b) {
	var min;
	if(a<b) {
		min = a;
	}
	else {
		min = b;
	}
	for(var i = min; i>0; i--) {
		if((a%i==0)&&(b%i==0)) {
			return i;
		}
	}
	return 1;
}
function SqrDown(up,down2) {
	var max = '';
	for(i = 2;i*i<=down2; i++) {
		if(down2%(i*i)==0) {
			max = i;
		}
	}
	if(max!='') {
		down2 /= (max*max);
		if(max==1) {
			max = '';
		}
	}
	if(down2==1) {
		down2 = '';
	}
	else {
		down2 = '\\sqrt{'+String(down2)+'}';
	}
	if((down2=='')&&(max=='')) {
		return String(up);
	}
	if(up==0) {
		return String(0);
	}
	if(max!='') {
		var d = NOD(up,max);
		up /= d;
		max /= d;
		if(max==1) {
			max = '';
		}
	}
	return '\\displaystyle\\frac{'+String(up)+'}{'+String(max)+down2+'}';
}
function SqrtString(x) {
	var maxDel;
	for(var i = 1; i*i<=x; i++) {
		if(x%(i*i)==0) {
			maxDel = i;
		}
	}
	x /= (maxDel*maxDel);
	if(x==1) {
		return String(maxDel);
	}
	if(maxDel==1) {
		maxDel = '';
	}
	return String(maxDel)+'\\sqrt{'+String(x)+'}';
}
/*---------------------------------*/

function AnglePlanePlane(max,count) {
	var cmd = 'Найдите \\(\\angle((ABC),(DEF))\\).';
	cmd += '<ol>';
	for(var i = 0; i<count; i++) {
		var A = RandMatrix(max);
		var B = RandMatrix(max);
		var C = RandMatrix(max);
		var D = RandMatrix(max);
		var E = RandMatrix(max);
		var F = RandMatrix(max);
		var AB = VectorSub(B,A);
		var AC = VectorSub(C,A);
		var DE = VectorSub(E,D);
		var DF = VectorSub(F,D);
		var det3_1 = new Det3(new Vector(0,0,0),AB,AC);
		var n_1 = new Vector(det3_1.Minor(0,0),-det3_1.Minor(1,0),det3_1.Minor(2,0));
		var det3_2 = new Det3(new Vector(0,0,0),DE,DF);
		var n_2 = new Vector(det3_2.Minor(0,0),-det3_2.Minor(1,0),det3_2.Minor(2,0));
		var up = Math.abs(VectorSkalar(n_1,n_2));
		var down = n_1.len2*n_2.len2;
		var ans = ',~~~\\cos{\\angle((ABC),(DEF))}='+SqrDown(up,down);
		cmd += Li(i);
		cmd+='\\(A=';
		cmd += A.Print();
		cmd += ',~~~B=';
		cmd += B.Print();
		cmd += ',~~~C=';
		cmd += C.Print();
		cmd += ',';
		cmd += '\\)<br><br>\\(';
		cmd += 'D=';
		cmd += D.Print();
		cmd += ',~~~E=';
		cmd += E.Print();
		cmd += ',~~~F=';
		cmd += F.Print();
		cmd += '\\)';
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function AngleLinePlane(max,count) {
	var cmd = 'Найдите \\(\\angle(AB,(CDE))\\).';
	cmd += '<ol>';
	for(var i = 0; i<count; i++) {
		var A = RandMatrix(max);
		var B = RandMatrix(max);
		var C = RandMatrix(max);
		var D = RandMatrix(max);
		var E = RandMatrix(max);
		var AB = VectorSub(B,A);
		var CD = VectorSub(D,C);
		var CE = VectorSub(E,C);
		var det3 = new Det3(new Vector(0,0,0),CD,CE);
		var n = new Vector(det3.Minor(0,0),-det3.Minor(1,0),det3.Minor(2,0));
		var up = Math.abs(VectorSkalar(n,AB));
		var down = n.len2*AB.len2;
		var ans = ',~~~\\sin{\\angle(AB,(CDE))}='+SqrDown(up,down);
		cmd += Li(i);
		cmd+='\\(A=';
		cmd += A.Print();
		cmd += ',~~~B=';
		cmd += B.Print();
		cmd += ',~~~C=';
		cmd += C.Print();
		cmd += ',';
		cmd += '\\)<br><br>\\(';
		cmd += 'D=';
		cmd += D.Print();
		cmd += ',~~~E=';
		cmd += E.Print();
		cmd += '\\)';
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function AngleLineLine(max,count) {
	var cmd = 'Найдите \\(\\angle(AB,CD)\\).';
	cmd += '<ol>';
	for(var i = 0; i<count; i++) {
		var A = RandMatrix(max);
		var B = RandMatrix(max);
		var C = RandMatrix(max);
		var D = RandMatrix(max);
		var AB = VectorSub(B,A);
		var CD = VectorSub(D,C);
		var up = Math.abs(VectorSkalar(AB,CD));
		var down = AB.len2*CD.len2;
		var ans = ',~~~\\cos{\\angle(AB,CD)}='+SqrDown(up,down);
		cmd += Li(i);
		cmd+='\\(A=';
		cmd += A.Print();
		cmd += ',~~~B=';
		cmd += B.Print();
		cmd += ',~~~C=';
		cmd += C.Print();
		cmd += ',~~~D=';
		cmd += D.Print();
		cmd += '\\)';
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function DistLineLineP(max,count) {
	var cmd = 'Найдите \\(\\rho(AB,CD)\\).';
	cmd += '<ol>';
	for(var i = 0; i<count; i++) {
		var A = RandMatrix(max);
		var B = RandMatrix(max);
		var C = RandMatrix(max);
		var D;
		var AB = VectorSub(B,A);
		var CD = VectorMul(Math.round(Math.random()*max/2)-Math.round(max/2),AB);
		D = VectorSum(C,CD);
		var AC = VectorSub(C,A);
		var sqrup = AB.len2*AC.len2 - VectorSkalar(AB,AC)*VectorSkalar(AB,AC);
		var sqrdown = AB.len2;
		var d = NOD(sqrup,sqrdown);
		sqrup /= d;
		sqrdown /= d;
		var ans;
		if(sqrdown==1) {
			ans = SqrtString(sqrup);
		}
		else {
			ans = ',~~~\\rho(AB,CD)=\\displaystyle\\frac{'+SqrtString(sqrup)+'}{'+SqrtString(sqrdown)+'}';
		}
		cmd += Li(i);
		cmd+='\\(A=';
		cmd += A.Print();
		cmd += ',~~~B=';
		cmd += B.Print();
		cmd += ',~~~C=';
		cmd += C.Print();
		cmd += ',~~~D=';
		cmd += D.Print();
		cmd += '\\)';
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function DistLineLineNP(max,count) {
	var cmd = 'Найдите \\(\\rho(AB,CD)\\).';
	cmd += '<ol>';
	for(var i = 0; i<count; i++) {
		var A = RandMatrix(max);
		var B = RandMatrix(max);
		var C = RandMatrix(max);
		var D = RandMatrix(max);
		var AB = VectorSub(B,A);
		var CD = VectorSub(D,C);
		var det3 = new Det3(new Vector(0,0,0),AB,CD);
		var n = new Vector(det3.Minor(0,0),-det3.Minor(1,0),det3.Minor(2,0));
		var d = -n.x*B.x-n.y*B.y-n.z*B.z;
		var ans = ',~~~\\rho(AB,CD)='+SqrDown(Math.abs(n.x*C.x+n.y*C.y+n.z*C.z+d),n.len2);
		cmd += Li(i);
		cmd+='\\(A=';
		cmd += A.Print();
		cmd += ',~~~B=';
		cmd += B.Print();
		cmd += ',~~~C=';
		cmd += C.Print();
		cmd += ',~~~D=';
		cmd += D.Print();
		cmd += '\\)';
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function DistPointLine(max,count) {
	var cmd = 'Найдите \\(\\rho(A,BC)\\).';
	cmd += '<ol>';
	for(var i = 0; i<count; i++) {
		var A = RandMatrix(max);
		var B = RandMatrix(max);
		var C = RandMatrix(max);
		var AB = VectorSub(B,A);
		var CB = VectorSub(B,C);
		var sqrup = AB.len2*CB.len2 - VectorSkalar(AB,CB)*VectorSkalar(AB,CB);
		var sqrdown = CB.len2;
		var d = NOD(sqrup,sqrdown);
		sqrup /= d;
		sqrdown /= d;
		var ans;
		if(sqrdown==1) {
			ans = ',~~~\\rho(A,BC)='+SqrtString(sqrup);
		}
		else {
			ans = ',~~~\\rho(A,BC)=\\displaystyle\\frac{'+SqrtString(sqrup)+'}{'+SqrtString(sqrdown)+'}';
		}
		cmd += Li(i);
		cmd+='\\(A=';
		cmd += A.Print();
		cmd += ',~~~B=';
		cmd += B.Print();
		cmd += ',~~~C=';
		cmd += C.Print();
		cmd += '\\)';
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function DistPointPlane(max,count) {
	var cmd = 'Найдите \\(\\rho(A,(BCD))\\).';
	cmd += '<ol>';
	for(var i = 0; i<count; i++) {
		var A = RandMatrix(max);
		var B = RandMatrix(max);
		var C = RandMatrix(max);
		var D = RandMatrix(max);
		var BC = VectorSub(C,B);
		var BD = VectorSub(D,B);
		var det3 = new Det3(new Vector(0,0,0),BC,BD);
		var n = new Vector(det3.Minor(0,0),-det3.Minor(1,0),det3.Minor(2,0));
		var d = -n.x*B.x-n.y*B.y-n.z*B.z;
		var ans = ',~~~\\rho(A,(BCD))='+SqrDown(Math.abs(n.x*A.x+n.y*A.y+n.z*A.z+d),n.len2);
		cmd += Li(i);
		cmd+='\\(A=';
		cmd += A.Print();
		cmd += ',~~~B=';
		cmd += B.Print();
		cmd += ',~~~C=';
		cmd += C.Print();
		cmd += ',~~~D=';
		cmd += D.Print();
		cmd += '\\)';
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function DistPointPoint(max,count) {
	var cmd = 'Найдите \\(\\rho(A,B)\\).';
	cmd += '<ol>';
	for(var i = 0; i<count; i++) {
		var A = RandMatrix(max);
		var B = RandMatrix(max);
		var ans = ',~~~\\rho(A,B)='+SqrtString(VectorSub(B,A).len2);
		cmd += Li(i);
		cmd+='\\(A=';
		cmd += A.Print();
		cmd += ',~~~B=';
		cmd += B.Print();
		cmd += '\\)';
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function RandomTask(max,count) {
	var cmd = '<ol>';
	var types = ['all','alp','app','ddd','ddp','ddl','dll'];
	for(var i = 0; i<count; i++) {
		var rnd = Math.round(Math.random()*(types.length-1));
		var raw = Generate(max,1,types[rnd]);
		raw = raw.replace('<ol>','');
		raw = raw.replace('</ol>','');
		var splited = raw.split('.');
		var head = splited[0]+'.';
		var content = splited[1];
		content = content.replace('ans0','ans'+i);
		content = content.replace('ans0','ans'+i);
		splited = content.split('\n');
		cmd += splited[0]+head+'<br><br>'+splited[1];
	}
	cmd += '</ol>';
	return cmd;
}
function Generate(max,count,type) {
	document.getElementById('tasks').innerHTML = 'Задачи:';
	var types = ['all','alp','app','ddd','ddp','ddl','dll'];
	switch(type) {
		case types[0]: return AngleLineLine(max,count);
		case types[1]: return AngleLinePlane(max,count);
		case types[2]: return AnglePlanePlane(max,count);
		case types[3]: return DistPointPoint(max,count);
		case types[4]: return DistPointPlane(max,count);
		case types[5]: return DistPointLine(max,count);
		case types[6]: var rnd = Math.round(Math.random());
			if(rnd) {
				return DistLineLineP(max,count);
			}
			else {
				return DistLineLineNP(max,count);
			}
		case 'random': return RandomTask(max,count);
		default: return 'Непредвиденная ошибка';
	}
}
Default();