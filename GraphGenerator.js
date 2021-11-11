class Graphs {
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
		x0 = Math.round(1000*max*Math.random())/1000;
		y0 = Math.round(1000*max*Math.random())/1000;
		a = Math.round(1000*max*Math.random()-500*max)/1000;
		b = Math.round(1000*max*Math.random()-500*max)/1000;
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
		x0 = Math.round(1000*max*Math.random())/1000;
		y0 = Math.round(1000*max*Math.random())/1000;
		r = Math.round(1000*max*Math.random()*max)/1000;
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
		k = Math.round(max*(2*(sqr%2)-1)*1000*Math.random())/1000;
		x0 = Math.round(1000*2*Math.random()-1000)/1000;
		y0 = Math.round(1000*2*Math.random()-1000)/1000;
		return "("+String(k)+"/(x-("+String(x0)+"))+("+String(y0)+")-y)";
	}
	Parabole(max,sqr,compiler) {
		var x0;
		var y0;
		var a = 0;
		var part1;
		var part2;
		while(a==0) {
			a = Math.round(10000*Math.random()-5000)/1000;
		}
		x0 = Math.round(1000*max*Math.random())/1000;
		y0 = Math.round(1000*max*Math.random())/1000;
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
function RandomGraph(max,compiler) {
	// p - parabole, h - hyperbole, l - line, c - circle
	var g = [];
	for(var i = 0; i<4; i++) {
		g.push(Graph.Random(max,i+1,compiler));
	}
	var part1 = "(x+abs(x))/(2x)*(y+abs(y))/(2y)*"+g[0];
	var part2 = "+(x-abs(x))/(2x)*(y+abs(y))/(2y)*"+g[1];
	var part3 = "+(x-abs(x))/(2x)*(y-abs(y))/(2y)*"+g[2];
	var part4 = "+(x+abs(x))/(2x)*(y-abs(y))/(2y)*"+g[3];
	return part1+part2+part3+part4+"=0";
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
		a = Math.round(max*Math.random()+1);
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
		a = Math.round(max*Math.random()+1);
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
			k = Math.round(max*2*Math.random()-max);
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
\\usepackage[unicode, pdftex]{hyperref}
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
			\\operatorname{G}{(x,~y)} \\\\ \n`+
`			`+pargraph+"\n"+
`		\\end{array}
	\\right.`;
		latex += temp;
		jax += temp;
		latex += "\n\\]\n";
		jax += "\\]<br>";
		latex += task4;
		jax += task4;
		var gxyTEX = RandomGraph(10,"tex");
		var gxyJAX = RandomGraph(10,"jax");
		latex += ("\n\nКод $\\operatorname{G}{(x,~y)}$ для \\href{https://www.desmos.com/calculator?lang=ru}{desmos.com} :\n\n \\tiny"+gxyTEX+"\\normalsize");
		jax += "<br>Код \\(\\operatorname{G}{(x,~y)}\\) для <a target='_blank' href='https://www.desmos.com/calculator?lang=ru'>desmos.com</a> : ";
		jax += ("<textarea class='latexcode' readonly>"+gxyJAX+"</textarea>");
		jax += "</li>"
	}
	latex += "\n\\end{enumerate}\n\\end{document}";
	jax += "</ol>";
	if(count>0) {
		document.getElementById('output').value = latex;
		document.getElementById('preview').innerHTML = jax;
		MathJax.typeset();
	}
	else {
		document.getElementById('output').value = '';
		document.getElementById('preview').innerHTML = '';
	}
}