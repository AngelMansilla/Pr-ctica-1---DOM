// Variables globales
let area;
let cube;
let acctions = [];
// Área para el proyecto
let main = document.getElementsByTagName("main")[0];
area = document.createElement("div");
area.classList.add("container");
area.style.border = "2px solid red";
area.style.height = "400px";
area.style.position = "relative";
main.parentElement.insertBefore(area, main);
let divInfo = document.createElement("div");
main.parentElement.insertBefore(divInfo, main);

area.addEventListener('mouseenter', (event) =>{
	// En divInfo tenemos que pegar las coordenadas
})

// Pieza que queremos mover
cube = document.createElement("div");
cube.style.background = "red";
cube.style.width = "50px";
cube.style.height = "50px";
cube.style.position = "absolute";
cube.style.top = "100px";
cube.style.left = "150px";

area.appendChild(cube);

document.addEventListener("keydown", function (event) {
	console.log(event.code);
	switch (event.code) {
		case "ArrowUp":
			addAction("up");
			break;
		case "ArrowDown":
			addAction("down");
			break;
		case "ArrowLeft":
			addAction("left");
			break;
		case "ArrowRight":
			addAction("right");
			break;
		case "KeyC":
			addAction("color");
			break;
		case "Enter":
			executeAcctions();
			break;
		default:
			break;
	}
	event.preventDefault();
});

function moveUp(cube) {
	let top = cube.offsetTop;
	top -= 10;
	top = (top < 0) ? 0 : top;
	cube.style.top = top + "px";
}
function moveDown(cube) {
	let top = cube.offsetTop;
	top += 10;
	top = (top > area.offsetHeight - cube.offsetHeight) ? area.offsetHeight
		- cube.offsetHeight : top;
	cube.style.top = top + "px";
}
function moveLeft(cube) {
	let left = cube.offsetLeft;
	left -= 10;
	left = (left < 0) ? 0 : left;
	cube.style.left = left + "px";
}
function moveRight(cube) {
	let left = cube.offsetLeft;
	left += 10;
	left = (left > area.offsetWidth - cube.offsetWidth) ? area.offsetWidth -
		cube.offsetWidth : left;
	cube.style.left = left + "px";
}
function randomColor(cube) {
	let r = Math.floor((Math.random() * 256));
	let g = Math.floor((Math.random() * 256));
	let b = Math.floor((Math.random() * 256));
	cube.style.background = `rgb(${r}, ${g}, ${b})`;
}

function addAction(action) {
	let span = document.createElement("span");
	acctions.push({
		action: action,
		span: span
	});
	span.textContent = action;
	span.style.padding = "10px";
	span.style.border = "1px solid #ddd";
	span.style.display = "block";
	span.style.float = "left";
	span.style.margin = "2px";
	span.style.cursor = "pointer";
	span.addEventListener("mouseenter", function () {
		this.style.backgroundColor = "red";
		this.style.color = "white";
	});
	span.addEventListener("mouseleave", function () {
		this.style.backgroundColor = "white";
		this.style.color = "black";
	});
	span.addEventListener('click', function(){
		let index = acctions.findIndex((action) => {
			console.log(action.span);
			console.log(this);
			return (action.span == this);
		});
		console.log(index);
		acctions.splice(index,1);
		this.remove();
	});
	area.appendChild(span);
}

let mapActions = new Map([
	["up", moveUp],
	["down",moveDown],
	["left",moveLeft],
	["right",moveRight],
	["color",randomColor]
])

function executeAcctions() {
	if (acctions.length > 0) {
		let action = acctions.shift();
		mapActions.get(action.action).call(null, cube);
		action.span.remove();
		setTimeout(executeAcctions, 50);
		console.log("retorno: ");
	} else{
		console.log("Fin de la recursividad");
	}
}

span.addEventListener("click", function () {
	let index = acctions.findIndex((action) => {
		return action.span === this;
	})
	acctions.splice(index, 1);
	this.remove();
})

