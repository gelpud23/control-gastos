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
