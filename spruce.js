class SpruceBranch {

	constructor(start, angle, length, size, array) {
		this.start = start;
		angleMode(DEGREES);

		this.size = size;
		this.angle = angle;
		this.length = length;

		let step = 2 * length / ((size * size) + size);
		let increment = (size) * step;
		let distanceFromStart = 0;
		for(let i = 0; i < size; i++) {
			distanceFromStart += increment;
			increment -= step;
			let childStartPoint = new Point(start.x + distanceFromStart * cos(angle),
				start.y + distanceFromStart * -sin(angle));
			//let childAngle = this.setChildAngle(angle);
			let childAngle = 0;
			let childLength = (length - distanceFromStart + 15) * random(0.5, 0.75);
			let sizeDecrement = floor(random(2, 3) + i);
			let childSize = size - sizeDecrement;
			if(childSize < 1 == false){
				array.push(new SpruceBranch(childStartPoint, childAngle, childLength,
					max(size - sizeDecrement, 0), array));
				array.push(new SpruceBranch(childStartPoint,
					this.angle - (childAngle - this.angle),
					childLength, max(size - sizeDecrement, 0), array));
			}
		}
	}

	setChildAngle(angle){
		let childAngle = angle + random(30, 70) * random([-1, 1]);
		if(childAngle < -5) {
			childAngle = -5;
		}
		if(childAngle > 185) {
			childAngle = 185;
		}
		return childAngle;
	}
}

class Spruce {

	constructor(x, y, h) {
		this.x = x;
		this.y = y;
		this.height = h;

		this.branches = [];
		this.branches.push(new SpruceBranch(new Point(width / 2, height),
		 						90, h, 5, this.branches));

		this.leaves = [];
		this.generateLeaves();
	}

	generateLeaves(){
		for(let i = 0 ; i < this.branches.length; i++){
			let b = this.branches[i];
			if(b.size < 2){
				// branch start angle length
				this.leaves.push([b.start,
					new Point(b.start.x + cos(b.angle)*b.length,
					b.start.y + -sin(b.angle)*b.length)]);
				this.branches.splice(i, 1);
				i--;
			}
		}
	}

	display(g) {
		//Branches
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
				g.stroke(60, 35, 20);
				g.strokeWeight(b.size - j);

				g.line(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y);

				lineStart = lineEnd;
				lineEnd = new Point(lineEnd.x + increment * cos(b.angle),
					lineEnd.y + increment * -sin(b.angle));
			}
		}

		if(debug) return;
		//Leaves
		for(let i = 0; i < this.leaves.length; i++){
			g.stroke(150, 230, 130);
			g.strokeWeight(1);
			g.line(this.leaves[i][0].x, this.leaves[i][0].y,
				this.leaves[i][1].x, this.leaves[i][1].y)
		}
	}

}
