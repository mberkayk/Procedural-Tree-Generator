let g;

let rndBtn;
let tree;

let debugCheckBox;
let debug;

let treeSelect;

function setup() {
	noLoop();
	rndBtn = select('#rndBtn');
	rndBtn.mousePressed(randomize);

	debugChecBox = select('#debugChecBox');
	debugChecBox.changed(function () {debug = debugChecBox.checked();redraw();});

	treeSelect = select('#treeSelect');

	createCanvas(500, 500);

	//tree = new Spruce(width / 2 - 200/6, height, 200, 400, 5);
	tree = new Birch(width/2, height, random(270, 400));
	g = createGraphics(width, height);
}


function draw() {
	g.background(110, 20, 120);
	tree.display(g);
	image(g, 0, 0, width, height);
}

function randomize() {
	let treeSelectValue = treeSelect.value();
	if(treeSelectValue == 'simple_spruce'){
						 // SimpleSpruce(x, y, width, height, numberOfTriangles)
		tree = new SimpleSpruce(width / 2 - 200/6, height, random(100, 300),
		random(100, 400), floor(random(3, 6)));

	}else if(treeSelectValue == 'spruce'){
		tree = new Spruce(width/2, height, random(270, 400));
	}else if(treeSelectValue == 'birch'){
		tree = new Birch(width/2, height, random(270, 400));
	}
	redraw();
}
