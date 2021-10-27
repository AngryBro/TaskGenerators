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
    for(var i = 0; i<set.length; i++) {
        if( (Equal(element,set[i]))||(element.x1==0)||(element.x2==0)
        ||(element.x1+element.x2==0) ) {
            return true;
        }
    }
    return false;
}
function Generate() {
    var max = document.getElementById('max').value;
    var count = document.getElementById('count').value;
    var solutions = [];
    var temp;
    var x1;
    var x2;
    var latex;
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
    latex = "\\begin{enumerate} ";
    for(var i = 0; i<solutions.length; i++) {
        b = -solutions[i].x1-solutions[i].x2;
        c = solutions[i].x1 * solutions[i].x2;
        latex += "\\item $";
        latex += "x^2";
        if(b>0) {
            latex+='+';
        }
        if(b==1) {
            b = "";
        }
        if(b==-1) {
            b="-";
        }
        latex+= String(b);
        latex += 'x';
        if(c>0) {
            latex += "+";
        }

        latex += String(c);
        latex += "=0 $ ";
    }
    latex += "\\end{enumerate} ";
    console.log(latex);
    document.body.innerHTML = "<b>Tasks:</b> <br>";
    document.body.innerHTML += latex;
    latex = "\\begin{enumerate} ";
    for(var i = 0; i<solutions.length; i++) {
        latex += " \\item $ \\{";
        latex += String(solutions[i].x1);
        latex += "; ";
        latex += String(solutions[i].x2);
        latex += "\\} $";
    }
    latex += " \\end{enumerate}";
    console.log(latex);
    document.body.innerHTML += "<br><br> <b>Keys:</b><br>";
    document.body.innerHTML += latex;
}
