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
	Print() {
		var cmd = '';
		cmd += '\\begin{vmatrix} ';
		cmd += this.a+' & '+this.b+' \\\\ ';
		cmd += this.c+' & '+this.d;
		cmd += '\\end{vmatrix}';
		return cmd;
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
function VectorLength(v) {
	var len2 = VectorSkalar(v,v);
	var len = Math.sqrt(len2)
	if(len == Math.round(len)) {
		return String(len);
	}
	return '\\sqrt{'+String(len2)+'}';
}
function SumGenerator(max,count) {
	var cmd = 'Вычислите матрицу.\n';
	cmd += '<ol>\n';
	for(var i = 0; i<count; i++) {
		var n = Math.round(Math.random()*max/2)+1;
		var m = Math.round(Math.random()*max/2)+1;
		var mat1 = RandMatrix(max/2);
		var mat2 = RandMatrix(max/2);
		var ans;
		var randomsign = RandSign();
		var mat11;
		var mat22;
		mat11 = VectorMul(n,mat1);
		mat22 = VectorMul(m,mat2);
		if(n==1) {
			n = '';
		}
		else {
			n = String(n)+'\\cdot ';
		}
		if(m==1) {
			m = '';
		}
		else {
			m = String(m)+'\\cdot ';
		}
		cmd += Li(i);
		cmd += '\\(~~~';
		cmd += n
		cmd += mat1.Print();
		cmd += randomsign;
		cmd += m;
		cmd += mat2.Print();
		cmd += '=';
		if(randomsign == '+') {
			ans = VectorSum(mat11,mat22);
		}
		else {
			ans = VectorSub(mat11,mat22);
		}
		cmd += '\\)';
		cmd += Li_(i,ans.Print());
	}
	cmd += '</ol>';
	return cmd;
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
function PlaneGenerator1(max,count) {
	var cmd = 'Составьте уравнение плоскости \\(\\mu\\), если ';
	cmd += '\\(M \\in \\mu \\perp \\overrightarrow{n}\\).';
	cmd += '<ol>\n';
	for(var i = 0; i<count; i++) {
		var M = RandMatrix(max);
		var n = RandMatrix(max);
		cmd += Li(i);
		cmd += '\\( M = ';
		cmd += M.Print();
		cmd += ',~~\\overrightarrow{n} = ';
		cmd += n.Print();
		cmd += '\\)';
		M = VectorSub(new Vector(0,0,0),M);
		var ans = ',~~~~\\mu:~~~'+String(n.x)+'(x'+Write(M.x,0)+')';
		ans += Write(n.y,0)+'(y'+Write(M.y,0)+')';
		ans += Write(n.z,0)+'(z'+Write(M.z,0)+')=0';
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function LineGenerator(max,count) {
	var cmd = 'Составьте уравнения прямой \\(m\\), если ';
	cmd += '\\(M \\in m \\parallel \\overrightarrow{n}\\).';
	cmd += '<ol>\n';
	for(var i = 0; i<count; i++) {
		var M = RandMatrix(max);
		var n = RandMatrix(max);
		cmd += Li(i);
		cmd += '\\( M = ';
		cmd += M.Print();
		cmd += ',~~\\overrightarrow{n} = ';
		cmd += n.Print();
		cmd += '\\)';
		M = VectorSub(new Vector(0,0,0),M);
		var ans = ',~~~~m:~~~\\displaystyle ';
		ans += '\\frac{x'+Write(M.x,0)+'}{'+String(n.x)+'}=';
		ans += '\\frac{y'+Write(M.y,0)+'}{'+String(n.y)+'}=';
		ans += '\\frac{z'+Write(M.z,0)+'}{'+String(n.z)+'}';
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function PlaneGenerator2(max,count) {
	var cmd = 'Составьте уравнение плоскости \\(\\mu\\), если ';
	cmd += '\\(M \\in \\mu \\parallel \\overrightarrow{m},\\overrightarrow{n}\\).';
	cmd += '<ol>\n';
	for(var i = 0; i<count; i++) {
		var M = RandMatrix(max);
		var m = RandMatrix(max);
		var n = RandMatrix(max);
		cmd += Li(i);
		cmd += '\\( M = ';
		cmd += M.Print();
		cmd += ',~~\\overrightarrow{m} = ';
		cmd += m.Print();
		cmd += ',~~\\overrightarrow{n} = ';
		cmd += n.Print();
		cmd += '\\)';
		M = VectorSub(new Vector(0,0,0),M);
		var ans = ',~~~~\\mu:~~~\\begin{vmatrix} ';
		ans += 'x'+Write(M.x,0)+' & '+String(m.x)+' & '+String(n.x)+'\\\\';
		ans += 'y'+Write(M.y,0)+' & '+String(m.y)+' & '+String(n.y)+'\\\\';
		ans += 'z'+Write(M.z,0)+' & '+String(m.z)+' & '+String(n.z);
		ans += '\\end{vmatrix} = 0';
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function Li(i) {
	var cmd = '';
	cmd += '<li style=\'font-size:30\'><a href=\"javascript:Ans(\'ans';
	cmd += String(i);
	cmd += '\')\">\n';
	return cmd;
}
function Det2Generator(max,count) {
	var cmd = 'Вычислите определитель матрицы \\(2 \\times 2\\).\n';
	cmd += '<ol>\n';
	for(var i = 0; i<count; i++) {
		cmd += Li(i);
		cmd += '\\(';
		a = String(Math.round(Math.random()*2*max)-max);
		b = String(Math.round(Math.random()*2*max)-max);
		c = String(Math.round(Math.random()*2*max)-max);
		d = String(Math.round(Math.random()*2*max)-max);
		var ans = a*d-b*c;
		cmd += '\\begin{vmatrix}'+a+' & '+b+'\\\\'+c+' & '+d+'\\end{vmatrix}';
		cmd += '=';
		cmd += '\\)';
		cmd += Li_(i,String(ans));
	}
	cmd += '</ol>';
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
function Det3Generator(max,count) {
	var cmd = 'Вычислите определитель матрицы \\(3 \\times 3\\).\n';
	cmd += '<ol>\n';
	for(var i = 0; i<count; i++) {
		cmd += Li(i);
		cmd += '\\(';
		a = 'x'+Write(String(Math.round(Math.random()*2*max)-max));
		b = String(Math.round(Math.random()*2*max)-max);
		c = String(Math.round(Math.random()*2*max)-max);
		d = 'y'+Write(String(Math.round(Math.random()*2*max)-max));
		e = String(Math.round(Math.random()*2*max)-max);
		f = String(Math.round(Math.random()*2*max)-max);
		g = 'z'+Write(String(Math.round(Math.random()*2*max)-max));
		h = String(Math.round(Math.random()*2*max)-max);
		i1 = String(Math.round(Math.random()*2*max)-max);
		cmd += ('\\begin{vmatrix}'+a+' & '+b+' & '+c+'\\\\');
		cmd += (d+' & '+e+' & '+f+'\\\\');
		cmd += (g+' & '+h+' & '+i1+'\\end{vmatrix}');
		cmd += '=';
		cmd += '\\)';
		a = Brackets(a);
		d = Brackets(d);
		g = Brackets(g);
		var ans = new Det2(e,f,h,i1).Print()+'\\cdot '+a+'-'+ new Det2(b,c,h,i1).Print()+'\\cdot '+d+'+'+new Det2(b,c,e,f).Print()+'\\cdot '+g;
		cmd += Li_(i,ans);
	}
	
	cmd += '</ol>';
	return cmd;
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
function AngleGenerator(max,count) {
	var cmd = 'Найдите \\(\\alpha =\\angle\\left(\\overrightarrow{m},\\overrightarrow{n}\\right)\\).';
	cmd += '<ol>\n';
	for(var i = 0; i<count; i++) {
		var m = new Vector(0,0,0);
		var n = new Vector(0,0,0);
		while((m.x==0)&&(n.x==0)&&(m.y==0)&&(n.y==0)&&(n.z==0)&&(m.z==0)) {
			m = RandMatrix(max/2);
			n = RandMatrix(max/2);
		}
		cmd += Li(i);
		cmd += '\\(';
		cmd += '~~~\\overrightarrow{m} = ';
		cmd += m.Print();
		cmd += ',~~\\overrightarrow{n} = ';
		cmd += n.Print();
		cmd += '\\)';
		var up = Math.abs(VectorSkalar(m,n));
		var down2 = n.len2*m.len2;
		var ans = ',~~~\\displaystyle \\cos{\\alpha}= '+SqrDown(up,down2);
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
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
		var d = NOD(up,max);
		up /= d;
		max /= d;
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
function PointGenerator(max,count) {
	var cmd = 'Составить уравнение для точек \\(X,~M,~N\\), если \\(X \\in MN\\).';
	cmd += '<ol>\n';
	for(var i = 0; i<count; i++) { console.log(i);
		var m = Math.round(Math.random()*max)+1;
		var n = Math.round(Math.random()*max)+1;
		cmd += Li(i);
		cmd += '\\(';
		cmd += '~~~MX:XN = ';
		cmd += String(m)+' : ';
		cmd += String(n)+'~~\\Rightarrow';
		cmd += '\\)';
		var ans = '~~~X =\\displaystyle \\frac{1}{'+String(m+n)+'}\\cdot ';
		ans += '\\left('+String(n)+'\\cdot M'+Write(m)+'\\cdot N\\right)'
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function Generate(max,count) {
	var list = document.getElementById('checklist');
	document.getElementById('tasks').innerHTML = 'Задачи:';
	if(list.selectedIndex==0) {
		document.getElementById('preview').innerHTML = SumGenerator(max,count);
	}
	if(list.selectedIndex==1) {
		document.getElementById('preview').innerHTML = Det2Generator(max,count);
	}
	if(list.selectedIndex==2) {
		document.getElementById('preview').innerHTML = Det3Generator(max,count);
	}
	if(list.selectedIndex==3) {
		document.getElementById('preview').innerHTML = PointGenerator(max,count);
	}
	if(list.selectedIndex==4) {
		document.getElementById('preview').innerHTML = AngleGenerator(max,count);
	}
	if(list.selectedIndex==5) {
		document.getElementById('preview').innerHTML = PlaneGenerator1(max,count);
	}
	if(list.selectedIndex==6) {
		document.getElementById('preview').innerHTML = PlaneGenerator2(max,count);
	}
	if(list.selectedIndex==7) {
		document.getElementById('preview').innerHTML = LineGenerator(max,count);
	}
}
Default();