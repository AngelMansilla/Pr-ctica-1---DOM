// Variables globales
let area;
let cube;
let cube1;
let cube2;
let cube3;
let acctions = [];
let mousePos;
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
main.parentElement.insertBefore(area, main);
let divInfo2 = document.createElement("div");
main.parentElement.insertBefore(divInfo2, main);

// Añadir cuadno el cursor se mueve en el area
area.addEventListener('mousemove', (event) => {
	mousePos = oMousePos(area, event);
	marcarCoords(divInfo, mousePos.x, mousePos.y);
});
// Eliminar cuadno el cursor sale del area
area.addEventListener("mouseout", function () {
	limpiarCoords(divInfo);
});

// Seleccionar la posicion del cursor
function oMousePos(area, event) {
	var ClientRect = area.getBoundingClientRect();
	return { //objeto
		x: Math.round(event.clientX - ClientRect.left),
		y: Math.round(event.clientY - ClientRect.top)
	}
}

// Para pintar las cordenadas
function marcarCoords(divInfo, x, y) {
	divInfo.innerHTML = ("x: " + x + ", y: " + y);
	divInfo.style.border = "1px solid #d9d9d9";
	divInfo.style.width = "105px";
	divInfo.style.textAlign = "center";
	divInfo.style.margin = "auto";
	divInfo.style.marginTop = "10px";
}
// Para limpiar las coordenadas
function limpiarCoords(divInfo) {
	divInfo.innerHTML = "";
	divInfo.style.backgroundColor = "transparent"
}

// Pieza que queremos mover
cube = document.createElement("div");
cube.style.background = "red";
cube.style.width = "50px";
cube.style.height = "50px";
cube.style.position = "absolute";
cube.style.top = "200px";
cube.style.left = "200px";

area.appendChild(cube);
// Contador para cada cuadrado
let instance = 1;
// Damos formato al div qeu guarda los cubos eliminados:

divInfo2.style.display = "flex";
divInfo2.style.flexWrap = "wrap";
divInfo2.style.marginLeft = "10%";
divInfo2.style.marginRight = "10%";

// Al acer click llamamos a la funcion
area.addEventListener("click", function (event) {
	// En caso de ser un elemento con la classe cube borraremos si no es asi creamos el cubo
	if (event.target.getAttribute("class") == "cube") {
		// Comprobamos el id que tiene para proceder a borrar
		let cubeId = event.target.getAttribute("id");
		cube2 = document.getElementById(cubeId);
		area.removeChild(cube2);
		// Creamos un div para guardar los id de los cubos eliminados
		cube3 = document.createElement("div");
		cube3.innerHTML = ("id: " + cubeId);
		cube3.style.border = "1px solid #d9d9d9";
		cube3.style.width = "105px";
		cube3.style.textAlign = "center";
		cube3.style.margin = "auto";
		cube3.style.marginTop = "10px";
		divInfo2.appendChild(cube3);
	} else {
		// Creamos un cuadrado nuevo con sus caracteristicas
		cube1 = document.createElement("div");
		cube1.id = "cube" + instance;
		cube1.className = "cube";
		cube1.innerHTML = instance++;
		cube1.style.display = "flex";
		cube1.style.alignItems = "center";
		cube1.style.justifyContent = "center";
		// Seleccionamos el color del cubo principal
		cube1.style.background = cube.style.background;
		cube1.style.width = "50px";
		cube1.style.height = "50px";
		cube1.style.position = "absolute";
		// Seleccionamos la cordenada y para colocar el cuadrado
		cube1.style.top = mousePos.y + "px";
		// Seleccionamos la cordenada x para colocar el cuadrado
		cube1.style.left = mousePos.x + "px";
		area.appendChild(cube1);
	}
});


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
		case "BracketRight": // Para la tecla del +
			addAction("+");
			break;
		case "Slash": // Para la tecla del -
			addAction("-");
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
// Aumentamos el tamaño de 10 en 10
function increase(cube) {
	// Realizamos solo de un lado porque al ser un cuadrado es igual en ambos ejes
	// Eliminamos px del tamaño y multiplicamos por 1 para convertir a numero
	let increase = cube.style.width.replace('px', '') * 1 + 10;
	cube.style.width = increase + "px";
	cube.style.height = increase + "px";
}
// Reducimos el tamaño de 10 en 10
function reduce(cube) {
	// Realizamos solo de un lado porque al ser un cuadrado es igual en ambos ejes
	// Eliminamos px del tamaño y multiplicamos por 1 para convertir a numero
	let increase = cube.style.width.replace('px', '') * 1 - 10;
	// Comprobando solo un lado sirve al ser un cuadrado.
	if (increase > 20) { // Tiene en cuenta que si es mejor de 20 px no podemos reudicr mas porque seria el tamaño menos de 10
		cube.style.width = increase + "px";
		cube.style.height = increase + "px";
	}
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
	span.addEventListener('click', function () {
		let index = acctions.findIndex((action) => {
			console.log(action.span);
			console.log(this);
			return (action.span == this);
		});
		console.log(index);
		acctions.splice(index, 1);
		this.remove();
	});
	area.appendChild(span);
}

let mapActions = new Map([
	["up", moveUp],
	["down", moveDown],
	["left", moveLeft],
	["right", moveRight],
	["+", increase],
	["-", reduce],
	["color", randomColor]
])

function executeAcctions() {
	if (acctions.length > 0) {
		let action = acctions.shift();
		mapActions.get(action.action).call(null, cube);
		action.span.remove();
		setTimeout(executeAcctions, 50);
		console.log("retorno: ");
	} else {
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

