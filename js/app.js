const PRESUPUESTO = 500000;
const CLAVE_STORAGE = "gastos";

const formulario = document.querySelector("#formulario");
const inputDescripcion = document.querySelector("#descripcion");
const inputValor = document.querySelector("#valor");
const selectCategoria = document.querySelector("#categoria");
const errorDescripcion = document.querySelector("#error-descripcion");
const errorValor = document.querySelector("#error-valor");
const errorCategoria = document.querySelector("#error-categoria");
const selectFiltro = document.querySelector("#filtro");
const tabla = document.querySelector("#tabla-gastos");
const cuerpoTabla = document.querySelector("#cuerpo-tabla");
const mensajeVacio = document.querySelector("#mensaje-vacio");
const parrafoTotal = document.querySelector("#total");
const textoTotal = document.querySelector("#total-valor");
const textoPresupuesto = document.querySelector("#presupuesto");

const formatoPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

let gastos = [];

function render() {
  cuerpoTabla.textContent = "";

  gastos.forEach(function (gasto) {
    const fila = document.createElement("tr");

    const celdaDescripcion = document.createElement("td");
    celdaDescripcion.textContent = gasto.descripcion;

    const celdaCategoria = document.createElement("td");
    celdaCategoria.textContent = gasto.categoria;

    const celdaValor = document.createElement("td");
    celdaValor.textContent = formatoPesos.format(gasto.valor);

    const celdaAccion = document.createElement("td");
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("boton-eliminar");
    botonEliminar.dataset.id = gasto.id;
    celdaAccion.appendChild(botonEliminar);

    fila.append(celdaDescripcion, celdaCategoria, celdaValor, celdaAccion);
    cuerpoTabla.appendChild(fila);
  });

  mensajeVacio.hidden = gastos.length > 0;
}

render();

function limpiarErrores() {
  errorDescripcion.textContent = "";
  errorValor.textContent = "";
  errorCategoria.textContent = "";
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  limpiarErrores();

  const descripcion = inputDescripcion.value.trim();
  const textoValor = inputValor.value.trim();
  const valor = Number(textoValor);
  const categoria = selectCategoria.value;

  let hayErrores = false;

  if (descripcion === "") {
    errorDescripcion.textContent = "La descripción es obligatoria.";
    hayErrores = true;
  }

  if (textoValor === "") {
    errorValor.textContent = "El valor es obligatorio.";
    hayErrores = true;
  } else if (isNaN(valor) || valor <= 0) {
    errorValor.textContent = "El valor debe ser mayor que cero.";
    hayErrores = true;
  }

  if (categoria === "") {
    errorCategoria.textContent = "Selecciona una categoría.";
    hayErrores = true;
  }

  if (hayErrores) {
    return;
  }

  const nuevoGasto = {
    id: Date.now(),
    descripcion: descripcion,
    valor: valor,
    categoria: categoria
  };

  gastos.push(nuevoGasto);
  render();
  formulario.reset();
  inputDescripcion.focus();
});
tabla.addEventListener("click", function (evento) {
  if (!evento.target.classList.contains("boton-eliminar")) {
    return;
  }
  const id = Number(evento.target.dataset.id);
  gastos = gastos.filter(function (gasto) {
    return gasto.id !== id;
  });
  render();
});