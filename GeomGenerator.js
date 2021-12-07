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
	Print() {
		var cmd = '';
		cmd += '\\begin{vmatrix} ';
		cmd += this.a+' & '+this.b+' \\\\ ';
		cmd += this.c+' & '+this.d;
		cmd += '\\end{vmatrix}';
		return cmd;
	}
	Minor(i,j) {
		var m=[];
		for(var k = 0; k<3; k++) {
			for(var l = 0; l<3; l++) {
				if((k!=i)&&(l!=j)) {
					m.push(this.m[i][j]);
				}
			}
		}
		return new Det2(m[0],m[1],m[2],m[3]).Value();
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
	cmd += '\n</a></li>\n';
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
	return '\\frac{'+String(up)+'}{'+String(max)+down2+'}';
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

function DistPointLine(max,count) {
	var cmd = 'Найдите \\(\\rho(A,BC)\\).\n';
	cmd += '<ol>\n';
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
			ans = SqrtString(sqrup);
		}
		else {
			ans = '\\displaystyle\\frac{'+SqrtString(sqrup)+'}{'+SqrtString(sqrdown)+'}';
		}
		cmd += Li(i);
		cmd+='\\(A=';
		cmd += A.Print();
		cmd += ',~~~B=';
		cmd += B.Print();
		cmd += ',~~~C=';
		cmd += C.Print();
		cmd += ',~~~\\rho(A,BC)=\\)';
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function DistPointPoint(max,count) {
	var cmd = 'Найдите \\(\\rho(A,B)\\).\n';
	cmd += '<ol>\n';
	for(var i = 0; i<count; i++) {
		var A = RandMatrix(max);
		var B = RandMatrix(max);
		var ans = SqrtString(VectorSub(B,A).len2);
		cmd += Li(i);
		cmd+='\\(A=';
		cmd += A.Print();
		cmd += ',~~~B=';
		cmd += B.Print();
		cmd += ',~~~\\rho(A,B)=\\)';
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function Generate(max,count) {
	var n = 'На стадии разработки';
	var list = document.getElementById('checklist');
	document.getElementById('tasks').innerHTML = 'Задачи:';
	if(list.selectedIndex==0) {
		document.getElementById('preview').innerHTML = n;
	}
	if(list.selectedIndex==1) {
		document.getElementById('preview').innerHTML = n;
	}
	if(list.selectedIndex==2) {
		document.getElementById('preview').innerHTML = n;
	}
	if(list.selectedIndex==3) {
		document.getElementById('preview').innerHTML = DistPointPoint(max,count);
	}
	if(list.selectedIndex==4) {
		document.getElementById('preview').innerHTML = DistPointLine(max,count);
	}
	if(list.selectedIndex==5) {
		document.getElementById('preview').innerHTML = n;
	}
	if(list.selectedIndex==6) {
		document.getElementById('preview').innerHTML = n;
	}
	if(list.selectedIndex==7) {
		document.getElementById('preview').innerHTML = n;
	}
	if(list.selectedIndex==8) {
		document.getElementById('preview').innerHTML = n;
	}
}
Default();