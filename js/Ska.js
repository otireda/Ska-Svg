var Ska = {};

Ska.baseUrl = "";

Ska.load = function(elem, file, callback = null)
{
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function()
	{

		if (this.readyState == 4 && this.status == 200)
		{
			var elements = document.querySelectorAll(elem);

			for(var i = 0; i < elements.length; i++)
			{
				elements[i].innerHTML = this.responseText;
			}

			if(callback)
				callback();			
		}

	};

	xhttp.open("GET", file, true);
	xhttp.send();
}

Ska.loadToObject = function(elem, file)
{
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function()
	{

		if (this.readyState == 4 && this.status == 200)
		{
			elem.innerHTML = this.responseText;

			// SET COLOR
			var c = elem.getAttribute("data-ska-color");

			if(c)
			{
				var p = elem.querySelector("svg path");

				// console.log(elem);
				// console.log(p);

				if(p)
					p.style.fill = c;
			}	

			// SET GRADIENT
			var startColor = elem.getAttribute("data-ska-gradient-start-color");
			var endColor = elem.getAttribute("data-ska-gradient-end-color");
			
			var rotate = 75;
			var setRotate = elem.getAttribute("data-ska-gradient-rotate");

			if(setRotate)
				rotate = setRotate;

			if(startColor && endColor)
			{
				var gradientDivDefs = document.querySelector('#gradientDiv defs');

				var ran = startColor.replace("#", "") + endColor.replace("#", "");
				//Math.floor(Math.random() * 100);

				var newGradient = '<linearGradient id="gradient-custom-' + ran + '" gradientTransform="rotate(' + rotate + ')"><stop offset="0%" stop-color="' + startColor + '"></stop><stop offset="99%" stop-color="' + endColor + '"></stop></linearGradient>';

				if(gradientDivDefs)
					gradientDivDefs.innerHTML += newGradient;
				else
					Ska.gradientCache += newGradient;

				var p = elem.querySelector("svg path");

				// console.log(p);

				// console.log(ran);

				if(p)
				{
					p.style.fill = '';
					p.setAttribute('fill', 'url(#gradient-custom-' + ran + ')');

				}
			}

		}

	};

	xhttp.open("GET", file, true);
	xhttp.send();
}

Ska.useShape = function(element, shapeType, callback = null)
{
	Ska.load(element, Ska.baseUrl + "assets/" + shapeType + ".svg", callback);
}

Ska.useShapeToObject = function(element, shapeType)
{
	Ska.loadToObject(element, Ska.baseUrl + "assets/" + shapeType + ".svg");
}

Ska.script = document.currentScript;

Ska.init = function()
{

	// GET BASE URL TO GET THE SVG FILES WITH AJAX
	// BECAUSE ITS LOAD IN DIRECTORY SKA-SVG/ASSETS
	// AND THIS CODE WILL SOLVE IF THE SKA-SVG
	// IS IN ANY DIRECTORY
	var i = Ska.script.src.indexOf("js/Ska");

	if(i > -1)
		Ska.baseUrl = Ska.script.src.substring(0, i);	

	// ADD GRADIENT CONTAINER
	var gradientDiv = document.createElement('div');
	gradientDiv.id = "gradientDiv";
	gradientDiv.style.height = 0;
	document.body.appendChild(gradientDiv);

	// LOAD GRADIENT FILES
	Ska.useShape("#gradientDiv", "gradients", function(){	

		var gradientDivDefs = document.querySelector('#gradientDiv defs');

		if(gradientDivDefs)
		{
			gradientDivDefs.innerHTML += Ska.gradientCache;
			Ska.gradientCache = "";
		}

	});

	// INITIALIZE SVG
	var elements = document.querySelectorAll("[data-ska-object]");

	for(var j = 0; j < elements.length; j++)
	{
		var d = elements[j].getAttribute("data-ska-object");

		if(d)
		{
			Ska.useShapeToObject(elements[j], d);
		}
	}

}

if(window)
{
	window.addEventListener('load', function() {
	    Ska.init();
	});
}

Ska.gradientCache = "";

Ska.supportedObjects = [

	{ name: "base" },

	{ name: "shape1" },
	{ name: "shape2" },
	{ name: "shape3" },
	{ name: "shape4" },
	{ name: "shape5" },
	{ name: "shape6" },
	{ name: "shape7" },
	{ name: "shape8" },
	{ name: "shape9" },
	{ name: "shape10" },
	{ name: "shape11" },

	{ name: "curtain1" },
	{ name: "curtain2" },
	{ name: "curtain3" },
	{ name: "curtain4" },
	{ name: "curtain5" },

	{ name: "wave1" },
	{ name: "wave2" },
	{ name: "wave3" },
	{ name: "wave4" },
	{ name: "wave5" },
	{ name: "wave6" },
	{ name: "wave7" },
	{ name: "wave8" },

	{ name: "shape-square" },
	{ name: "shape-pentagon" },
	{ name: "shape-hexagon" },
	{ name: "shape-pill" },

];