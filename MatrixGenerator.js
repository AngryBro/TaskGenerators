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
	Mult(k) {
		return new Vector(this.x*k,this.y*k,this.z*k);
	}
	Normalise() {
		var n = NOD(Math.abs(this.x),Math.abs(this.y));
		n = NOD(n,Math.abs(this.z));
		return new Vector(this.x/n,this.y/n,this.z/n);
	}
}
class Matrix3 {
	constructor(v1,v2,v3) {
		this.v1 = v1;
		this.v2 = v2;
		this.v3 = v3;
		var elems = [];
		for(var i = 0; i<3; i++) {
			elems.push([0,0,0]);
		}
		elems[0][0] = v1.x;
		elems[0][1] = v2.x;
		elems[0][2] = v3.x;
		elems[1][0] = v1.y;
		elems[1][1] = v2.y;
		elems[1][2] = v3.y;
		elems[2][0] = v1.z;
		elems[2][1] = v2.z;
		elems[2][2] = v3.z;
		this.elems = elems;
	}
	multVec(v) {
		var cords = [];
		for(var i = 0; i<3; i++) {
			var vec = new Vector(this.elems[i][0],
				this.elems[i][1],this.elems[i][2]);
			cords.push(VectorSkalar(vec,v));
		}
		return new Vector(cords[0],cords[1],cords[2]);
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
function Sqrt(number) {
	var maxdel = 1;
	if(Math.sqrt(number)==Math.round(Math.sqrt(number))) {
		return String(Math.sqrt(number));
	}
	for(var i = 2; i*i<number; i++) {
		if(number % (i*i) == 0) {
			maxdel = i;
		}
	}
	if(maxdel==1) {
		return '\\sqrt{'+number+'}';
	}
	return maxdel+'\\sqrt{'+number/(maxdel*maxdel)+'}';
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
function PlaneGenerator1(max,count) {
	var cmd = 'Составьте уравнение плоскости \\(\\alpha\\), если ';
	cmd += '\\(A \\in \\alpha \\perp \\overrightarrow{n}\\).';
	cmd += '<ol>';
	for(var i = 0; i<count; i++) {
		var M = RandMatrix(max);
		var n = RandMatrix(max);
		cmd += Li(i);
		cmd += '\\( A = ';
		cmd += M.Print();
		cmd += ',~~\\overrightarrow{n} = ';
		cmd += n.Print();
		cmd += '\\)';
		M = VectorSub(new Vector(0,0,0),M);
		n = n.Normalise();
		var ans = ',~~~~\\alpha:~~~'+n.x+'(x'+Write(M.x,0)+')';
		ans += Write(n.y,0)+'(y'+Write(M.y,0)+')';
		ans += Write(n.z,0)+'(z'+Write(M.z,0)+')=0';
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function LineGenerator(max,count) {
	var cmd = 'Составьте уравнения прямой \\(a\\), если ';
	cmd += '\\(A \\in a \\parallel \\overrightarrow{n}\\).';
	cmd += '<ol>';
	for(var i = 0; i<count; i++) {
		var M = RandMatrix(max);
		var n = new Vector(0,0,0); 
		while(JSON.stringify(n)==JSON.stringify(new Vector(0,0,0))) {
			n = RandMatrix(max);
		}
		cmd += Li(i);
		cmd += '\\( A = ';
		cmd += M.Print();
		cmd += ',~~\\overrightarrow{n} = ';
		cmd += n.Print();
		cmd += '\\)';
		n = n.Normalise();
		M = VectorSub(new Vector(0,0,0),M);
		var ans = ',~~~~a:~~~ ';
		if(n.x*n.y*n.z!=0) {
			ans += '\\displaystyle\\frac{x'+Write(M.x,0)+'}{'+String(n.x)+'}=';
			ans += '\\displaystyle\\frac{y'+Write(M.y,0)+'}{'+String(n.y)+'}=';
			ans += '\\displaystyle\\frac{z'+Write(M.z,0)+'}{'+String(n.z)+'}';
		}
		else {
			if(n.y*n.z!=0) {
				ans += '\\begin{cases}';
				ans += 'x = '+(-M.x)+'\\\\';
				ans += '\\displaystyle\\frac{y'+Write(M.y,0)+'}{'+String(n.y)+'}=';
				ans += '\\displaystyle\\frac{z'+Write(M.z,0)+'}{'+String(n.z)+'}';
				ans += '\\end{cases}';
			}
			else {
			if(n.x*n.z!=0) {
				ans += '\\begin{cases}';
				ans += 'y = '+(-M.y)+'\\\\';
				ans += '\\displaystyle\\frac{x'+Write(M.x,0)+'}{'+String(n.x)+'}=';
				ans += '\\displaystyle\\frac{z'+Write(M.z,0)+'}{'+String(n.z)+'}';
				ans += '\\end{cases}';
			}
			else {
			if(n.x*n.y!=0) {
				ans += '\\begin{cases}';
				ans += 'z = '+(-M.z)+'\\\\';
				ans += '\\displaystyle\\frac{x'+Write(M.x,0)+'}{'+String(n.x)+'}=';
				ans += '\\displaystyle\\frac{y'+Write(M.y,0)+'}{'+String(n.y)+'}';
				ans += '\\end{cases}';
			}
			else {
				if((n.x==0)&&(n.y==0)) {
					ans += '\\begin{cases}';
					ans += 'x = '+(-M.x)+'\\\\';
					ans += 'y = '+(-M.y);
					ans += '\\end{cases}';
				}
				else {
					if((n.x==0)&&(n.z==0)) {
						ans += '\\begin{cases}';
						ans += 'x = '+(-M.x)+'\\\\';
						ans += 'z = '+(-M.z);
						ans += '\\end{cases}';
					}
					else {
						ans += '\\begin{cases}';
						ans += 'y = '+(-M.y)+'\\\\';
						ans += 'z = '+(-M.z);
						ans += '\\end{cases}';
					}
				}
			}}}
		}
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function PlaneGenerator2(max,count) {
	var cmd = 'Составьте уравнение плоскости \\(\\alpha\\), если ';
	cmd += '\\(A \\in \\alpha \\parallel \\overrightarrow{a},\\overrightarrow{b}\\).';
	cmd += '<ol>';
	for(var i = 0; i<count; i++) {
		var M = RandMatrix(max);
		var m = RandMatrix(max);
		var n = RandMatrix(max);
		cmd += Li(i);
		cmd += '\\( A = ';
		cmd += M.Print();
		cmd += ',~~\\overrightarrow{a} = ';
		cmd += m.Print();
		cmd += ',~~\\overrightarrow{b} = ';
		cmd += n.Print();
		cmd += '\\)';
		var ans = ',~~~~\\alpha:~~~';
		var norm = new Matrix3(new Vector(0,m.z,-m.y),
			new Vector(-m.z,0,m.x),new Vector(m.y,-m.x,0)).multVec(n).Normalise();
		ans += norm.x+'(x'+Write(-M.x,'')+')'+
			Write(norm.y,0)+'(y'+Write(-M.y,'')+')'+
			Write(norm.z,0)+'(z'+Write(-M.z,'')+') = 0';
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
function AngleGenerator(max,count) {
	var cmd = 'Найдите \\(\\alpha =\\angle\\left(\\overrightarrow{a},\\overrightarrow{b}\\right)\\).';
	cmd += '<ol>';
	for(var i = 0; i<count; i++) {
		var m = new Vector(0,0,0);
		var n = new Vector(0,0,0);
		while((m.x==0)&&(n.x==0)&&(m.y==0)&&(n.y==0)&&(n.z==0)&&(m.z==0)) {
			m = RandMatrix(max/2);
			n = RandMatrix(max/2);
		}
		cmd += Li(i);
		cmd += '\\(';
		cmd += '~~~\\overrightarrow{a} = ';
		cmd += m.Print();
		cmd += ',~~\\overrightarrow{b} = ';
		cmd += n.Print();
		cmd += '\\)';
		var minus = '';
		if(VectorSkalar(m,n)<0) {
			minus = '- ';
		}
		var up = Math.abs(VectorSkalar(m,n));
		var down2 = n.len2*m.len2;
		var ans = ',~~~\\displaystyle \\cos{\\alpha}= '+minus+SqrDown(up,down2);
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function NOD(x,y) {
	while(x*y != 0) {
        if(Math.abs(x)<Math.abs(y)) {
			y = y%x
		}
        else {
			x = x%y
		}
	}
    return x+y
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
	var cmd = 'Найти точку \\(X\\), если \\(X \\in MN\\).';
	cmd += '<ol>';
	for(var i = 0; i<count; i++) {
		var m = Math.round(Math.random()*max/2)+1;
		var n = Math.round(Math.random()*max/2)+1;
		var M = RandMatrix(max);
		var N = RandMatrix(max);
		cmd += Li(i);
		cmd += '\\(';
		cmd += 'M = '+M.Print();
		cmd += ',~~N = '+N.Print();
		cmd += ',~~~MX:XN = ';
		cmd += String(m)+' : ';
		cmd += String(n)+'~~';
		cmd += '\\)';
		var ans;
		if(n==m) {
			ans = ',~~~X = '+VectorSum(M,N).Mult(1/2).Print();
		}
		else {
			var nod = NOD(n,m);
			n /= nod;
			m /= nod;
			ans = ',~~~X =\\displaystyle \\frac{1}{'+String(m+n)+'} ';
			ans += VectorSum(M.Mult(n),N.Mult(m)).Print();
		}
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function LenVector(max,count) {
	var cmd = 'Найдите длину вектора \\(\\overrightarrow{m}\\).';
	cmd += '<ol>';
	for(var i = 0; i<count; i++) {
		var m = RandMatrix(max);
		cmd += Li(i);
		cmd += '\\(\\overrightarrow{m} = ';
		cmd += m.Print()+'\\)';
		var ans = ',~~~\\left|\\overrightarrow{m}\\right| ='+Sqrt(m.len2);
		cmd += Li_(i,ans);
	}
	cmd += '</ol>'
	return cmd;
}
function ScalarVector(max,count) {
	var cmd = 'Найдите скалярное произведение векторов \\(\\overrightarrow{a}\\) и \\(\\overrightarrow{b}\\).';
	cmd += '<ol>';
	for(var i = 0; i<count; i++) {
		var a = RandMatrix(max);
		var b = RandMatrix(max);
		cmd += Li(i);
		cmd += '\\(\\overrightarrow{a} = ';
		cmd += a.Print();
		cmd += ',~~\\overrightarrow{b} = ';
		cmd += b.Print()+'\\)';
		var ans = ',~~~\\overrightarrow{a}\\cdot\\overrightarrow{b} ='+VectorSkalar(a,b);
		cmd += Li_(i,ans);
	}
	cmd += '</ol>';
	return cmd;
}
function RandomTask(max,count) {
	var cmd = '<ol>';
	var types = ['point','len','scalar','angle','plane1','plane2','line'];
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
	switch(type) {
		case 'point': return PointGenerator(max,count);
		case 'len': return LenVector(max,count);
		case 'scalar': return ScalarVector(max,count);
		case 'angle': return AngleGenerator(max,count);
		case 'plane1': return PlaneGenerator1(max,count);
		case 'plane2': return PlaneGenerator2(max,count);
		case 'line': return LineGenerator(max,count);
		case 'random': return RandomTask(max,count);
		default: return 'Непредвиденная ошибка';
	}
}
Default();