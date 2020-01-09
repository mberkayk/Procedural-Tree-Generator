class Branch {

	constructor(start, angle, length, size, array) {
		this.start = start;
		angleMode(DEGREES);

		this.size = size;
		this.angle = angle;
		this.length = length;

		let step = 2 * length / ((size * size) + size);
		let increment = (size) * step; 	// 	5 	4 	3 	2 	1
		let distanceFromStart = 0; 		//	5 	9 	12 	14 	15
		for(let i = 0; i < size; i++) {
			distanceFromStart += increment;
			increment -= step;
			let childStartPoint = new Point(start.x + distanceFromStart * cos(angle),
				start.y + distanceFromStart * -sin(angle));
			let childAngle = this.setChildAngle(angle);
			let childLength = (length - distanceFromStart + 15) * random(0.5, 0.75);
			let sizeDecrement = floor(random(2, 3) + i / 1.2);
			let childSize = size - sizeDecrement;
			if(childSize < 1 == false){
				array.push(new Branch(childStartPoint, childAngle, childLength,
					max(size - sizeDecrement, 0), array));
			}
		}
	}

	setChildAngle(angle){
		let childAngle = angle + random(30, 75) * random([-1, 1]);
		if(childAngle < -5) {
			childAngle = -5;
		}
		if(childAngle > 185) {
			childAngle = 185;
		}
		return childAngle;
	}
}

class Birch {

	constructor(x, y, h) {
		this.x = x;
		this.y = y;
		this.height = h;

		this.branches = [];
		this.branches.push(new Branch(new Point(width / 2, height),
		 						90, h, 16, this.branches));

		this.leaves = [];
	}

	display(g) {
		//Branches
		this.leaves = [];
		for(let i = 0; i < this.branches.length; i++) {
			let b = this.branches[i];

			let start = this.branches[i].start;
			let end = new Point(this.branches[i].start.x + b.length * cos(b.angle),
				start.y + b.length * -sin(b.angle));

			let xDiff = end.x - start.x;
			let yDiff = end.y - start.y;

			let step = 2 * b.length / ((b.size*b.size)+b.size);
			let increment = b.size * step;

			let lineStart = start;
			let lineEnd = new Point(start.x + increment * cos(b.angle),
				start.y + increment * -sin(b.angle));

			for(let j = 0; j < b.size; j++) {
				increment -= step;

				if(b.size - j <= 2){
					let numOfLeaves = 10;
					for(let k = 0; k < numOfLeaves; k++){
						this.leaves.push(new Point(
							lineStart.x + k * (lineEnd.x - lineStart.x)/numOfLeaves,
						 	lineStart.y + k * (lineEnd.y - lineStart.y)/numOfLeaves));
						}
				}else {
					g.stroke(230, 220, 180);
					g.strokeWeight(b.size - j);

					g.line(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y);
				}

				lineStart = lineEnd;
				lineEnd = new Point(lineEnd.x + increment * cos(b.angle),
					lineEnd.y + increment * -sin(b.angle));
			}
		}

		if(debug){return;}
		//Leaves
		g.noStroke();
		for(let i = 0; i < this.leaves.length; i++){
			let s = random(2, 8);
			g.fill(100, random(150, 200), 100);
			g.ellipse(this.leaves[i].x + random(-10, 10),
			 this.leaves[i].y + random(-10, 10), s, s);
		}
	}

}
