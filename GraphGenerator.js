class Graphs1 {
	constructor() {
		this.p = 0;
		this.h = 1;
		this.l = 2;
		this.c = 3;
	}
	Line(max,sqr) {
		var a;
		var b;
		var x0;
		var y0;
		var part1;
		var part2;
		x0 = Math.round(max*Math.random());
		y0 = Math.round(max*Math.random());
		a = Math.round(max*Math.random()-max/2);
		b = Math.round(max*Math.random()-max/2);
		if((sqr==1)||(sqr==4)) {
			part1 = "("+String(a)+"*(x-"+String(x0)+")+";
		}
		else {
			part1 = "("+String(a)+"*(x+" + String(x0) + ")+";
		}
		if((sqr==2)||(sqr==1)) {
			part2 = "("+String(b)+")*(y-"+String(y0)+"))";
		}
		else {
			part2 = "("+String(b)+")*(y+"+String(y0)+"))";
		}
		return part1+part2;
	}
	Circle(max,sqr,compiler) {
		var x0;
		var y0;
		var r;
		var part1;
		var part2;
		x0 = Math.round(max*Math.random());
		y0 = Math.round(max*Math.random());
		r = Math.round(max*Math.random()*max);
		if((sqr==1)||(sqr==4)) {
			if(compiler=="tex") {
				part1 = "((x-"+String(x0)+")\\textasciicircum 2+";
			}
			else {
				part1 = "((x-"+String(x0)+")^2+";
			}
		}
		else {
			if(compiler=="tex") {
				part1 = "((x+" + String(x0) + ")\\textasciicircum 2+";
			}
			else {
				part1 = "((x+" + String(x0) + ")^2+";
			}
		}
		if((sqr==2)||(sqr==1)) {
			if(compiler=="tex") {
				part2 = "(y-"+String(y0)+")\\textasciicircum 2 -"+String(r)+")";
			}
			else {
				part2 = "(y-"+String(y0)+")^2 -"+String(r)+")";
			}
		}
		else {
			if(compiler=="tex") {
				part2 = "(y+"+String(y0)+")\\textasciicircum 2 -"+String(r)+")";
			}
			else {
				part2 = "(y+"+String(y0)+")^2 -"+String(r)+")";
			}
		}
		return part1+part2;
	}
	Hyperbole(max,sqr) {
		var x0;
		var y0;
		var k;
		k = Math.round(max*(2*(sqr%2)-1)*Math.random());
		x0 = Math.round(max*2*Math.random()-max);
		y0 = Math.round(max*2*Math.random()-max);
		return "("+String(k)+"/(x-("+String(x0)+"))+("+String(y0)+")-y)";
	}
	Parabole(max,sqr,compiler) {
		var x0;
		var y0;
		var a = 0;
		var part1;
		var part2;
		while(a==0) {
			a = Math.round(max*Math.random()-max/2);
		}
		x0 = Math.round(max*Math.random());
		y0 = Math.round(max*Math.random());
		if((sqr==1)||(sqr==4)) {
			if(compiler=="tex") {
				part1 = "("+String(a)+"*(x-"+String(x0)+")\\textasciicircum 2";
			}
			else {
				part1 = "("+String(a)+"*(x-"+String(x0)+")^2";
			}
		}
		else {
			if(compiler=="tex") {
				part1 = "("+String(a)+"*(x+" + String(x0) + ")\\textasciicircum 2";
			}
			else {
				part1 = "("+String(a)+"*(x+" + String(x0) + ")^2";
			}
		}
		if((sqr==2)||(sqr==1)) {
			part2 = "+"+String(y0)+"-y)";
		}
		else {
			part2 = "-"+String(y0)+"-y)";
		}
		return part1+part2;
	}
	Random(max,sqr,compiler) {
		var temp = Math.round(3*Math.random());
		if(temp == this.p) {
			return this.Parabole(max,sqr,compiler);
		}
		if(temp == this.h) {
			return this.Hyperbole(max,sqr);
		}
		if(temp == this.c) {
			return this.Circle(max,sqr,compiler);
		}
		if(temp == this.l) {
			return this.Line(max,sqr);
		}
		return 0;
	}
}
class Graphs {
	constructor() {
		this.p = 0;
		this.h = 1;
		this.l = 2;
		this.c = 3;
		this.a = 4;
		this.count = 4;
	}
	Line(max) {
		var a;
		var b;
		var x0;
		var y0;
		var part1;
		var part2;
		x0 = Math.round(max*2*Math.random()-max);
		y0 = Math.round(max*2*Math.random()-max);
		a=0;
		b=0;
		while((a==0)&&(b==0)||(Math.abs(a)==1)||(Math.abs(b)==1)) {
			a = Math.round(max*Math.random()-max/2);
			b = Math.round(max*Math.random()-max/2);
		}
		var part1;
		var part2;
		if(a==0) {
			part1="";
			part2 = String(b)+"(y"+Write(y0)+")=0";
		}
		if(b==0) {
			part2 = "";
			part1 = String(a)+"(x"+Write(x0)+")=0"
		}
		if(a*b!=0) {
			part1 = String(a)+"(x"+Write(x0)+")";
			part2 = Write(b)+"(y"+Write(y0)+")=0";
		}
		return part1+part2;
	}
	Circle(max) {
		var x0;
		var y0;
		var r;
		var part1;
		var part2;
		x0 = Math.round(max*2*Math.random()-max);
		y0 = Math.round(max*2*Math.random()-max);
		r = Math.round(max*Math.random()*max-2);
		return "(x"+Write(x0)+")^2+(y"+Write(y0)+")^2="+String(r);
	}
	Hyperbole(max) {
		var x0;
		var y0;
		var k = 0;
		while(k==0) {
			k = Math.round(max*Math.random()-max/2);
		}
		x0 = Math.round(max*2*Math.random()-max);
		y0 = Math.round(max*2*Math.random()-max);
		y0 = Math.round(max*2*Math.random()-max);
		if(y0 == 0) {
			y0 = "";
		}
		else {
			y0 = Write(y0);
		}
		return "\\displaystyle y=\\frac{"+String(k)+"}{x"+Write(x0)+"}"+y0;
	}
	Parabole(max) {
		var x0;
		var y0;
		var a = 0;
		while(a==0) {
			a = Math.round(max*Math.random()-max/2);
		}
		if(a==1) {
			a = "";
		}
		if(a==-1) {
			a = "-";
		}
		x0 = Math.round(max*2*Math.random()-max);
		y0 = Math.round(max*2*Math.random()-max);
		if(y0 == 0) {
			y0 = "";
		}
		else {
			y0 = Write(y0);
		}
		return "y="+String(a)+"(x"+Write(x0)+")^2"+y0;
	}
	Angle(max) {
		var x0;
		var y0;
		var a = 0;
		while(a==0) {
			a = Math.round(max*Math.random()-max/2);
		}
		if(a==1) {
			a = "";
		}
		if(a==-1) {
			a = "-";
		}
		x0 = Math.round(max*2*Math.random()-max);
		y0 = Math.round(max*2*Math.random()-max);
		if(y0 == 0) {
			y0 = "";
		}
		else {
			y0 = Write(y0);
		}
		return "y="+String(a)+"|x"+Write(x0)+"|"+y0;
	}
	Random(max) {
		var temp = Math.round(this.count*Math.random());
		if(temp == this.p) {
			return this.Parabole(max);
		}
		if(temp == this.h) {
			return this.Hyperbole(max);
		}
		if(temp == this.c) {
			return this.Circle(max);
		}
		if(temp == this.l) {
			return this.Line(max);
		}
		if(temp == this.a) {
			return this.Angle(max);
		}
		return 0;
	}
}
var Graph = new Graphs();
function Sign(x) {
	if(x>0) {
		return "+";
	}
	if(x<0) {
		return "-";
	}
	return 0;
}
function Write(x) {
	if(x>=0) {
		return "+"+String(x);
	}
	else {
		return "-"+String(-x);
	}
}
function RandomGraph(max) {
	// p - parabole, h - hyperbole, l - line, c - circle, a - angle
	var g = [];
	var graphcount = Math.round(Math.random())+2;
	for(var i = 0; i<graphcount; i++) {
		g.push(Graph.Random(max));
	}
	var temp = `\\left[
			\\begin{array}{l}
`;
	for(var i = 0; i<graphcount-1; i++) {
		temp += "				";
		temp += g[i];
		temp +=`\\\\
`;
	}
	temp += "				";
	temp += g[graphcount-1];
	temp +=`
			\\end{array}
			\\right.`;
	return temp;
}

function RandomParCorner(max) {
	var a;
	var b;
	var c;
	var par1=1;
	var par2=1;
	var par3=1;
	var rand;
	var sign1; 
	var sign2;
	var sign3;
	rand = Math.round(Math.random());
	if(rand==0) {
		sign1 = "-";
	}
	else {
		sign1 = "";
	}
	rand = Math.round(Math.random());
	if(rand==0) {
		sign2 = "-";
	}
	else {
		sign2 = "+";
	}
	rand = Math.round(Math.random());
	if(rand==0) {
		sign3 = "-";
	}
	else {
		sign3 = "+";
	}
	while((100*par1+10*par2+par3==0)||(100*par1+10*par2+par3>100)) {
		par1 = Math.round(Math.random());
		par2 = Math.round(Math.random());
		par3 = Math.round(Math.random());
	}
	if(par1==1) {
		a = "a";
		sign1 = "";
	}
	else {
		a = Math.round(max*Math.random()/2+1);
		if(a == 1) {
			a="";
		}
	}
	b = Math.round(max*Math.random()+1);
	if(par2==1) {
		if(b==1) {
			b = "a";
		} 
		else {
			b = String(b)+"a";
		}
	}
	c = Math.round(max*Math.random()+1);
	if(par3==1) {
		if(c==1) {
			c = "a";
		}
		else {
			c = String(c)+"a";
		}
	}
	return "y = "+sign1+String(a)+"|x"+sign2+String(b)+"|"+sign3+String(c);
}

function RandomParCircle(max) {
	var a;
	var b;
	var c;
	var par1=1;
	var par2=1;
	var par3=1;
	var rand;
	var sign2;
	var sign3;
	rand = Math.round(Math.random());
	rand = Math.round(Math.random());
	if(rand==0) {
		sign2 = "-";
	}
	else {
		sign2 = "+";
	}
	rand = Math.round(Math.random());
	if(rand==0) {
		sign3 = "-";
	}
	else {
		sign3 = "+";
	}
	while((100*par1+10*par2+par3==0)||(100*par1+10*par2+par3>100)) {
		par1 = Math.round(Math.random());
		par2 = Math.round(Math.random());
		par3 = Math.round(Math.random());
	}
	if(par1==1) {
		a = "a";
	}
	else {
		a = Math.round(max*Math.random()+1);
	}
	b = Math.round(max*Math.random()+1);
	if(par2==1) {
		if(b==1) {
			b = "a";
		} 
		else {
			b = String(b)+"a";
		}
	}
	c = Math.round(max*Math.random()+1);
	if(par3==1) {
		if(c==1) {
			c = "a";
		}
		else {
			c = String(c)+"a";
		}
	}
	return "(x"+sign3+String(c)+")^2+(y"+sign2+String(b)+")^2 = "+String(a);
}

function RandomParParabole(max) {
	var a;
	var b;
	var c;
	var par1=1;
	var par2=1;
	var par3=1;
	var rand;
	var sign1; 
	var sign2;
	var sign3;
	rand = Math.round(Math.random());
	if(rand==0) {
		sign1 = "-";
	}
	else {
		sign1 = "";
	}
	rand = Math.round(Math.random());
	if(rand==0) {
		sign2 = "-";
	}
	else {
		sign2 = "+";
	}
	rand = Math.round(Math.random());
	if(rand==0) {
		sign3 = "-";
	}
	else {
		sign3 = "+";
	}
	while((100*par1+10*par2+par3==0)||(100*par1+10*par2+par3>100)) {
		par1 = Math.round(Math.random());
		par2 = Math.round(Math.random());
		par3 = Math.round(Math.random());
	}
	if(par1==1) {
		a = "a";
		sign1 = "";
	}
	else {
		a = Math.round(max*Math.random()/2+1);
		if(a == 1) {
			a="";
		}
	}
	b = Math.round(max*Math.random()+1);
	if(par2==1) {
		if(b==1) {
			b = "a";
		} 
		else {
			b = String(b)+"a";
		}
	}
	c = Math.round(max*Math.random()+1);
	if(par3==1) {
		if(c==1) {
			c = "a";
		}
		else {
			c = String(c)+"a";
		}
	}
	return "y = "+sign1+String(a)+"(x"+sign2+String(b)+")^2"+sign3+String(c);
}

function RandomParLine(max) {
	var type; //0 - x=a, 1 - y=a,
	//2 - y=kx+a, 3 - y = (a+b)(x+c)+d
	type = Math.round(9*Math.random());
	if(type == 0) {
		return "x=a";
	}
	if(type == 1) {
		return "y=a";
	}
	if((type >= 2)&&(type<=5)) {
		var k = 0;
		while(k==0) {
			k = Math.round(max*Math.random()-max/2);
		}
		if(k==1) {
			k = "";
		}
		if(k==-1) {
			k="-";
		}
		return "y = "+String(k)+"x+a";
	}
	if(type >= 6) {
		var c,d;
		c = Math.round(max*2*Math.random()-max);
		d = Math.round(max*2*Math.random()-max);
		var ac;
		if(c==0) {
			ac="";
		}
		if(c==1) {
			ac = "+a";
		}
		if(c==-1) {
			ac = "-a";
		}
		if(Math.abs(c)>1) {
			ac = Sign(c)+String(Math.abs(c))+"a";
		}
		if(d==0) {
			d = "";
		}
		else {
			d = Sign(d)+String(Math.abs(d));
		}
		return "y=ax"+ac+d;
	}
}

function RandomParGraph(max) {
	var randnumber = Math.round(Math.random()*5);
	if(randnumber<3) {
		return RandomParLine(max);
	}
	if(randnumber==3) {
		return RandomParCorner(max);
	}
	if(randnumber==4) {
		return RandomParParabole(max);
	}
	if(randnumber==5) {
		return RandomParCircle(max);
	}
}

function Generate(count) {
	if(count<1) {
		document.getElementById('input').value = 1;
		count = 1;
	}
	var task1 = "Найдите все значения параметра ";
	var task2TEX = "$a$";
	var task2JAX = "\\(a\\)";
	var task3 = " при каждом из которых система";
	var tasks = [];
	var maxNumberOfSolutions = 4;
	tasks.push("имеет не более ");
	tasks.push("имеет ровно ");
	tasks.push("имеет более ");
	tasks.push("не имеет ");
	var latex = `\\documentclass[14pt,a4paper]{extarticle}
\\usepackage{math}
\\everymath{\\displaystyle}
\\usepackage[russian]{babel}
\\begin{document}
\\righthyphenmin=100
\\begin{enumerate}`;
	var jax = "<ol>";
	for(var i=0; i < count; i++) {
		var task4;
		var randTaskNumber;
		var randNumberOfSolutions;
		randNumberOfSolutions = Math.round(Math.random()*maxNumberOfSolutions);
		if(randNumberOfSolutions == 0) {
			randTaskNumber = 3;
			task4 = tasks[randTaskNumber];
			task4 += "решений.";
		}
		else {
			randTaskNumber = Math.round(Math.random()*2);
			task4 = tasks[randTaskNumber];
		}
		if(randNumberOfSolutions==1) {
			if((randTaskNumber==0)||(randTaskNumber==2)) {
				task4 += "1 решения.";
			}
			if(randTaskNumber==1) {
				task4 += "1 решение.";
			}
		}
		if(randNumberOfSolutions>1) {
			task4 += String(randNumberOfSolutions);
			if((randTaskNumber==0)||(randTaskNumber==2)) {
				task4 += " различных решений.";
			}
			if(randTaskNumber==1) {
				task4 += " различных решения.";
			}
		}
		latex += "\n\\item ";
		jax += "\n<li style='font-size:30'> ";
		latex += task1;
		jax += task1;
		latex += task2TEX;
		jax += task2JAX;
		latex += task3;
		jax += task3;
		pargraph = RandomParGraph(10);
		latex += "\n\\[ ";
		jax += "\\[";
		var temp = `
	\\left\\{
		\\begin{array}{l}
			`+RandomGraph(10)+`\\\\`+
`
				`+pargraph+`
		\\end{array}
	\\right.`;
		latex += temp;
		jax += temp;
		latex += "\n\\]\n";
		jax += "\\]<br>";
		latex += task4;
		jax += task4;
		jax += "</li>"
	}
	latex += "\n\\end{enumerate}\n\\end{document}";
	jax += "</ol>";
	document.getElementById('output').value = latex;
	document.getElementById('preview').innerHTML = jax;
	MathJax.typeset();
}