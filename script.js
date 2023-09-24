function validarInputs() {
  var jugadores = document.getElementById("jugadores").value;
  var superficie = document.getElementById("superficie").value;
  var superficieTotal = document.getElementById("superficieTotal").value;

  if (jugadores !== "" && superficie !== "" && superficieTotal !== "") {
    document.getElementById("jugadores").disabled = true;
    document.getElementById("superficie").disabled = true;
    document.getElementById("superficieTotal").disabled = true;
  } else if (jugadores !== "" && superficie !== "") {
    document.getElementById("superficieTotal").disabled = true;
  } else if (jugadores !== "" && superficieTotal !== "") {
    document.getElementById("superficie").disabled = true;
  } else if (superficie !== "" && superficieTotal !== "") {
    document.getElementById("jugadores").disabled = true;
  } else {
    document.getElementById("jugadores").disabled = false;
    document.getElementById("superficie").disabled = false;
    document.getElementById("superficieTotal").disabled = false;
  }
}


function mostrarFigura(nombre, figura, lado, perimetro, Dv, dh) {
  var figuraElement = document.getElementById(nombre);
  // id='slider-container'
  {/* <div id="slider-container">
        <input type="range" min="0" max="100" value="0" id="slider">
        <div id="valor-variable">Valor: <span id="valor">0</span></div>
    </div> */}

  if (nombre == "rombo") {
    figuraElement.innerHTML = "<svg class='svg-containerR' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>" +
    figura +
    "<p id='context'>"+
      "<text x='50' y='20' class='text' id='variablelarombo'>Lado=<span id='ladorombo'>" + lado + "</span></text><br>" +
      "<text x='50' y='40' class='text' id='variableDvrombo'>Diagonal Vertical=<span id='Dvrombo'>" + Dv + "</span></text><br>" +
      "<text x='50' y='60' class='text' id='variabledhrombo'>Diagonal Horizontal=<span id='dhrombo'>" + dh + "</span></text><br>" +
      "<text x='50' y='80' class='text' id='variableperimetrorombo'>Perimetro=<span id='perimetrorombo'>" + perimetro + "</span></text></p><br>" +
    "   <p id='slider-container'><input type='range' min='1' max='100' value='50' id='slider'></p>" +
    "     <p id='valor-variable'>Varia Diagonales: <span id='valor'>50</span></p>" +
    "</svg>";

  } else {
    figuraElement.innerHTML = "<svg class='svg-container' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>" +
      figura +
      "<text x='50' y='40' class='text'>Lado=" + lado + "</text>" +
      "<text x='50' y='65' class='text'>Perímetro=" + perimetro + "</text> </svg>";
  }
}


function calcularSuperficie() {
  var jugadores = parseFloat(document.getElementById("jugadores").value);
  var superficie = parseFloat(document.getElementById("superficie").value);
  var superficieTotal = parseFloat(
    document.getElementById("superficieTotal").value
  );

  if (!isNaN(jugadores) && !isNaN(superficie) && isNaN(superficieTotal)) {
    superficieTotal = jugadores * superficie;
    document.getElementById("superficieTotal").value =
      superficieTotal.toFixed(1);
    document.getElementById("jugadores").disabled = true;
    document.getElementById("superficie").disabled = true;
    document.getElementById("superficieTotal").disabled = true;
  } else if (
    !isNaN(jugadores) &&
    isNaN(superficie) &&
    !isNaN(superficieTotal)
  ) {
    superficie = superficieTotal / jugadores;
    document.getElementById("superficie").value = superficie.toFixed(1);
    document.getElementById("jugadores").disabled = true;
    document.getElementById("superficie").disabled = true;
    document.getElementById("superficieTotal").disabled = true;
  } else if (
    isNaN(jugadores) &&
    !isNaN(superficie) &&
    !isNaN(superficieTotal)
  ) {
    jugadores = superficieTotal / superficie;
    document.getElementById("jugadores").value = jugadores.toFixed(1);
    document.getElementById("jugadores").disabled = true;
    document.getElementById("superficie").disabled = true;
    document.getElementById("superficieTotal").disabled = true;
    document.getElementById("boton").disabled = true;
  }

  if ((superficieTotal > 0) && (jugadores > 0) && (superficie > 0)) {
    var triangulo = Math.sqrt(superficieTotal * 2).toFixed(1);
    var cuadrado = Math.sqrt(superficieTotal).toFixed(1);
    var pentagono = Math.sqrt(superficieTotal / 1.720477401).toFixed(1);
    var hexagono = Math.sqrt(superficieTotal / 2.598076211).toFixed(1);

    var triangulof =
      "<polygon points='50,5 95,95 5,95' style='fill: #FF0000;'></polygon>";
    var cuadradof =
      "<rect x='5' y='5' width='90' height='90' style='fill: #FF0000;'></rect>";
    var pentagonof =
      "<polygon points='50,5 95,30 80,85 20,85 5,30' style='fill: #FF0000;'></polygon>";
    var hexagonof =
      "<polygon points='50,5 90,25 90,75 50,95 10,75 10,25' style='fill: #FF0000;'></polygon>";
    var rombof =
      "<polygon id='prombo' points='50,0 70,50 50,100 30,50' style='fill: #FF0000;'></polygon>";

    var perimetroTriangulo = (triangulo * 3).toFixed(1);
    var perimetroCuadrado = (cuadrado * 4).toFixed(1);
    var perimetroPentagono = (pentagono * 5).toFixed(1);
    var perimetroHexagono = (hexagono * 6).toFixed(1);
    var perimetroRombo = "";
    var rombol = "";
    var romboDv = "";
    var rombodh = "";

    mostrarFigura("triangulo", triangulof, triangulo, perimetroTriangulo);
    mostrarFigura("cuadrado", cuadradof, cuadrado, perimetroCuadrado);
    mostrarFigura("pentagono", pentagonof, pentagono, perimetroPentagono);
    mostrarFigura("hexagono", hexagonof, hexagono, perimetroHexagono);
    mostrarFigura("rombo", rombof, rombol, perimetroRombo, romboDv, rombodh);
    // Asigna el evento 'input' al slider para actualizar el valor rombo
    slider.addEventListener("input", actualizarValor);

    // Llama a la función inicialmente para mostrar el valor inicial rombo
    actualizarValor();

  } else {
    document.getElementById("triangulo").innerHTML = "";
    document.getElementById("cuadrado").innerHTML = "";
    document.getElementById("pentagono").innerHTML = "";
    document.getElementById("hexagono").innerHTML = "";
    document.getElementById("rombo").innerHTML = "";
  }
}


// Función para actualizar el valor de la variable y el texto
function actualizarValor() {
  // Obtén referencias a los elementos HTML que necesitamos
  var superficieTotal = parseFloat(
    document.getElementById("superficieTotal").value
  );
  var polygon = document.getElementById("prombo");

  const slider = document.getElementById("slider");
  const valorVariable = document.getElementById("valor");
  const ladoVariable = document.getElementById("ladorombo");
  const DvVariable = document.getElementById("Dvrombo");
  const dhVariable = document.getElementById("dhrombo");
  const perimetroVariable = document.getElementById("perimetrorombo");
  const valor = slider.value;
  var rombofactordiagonal = (slider.value / 100).toFixed(2);
  var nuevoPuntoIzquierdo = ((100 - valor)/2).toFixed(0);
  var nuevoPuntoDerecho = (50 +( valor/2));
// alert(nuevoPuntoDerecho +" "+ nuevoPuntoIzquierdo);
  // Actualiza el atributo "points" del polygon con los nuevos valores
  polygon.setAttribute("points", "50,0 " + nuevoPuntoDerecho + ",50 50,100 " + nuevoPuntoIzquierdo + ",50");

  var romboDv = (
    Math.sqrt(superficieTotal * 2 / rombofactordiagonal)
  ).toFixed(1);
  var rombodh = (romboDv * rombofactordiagonal).toFixed(1);
  var rombol = Math.sqrt((0.25 * romboDv * romboDv) + (0.25 * rombodh * rombodh)).toFixed(1);
  var perimetroRombo = (rombol * 4).toFixed(1);


  valorVariable.textContent = `${valor}`;
  ladoVariable.textContent = `${rombol}`;
  DvVariable.textContent = `${romboDv}`;
  dhVariable.textContent = `${rombodh}`;
  perimetroVariable.textContent = `${perimetroRombo}`;
}


function resetear() {
  document.getElementById("jugadores").value = "";
  document.getElementById("superficie").value = "";
  document.getElementById("superficieTotal").value = "";
  document.getElementById("jugadores").disabled = false;
  document.getElementById("superficie").disabled = false;
  document.getElementById("superficieTotal").disabled = false;
  document.getElementById("boton").disabled = false;
  document.getElementById("triangulo").innerHTML = "";
  document.getElementById("cuadrado").innerHTML = "";
  document.getElementById("pentagono").innerHTML = "";
  document.getElementById("hexagono").innerHTML = "";
  document.getElementById("rombo").innerHTML = "";
}