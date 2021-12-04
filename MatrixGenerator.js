function SumGenerator(max,count) {
	var cmd = 'Вычислите матрицу.\n';
	cmd += '<ol>\n';
	for(var i = 0; i<count; i++) {
		cmd += '<li style=\'font-size:30\'>\n';
		cmd += '\\(';
		cmd += RandMatrix(max);
		cmd += RandSign();
		cmd += RandMatrix(max);
		cmd += '=';
		cmd += '\\)\n</li>\n';
	}
	cmd += '</ol>';
	return cmd;
}
function PlaneGenerator1(max,count) {
	var cmd = 'Составьте уравнение плоскости \\(\\mu\\), если ';
	cmd += '\\(M \\in \\mu \\perp \\overrightarrow{n}\\).';
	cmd += '<ol>\n';
	for(var i = 0; i<count; i++) {
		cmd += '<li style=\'font-size:30\'>\n';
		cmd += '\\( M = ';
		cmd += RandMatrix(max);
		cmd += ',~~\\overrightarrow{n} = ';
		cmd += RandMatrix(max);
		cmd += '\\)\n</li>\n';
	}
	cmd += '</ol>';
	return cmd;
}
function PlaneGenerator2(max,count) {
	var cmd = 'Составьте уравнение плоскости \\(\\mu\\), если ';
	cmd += '\\(M \\in \\mu \\parallel \\overrightarrow{m},\\overrightarrow{n}\\).';
	cmd += '<ol>\n';
	for(var i = 0; i<count; i++) {
		cmd += '<li style=\'font-size:30\'>\n';
		cmd += '\\( M = ';
		cmd += RandMatrix(max);
		cmd += ',~~\\overrightarrow{m} = ';
		cmd += RandMatrix(max);
		cmd += ',~~\\overrightarrow{n} = ';
		cmd += RandMatrix(max);
		cmd += '\\)\n</li>\n';
	}
	cmd += '</ol>';
	return cmd;
}
function Det2Generator(max,count) {
	var cmd = 'Вычислите определитель матрицы \\(2 \\times 2\\).\n';
	cmd += '<ol>\n';
	for(var i = 0; i<count; i++) {
		cmd += '<li style=\'font-size:30\'>\n';
		cmd += '\\(';
		a = String(Math.round(Math.random()*2*max)-max);
		b = String(Math.round(Math.random()*2*max)-max);
		c = String(Math.round(Math.random()*2*max)-max);
		d = String(Math.round(Math.random()*2*max)-max);
		cmd += '\\begin{vmatrix}'+a+' & '+b+'\\\\'+c+' & '+d+'\\end{vmatrix}';
		cmd += '=';
		cmd += '\\)\n</li>\n';
	}
	cmd += '</ol>';
	return cmd;
}
function Write(x) {
	if(x>0) {
		return '+'+String(x);
	}
	if(x==0) {
		return '';
	}
	return '-'+String(-x);
}
function Det3Generator(max,count) {
	var cmd = 'Вычислите определитель матрицы \\(3 \\times 3\\).\n';
	cmd += '<ol>\n';
	for(var i = 0; i<count; i++) {
		cmd += '<li style=\'font-size:30\'>\n';
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
		cmd += '\\) </li> ';
		console.log(i);
	}
	
	cmd += '</ol>';
	return cmd;
}
function RandSign() {
	var temp = Math.round(Math.random());
	if(temp) {
		return '+';
	}
	return '-';
}
function RandMatrix(max) {
	var cmd = '\\begin{pmatrix} ';
	for(var i = 0; i<2; i++) {
		cmd += String(Math.round(Math.random()*max*2)-max);
		cmd += '\\\\';
	}
	cmd += String(Math.round(Math.random()*max*2)-max);
	cmd += '\\end{pmatrix}';
	return cmd;
}
function Generate(max,count) {
	var sum = document.getElementById('sum');
	var det2 = document.getElementById('det2');
	var det3 = document.getElementById('det3');
	var plane1 = document.getElementById('plane1');
	var plane2 = document.getElementById('plane2');
	if(sum.checked) {
		document.getElementById('preview').innerHTML = SumGenerator(max,count);
	}
	if(det2.checked) {
		document.getElementById('preview').innerHTML = Det2Generator(max,count);
	}
	if(det3.checked) {
		document.getElementById('preview').innerHTML = Det3Generator(max,count);
	}
	if(plane1.checked) {
		document.getElementById('preview').innerHTML = PlaneGenerator1(max,count);
	}
	if(plane2.checked) {
		document.getElementById('preview').innerHTML = PlaneGenerator2(max,count);
	}
}
