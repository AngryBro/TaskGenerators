function Print(data) {
	document.getElementById("output").innerHTML = data;
}

function RandomInterval(max) {
		var inf = Math.round(6*Math.random());
		if(inf == 0) {
			return new Interval(
			0 ,
			"- \\infty",
			Math.round(2*max*Math.random())-max,
			Math.round(Math.random()));
			
		}
		if(inf == 6) {
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
	
}

function Generate(count) {
	var max = 10;
	var tasks = [];
	var temp;
	tasks.push("ровно один корень");
	tasks.push("два корня");
	tasks.push("хотя бы один корень");
	tasks.push('не имеет корней');
	tasks.push('корни, каждый из которых');
	tasks.push('не более одного корня');
	for(var i = 0; i<6; i++) {
		temp = tasks[i];
		tasks[i] = "имеет ";
		tasks[i] += temp;
		tasks[i] += " на промежутке ";
	}
	// 0-5 это уравнения
	tasks.push('верно для любых $x$ из промежутка ');
	tasks.push('верно хотя бы для одного $x$ из промежутка ');
	tasks.push('имеет решение на промежутке ');
	tasks.push('не имеет решения на промежутке ');
	// 6-9 это неравенства
	var signs = [];
	signs.push(' > ');
	signs.push(' < ');
	signs.push(' \\geq ');
	signs.push(' \\leq ');
	signs.push(' = ');
	var type;
	var polynom = "\\[a x^2 + b x + c";
	var maintask = "Найдите все значения параметра $a$, при каждом из которых "
	var cmd = "\\begin{enumerate} ";
	for(var i = 0; i<count; i++) {
		var randtask = Math.round((tasks.length-1)*Math.random());
		var randsign;
		if(randtask<6) {
			randsign = signs[4];
			type = "уравнение ";
		}
		else {
			randsign = signs[Math.round(3*Math.random())];
			type = "неравенство ";
		}
		var interval = RandomInterval(max);
		cmd += "\\item ";
		cmd += maintask;
		cmd += type;
		cmd += polynom;
		cmd += randsign;
		cmd += "0 \\] ";
		cmd += tasks[randtask];
		cmd += interval.Out();
		cmd += ". ";
		
	}
	cmd += "\\end{enumerate}";
	Print(cmd);
}