function RandomInterval(max) {
		var inf = Math.round(5*Math.random());
		if(inf == 0) {
			return new Interval(
			0 ,
			"- \\infty",
			Math.round(2*max*Math.random())-max,
			Math.round(Math.random()));
			
		}
		if(inf == 5) {
			return new Interval(
			Math.round(Math.random()) ,
			Math.round(2*max*Math.random())-max,
			"+ \\infty",
			0);	
		}
		var randomnumber = Math.round(2*max*Math.random())-max;
		return new Interval(
			Math.round(Math.random()) ,
			randomnumber,
			randomnumber + Math.round(max*Math.random())+1,
			Math.round(Math.random()));	
		
	}

class Interval {
	constructor(left,begin,end,right) {
		this.left = left;
		this.begin = String(begin);
		this.end = String(end);
		this.right = right;
	}
	Out() {
		var cmd = "$";
		if(this.left==0) {
			cmd += "\\left( ";
		}
		else {
			cmd += "\\left[ ";
		}
		cmd += this.begin;
		cmd += ";~ ";
		cmd += this.end;
		if(this.right == 0) {
			cmd += " \\right)";
		}
		else {
			cmd += " \\right]";
		}
		cmd += "$";
		return cmd;
	}
	JaxOut() {
		var cmd = "\\( ";
		if(this.left==0) {
			cmd += "\\left( ";
		}
		else {
			cmd += "\\left[ ";
		}
		cmd += this.begin;
		cmd += ";~ ";
		cmd += this.end;
		if(this.right == 0) {
			cmd += " \\right)";
		}
		else {
			cmd += " \\right]";
		}
		cmd += " \\)";
		return cmd;
	}
}
function Default() {
	var input = document.getElementById('input');
	if(input.value < 1) {
		input.value = 1;
	}
	if(input.value > 100) {
		input.value = 100;
	}
}
function Generate(count) {
	var max = 10;
	var tasks = [];
	var tasksjax = [];
	var temp;
	tasks.push("ровно один корень");
	tasks.push("два корня");
	tasks.push("хотя бы один корень");
	tasks.push('не имеет корней');
	tasks.push('корни, каждый из которых');
	tasks.push('не более одного корня');
	tasksjax.push("ровно один корень");
	tasksjax.push("два корня");
	tasksjax.push("хотя бы один корень");
	tasksjax.push('не имеет корней');
	tasksjax.push('корни, каждый из которых');
	tasksjax.push('не более одного корня');
	for(var i = 0; i<6; i++) {
		temp = tasks[i];
		tasks[i] = "имеет ";
		tasks[i] += temp;
		tasks[i] += " на промежутке ";
	}
	for(var i = 0; i<6; i++) {
		temp = tasksjax[i];
		tasksjax[i] = "имеет ";
		tasksjax[i] += temp;
		tasksjax[i] += " на промежутке ";
	}
	// 0-5 это уравнения
	tasks.push('верно для любых $x$ из промежутка ');
	tasks.push('верно хотя бы для одного $x$ из промежутка ');
	tasks.push('имеет решение на промежутке ');
	tasks.push('не имеет решения на промежутке ');
	tasksjax.push('верно для любых \\(x\\) из промежутка ');
	tasksjax.push('верно хотя бы для одного \\(x\\) из промежутка ');
	tasksjax.push('имеет решение на промежутке ');
	tasksjax.push('не имеет решения на промежутке ');
	// 6-9 это неравенства
	var signs = [];
	signs.push(' > ');
	signs.push(' < ');
	signs.push(' \\geq ');
	signs.push(' \\leq ');
	signs.push(' = ');
	var type;
	var bonus;
	var polynom = "	\\[a x^2 + b x + c";
	var cmd = `\\documentclass[14pt,a4paper]{extarticle}
\\usepackage{math}
\\everymath{\\displaystyle}
\\usepackage[russian]{babel}
\\begin{document}
\\righthyphenmin=100
\\begin{enumerate}`;
	var mathjax = "<ol> \n";
	for(var i = 0; i<count; i++) {
		var randtask = Math.round((tasks.length-1)*Math.random());
		var randsign;
		var interval = RandomInterval(max);
		if(randtask<6) {
			randsign = signs[4];
			type = "уравнение ";
			bonus = "\\neq 0";
		}
		else {
			randsign = signs[Math.round(3*Math.random())];
			type = "неравенство ";
			var flag = Math.round(Math.random());
			if((interval.end == "+ \\infty")||(interval.begin == "- \\infty")) {
				bonus = "\\neq 0";
			}
			else {
				if(flag==0) {
					bonus = "< 0";
				}
				else {
					bonus = "> 0";
				}
			}
		}
		var maintask = "Найдите все значения параметров $a " + bonus;
		maintask += ",b,c$, при каждом из которых ";
		var maintaskjax = "Найдите все значения параметров \\(a " + bonus;
		maintaskjax += ",b,c \\), при каждом из которых ";
		cmd += "\n  \\item ";
		mathjax += "<li style='font-size:30'> \n";
		cmd += maintask;
		mathjax += maintaskjax;
		cmd += type;
		mathjax += type;
		cmd += " \n ";
		cmd += polynom;
		mathjax += polynom;
		cmd += randsign;
		mathjax += randsign;
		cmd += "0 \\] \n ";
		mathjax += "0 \\]";
		cmd += "	";
		cmd += tasks[randtask];
		mathjax += tasksjax[randtask];
		cmd += interval.Out();
		mathjax += interval.JaxOut();
		cmd += ". ";
		mathjax += ". </li> \n";
		
	}
	cmd += "\n\\end{enumerate}\n\\end{document}";
	mathjax += "</ol>";
	document.getElementById('tasks').hidden = false;
	//document.getElementById("output").value = cmd;
	document.getElementById("preview").innerHTML = mathjax;
	MathJax.typeset();
}