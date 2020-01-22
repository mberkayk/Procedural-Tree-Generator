class SimpleSpruce {

	constructor(x, y, treeWidth, treeHeight, n) {

		this.x = x; //trunk's left edge
		this.y = y; //trunk's bottom edge
		this.treeWidth = treeWidth;
		this.treeHeight = treeHeight;

		this.numOfTri = n; // number of triangles
		this.vertices = [];

		this.trunkHeight = treeHeight * random(0.2, 0.30);
		this.trunkWidth = treeWidth * random(0.15, 0.30);

		this.trunkColor = color(45, 15, 15);
		this.leafColor = color(60, 120, 70);

		this.innerLine;
		this.outerLine;

		this.createTriangles();
	}

	createTriangles() {
		this.innerLine = [new Point(this.x - this.treeWidth / 4, this.y - this.trunkHeight),
			new Point(this.x + this.trunkWidth / 2, this.y - this.treeHeight)
		];

		this.outerLine = [new Point((this.x + this.trunkWidth / 2) - this.treeWidth / 2,
				this.y - this.trunkHeight),
			new Point((this.x + this.trunkWidth / 2) - (1 / 5) * (this.treeWidth / 2),
				(this.y - this.trunkHeight - (this.treeHeight - this.trunkHeight)))
		];

		let outerLineSlope = (this.outerLine[0].y - this.outerLine[1].y)
			/ (this.outerLine[1].x - this.outerLine[0].x);
		let innerLineSlope = (this.innerLine[0].y - this.innerLine[1].y)
			/ (this.innerLine[1].x - this.innerLine[0].x);

		let yStep = ((this.treeHeight - this.trunkHeight) * 2)
			/ (this.numOfTri * this.numOfTri + this.numOfTri);

		let ox = this.outerLine[0].x;
		let oy = this.outerLine[0].y;

		let ix = this.innerLine[0].x;
		let iy = this.innerLine[0].y;

		this.vertices = [];
		//Left Side of the Leaves
		for(let i = 0; i < this.numOfTri; i++) {
			this.vertices.push(new Point(ox, oy));
			iy -= yStep * (this.numOfTri - i);
			ix += yStep * (this.numOfTri - i) / innerLineSlope;
			this.vertices.push(new Point(ix, iy));

			oy -= yStep * (this.numOfTri - i);
			ox += yStep * (this.numOfTri - i) / outerLineSlope;
		}

		//Mirror the left side
		for(let i = this.vertices.length - 2; i >= 0; i--) {
			let x = this.vertices[i].x + 2 * ((this.x + this.trunkWidth / 2) - this.vertices[i].x);
			let y = this.vertices[i].y;
			this.vertices.push(new Point(x, y));
		}

	}

	display(g) {
		g.noStroke();
		//Trunk
		g.fill(this.trunkColor);
		g.rect(this.x, this.y - this.trunkHeight, this.trunkWidth, this.trunkHeight);

		//Leaves
		g.strokeWeight(4);
		g.fill(this.leafColor);
		g.stroke(this.leafColor);
		g.beginShape();
		for(let i = 0; i < tree.vertices.length; i++) {
			let v = tree.vertices[i];
			g.vertex(v.x, v.y);
		}
		g.endShape(CLOSE);

		// DEBUG
		if(debug) {
			g.strokeWeight(2);
			g.stroke(color(200, 100, 100));
			g.line(this.innerLine[0].x, this.innerLine[0].y, this.innerLine[1].x, this.innerLine[1].y);
			g.line(this.outerLine[0].x, this.outerLine[0].y, this.outerLine[1].x, this.outerLine[1].y);
			g.strokeWeight(1);
			g.stroke(255);
			g.noFill();
			g.rect(this.x + this.trunkWidth / 2 - this.treeWidth / 2, g.height, this.treeWidth, -this.treeHeight)
		}

	}
}
