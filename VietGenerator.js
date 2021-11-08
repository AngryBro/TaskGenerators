class Solution{
    constructor(x1,x2) {
        this.x1 = x1;
        this.x2 = x2;
    }
}

function Equal(s1,s2) {
    if((s1.x1 == s2.x1)&&(s1.x2==s2.x2)) {
        return true;
    }
    else {
        return false;
    }
}
function Already(set,element) {
	if( (element.x1==0)||(element.x2==0)
        ||(element.x1+element.x2==0) ) {
            return true;
        }
    for(var i = 0; i<set.length; i++) {
        if( (Equal(element,set[i]))||(element.x1==0)||(element.x2==0)
        ||(element.x1+element.x2==0) ) {
            return true;
        }
    }
    return false;
}
function Generate(count,max) {
	count = Math.round(count);
	max = Math.round(max);
	if(count>=2*max*max-max) {
		document.getElementById('output').value = `Слишком маленькие корни или слишком большое количество`;
	}
	else {
	if((count>0)&&(max>0)&&(count<2*max*max-max)) {
    var solutions = [];
    var temp;
    var x1;
    var x2;
    var latex;
	var mathjax;
    var b;
    var c;
    for(var i = 0; i<count; i++) {
        x1 = Math.round(Math.random()*max*2-max);
        x2 = Math.round(Math.random()*max*2-max);
        temp = new Solution(x1,x2);
        while( Already(solutions,temp) ) {
            temp.x1 = Math.round(Math.random()*max*2-max);
            temp.x2 = Math.round(Math.random()*max*2-max);
        }
        solutions.push(temp);

    }
    latex = `\\documentclass[14pt,a4paper]{extarticle}
\\usepackage{math}
\\everymath{\\displaystyle}
\\usepackage[russian]{babel}
\\begin{document}
\\righthyphenmin=100
\\begin{enumerate}`;
	mathjax = '<ol> \n';
    for(var i = 0; i<solutions.length; i++) {
        b = -solutions[i].x1-solutions[i].x2;
        c = solutions[i].x1 * solutions[i].x2;
		mathjax += '<li style="font-size:30"> \\(';
        latex += "\n	\\item $";
        latex += "x^2";
		mathjax += 'x^2';
        if(b>0) {
            latex+='+';
			mathjax += '+';
        }
        if(b==1) {
            b = "";
        }
        if(b==-1) {
            b="-";
        }
        latex+= String(b);
		mathjax += String(b);
        latex += 'x';
		mathjax += 'x';
        if(c>0) {
            latex += "+";
			mathjax += '+';
        }

        latex += String(c);
		mathjax += String(c);
        latex += "=0 $ ";
		mathjax += '=0 \\)</li> \n';
    }
    latex += "\n\\end{enumerate}\n\\end{document}";
	mathjax += '</ol>';
	document.getElementById('output').value = latex;
	document.getElementById('preview').innerHTML = mathjax;
	MathJax.typeset();
	}
    else {
		document.getElementById('output').value = "";
		document.getElementById('preview').innerHTML = "";
	}
	}
}
