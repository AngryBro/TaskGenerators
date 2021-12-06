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
		x0 = Math.round(max*2*Math.random())-max;
		y0 = Math.round(max*2*Math.random())-max;
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
		if((a*b)!=0) {
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
			maingraphs[this.p]++;
			return this.Parabole(max);
		}
		if(temp == this.h) {
			maingraphs[this.h]++;
			return this.Hyperbole(max);
		}
		if(temp == this.c) {
			maingraphs[this.c]++;
			return this.Circle(max);
		}
		if(temp == this.l) {
			maingraphs[this.l]++;
			return this.Line(max);
		}
		if(temp == this.a) {
			maingraphs[this.a]++;
			return this.Angle(max);
		}
		return 0;
	}
}
var Graph = new Graphs();
var maingraphs = [];
ResetGraphs();
function ResetGraphs() {
	maingraphs.length = 0;
	for(var i = 0; i<=Graph.count; i++) {
		maingraphs.push(0);
	}
}
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
	// p - parabole, h - hyperbole, l - line, c - circle, a - angle, hp - halfparabole
	var g = [];
	var graphcount = Math.round(Math.random())+1;
	if(graphcount==2) {
	g.push(Graph.Random(max));
	g.push(g[0]);
	while(g[0]==g[1]) {
		g[1] = Graph.Random(max);
	}
	var temp = `\\left[
			\\begin{array}{l}
`;
	temp += "				";
	temp += g[0];
	temp +=`\\\\
`;
	temp += "				";
	temp += g[1];
	temp +=`
			\\end{array}
			\\right.`;
	return temp;
	}
	else {
		var x = 0;
		var y = 0;
		var r = 0;
		var t = "";
		var randgraph = Graph.Random(max);
		if((maingraphs[Graph.c]>0)||(maingraphs[Graph.l]>0)||(maingraphs[Graph.a]>0)) {
			r = 0;
			while((x+y)==0) {
				x = Math.round(Math.random());
				y = Math.round(Math.random());
			}
		}
		else {
			while((x+y+r)==0) {
				x = Math.round(Math.random());
				y = Math.round(Math.random());
				r = Math.round(Math.random());
			}
		}
		var xpos = -1;
		var ypos = -1;
		var rpos = -1;
		if(x>0) {
			t="";
			for(var i = 0; i<randgraph.length; i++) {
				if(randgraph[i]=='x') {
					xpos = i;
				}
			}
			if(xpos>=0) {
				for(var i = 0; i<xpos; i++) {
					t += randgraph[i];
				}
				t += "|x|";
				for(var i = xpos+1; i<randgraph.length; i++) {
					t += randgraph[i];
				}
				randgraph = t;
			}
		}
		if(y>0) {
			t="";
			for(var i = 0; i<randgraph.length; i++) {
				if(randgraph[i]=='y') {
					ypos = i;
				}
			}
			if(ypos>=0) {
				for(var i = 0; i<ypos; i++) {
					t += randgraph[i];
				}
				t += "|y|";
				for(var i = ypos+1; i<randgraph.length; i++) {
					t += randgraph[i];
				}
				randgraph = t;
			}
		}
		if(r>0) {
			t="";
			for(var i = 0; i<randgraph.length; i++) {
				if(randgraph[i]=='=') {
					rpos = i+1;
				}
			}
			for(var i = 0; i<rpos; i++) {
				t += randgraph[i];
			}
			t += '\\left|';
			for(var i = rpos; i<randgraph.length; i++) {
				t+= randgraph[i];
			}
			t += '\\right|';
			randgraph = t;
		}
		return "	"+randgraph;
	}
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
	var maxrandnumber;
	var pnumber;
	var cnumber;
	if((maingraphs[Graph.h]>0)||(maingraphs[Graph.p]>0)) {
		maxrandnumber = 4;
		cnumber = 10;
		pnumber = 4;
	}
	else {
		if(maingraphs[Graph.c]>0) {
			maxrandnumber = 4;
			cnumber = 4;
			pnumber = 10;
		}
		else {
			maxrandnumber = 5;
			cnumber = 5;
			pnumber = 4;
		}
	}
	var randnumber = Math.round(Math.random()*maxrandnumber);
	if(randnumber<3) {
		return RandomParLine(max);
	}
	if(randnumber==3) {
		return RandomParCorner(max);
	}
	if(randnumber==pnumber) {
		return RandomParParabole(max);
	}
	if(randnumber==cnumber) {
		return RandomParCircle(max);
	}
}
function Default() {
	var input = document.getElementById('input');
	if(input.value < 1) {
		input.value = 1;
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
\\begin{document}
\\righthyphenmin=100
\\begin{enumerate}`;
	var jax = "<ol>";
	for(var i=0; i < count; i++) {
		var task4;
		var randTaskNumber;
		var randNumberOfSolutions;
		var randmaingraph = RandomGraph(10);
		var pargraph = RandomParGraph(10);
		ResetGraphs();
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
		latex += "\n\\[ ";
		jax += "\\[";
		var temp = `
	\\left\\{
		\\begin{array}{l}
			`+randmaingraph+`\\\\`+
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
	document.getElementById('tasks').hidden = false;
	document.getElementById('output').value = latex;
	document.getElementById('preview').innerHTML = jax;
	MathJax.typeset();
}