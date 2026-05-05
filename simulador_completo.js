
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
function ocultarSeccion(){
  let componente = document.getElementById("parametros");
  let listaClass = componente.classList;
  listaClass.remove("activa");

  let componentes2 = document.getElementById("clientes")
  let listaClass2 = componente.classList;
  listaClass2.remove("activa");
}

function mostrarSeccion(id){
  ocultarSeccion()

  let componente = document.getElementById(id);
  let listaClass = componente.classList;
  listaClass.add("activa");

}

function guardarTasa(){
  let tasa = recuperarInt("tasaInteres")
  if(tasa >= 10 && tasa <= 20){
    mostrarTexto("mensajeTasa","Tasa configurada correctamente: "+ tasa + "%")
  }else{
    mostrarTexto("mensajeTasa","La tasa debe estar entre 10 y 20")
  }
}

// Función para guardar los datos del cliente
function guardarCliente(){
    let cedula = recuperaraTexto("idCedula")
    let nombre = recuperaraTexto("idNombre")
    let apellido = recuperaraTexto("idApellido")
    let numIngresos = recuperarInt("idIngresos")
    let numEgresos = recuperarInt("idEgresos")
    let cliente = {}
    cliente.cedula = cedula
    cliente.nombre = nombre
    cliente.apellido = apellido
    cliente.numIngresos = numIngresos
    cliente.numEgresos = numEgresos

    let busqueda = buscarCliente(cedula)
    if(busqueda == null){
      clientes.push(cliente)
      pintarClientes()
    }else{
      busqueda.nombre = nombre
      busqueda.apellido = apellido
      busqueda.numIngresos = numIngresos
      busqueda.numEgresos = numEgresos
      //clientes.push(busqueda)
      pintarClientes()
    }
    limpiar()
}

// Función para mostrar la lista de clientes con sus datos
function pintarClientes(){
  let contenidoTabla = `<tbody id="tablaClientes">`
  let tabla = document.getElementById("tablaClientes")
  for(let i = 0; i < clientes.length; i++ ){
    let elementoCliente = clientes[i]
    contenidoTabla += `<tr>
          <td>${elementoCliente.cedula}</td>
          <td>${elementoCliente.nombre}</td>
          <td>${elementoCliente.apellido}</td>
          <td>${elementoCliente.numIngresos}</td>
          <td>${elementoCliente.numEgresos}</td>
          <td>
            <button onclick="seleccionarCliente(${elementoCliente.cedula})">Actualizar</button>
            <button onclick="Limpiar">Eliminar</button>
          </td>
        </tr>`
  }
  contenidoTabla += "</tbody>"
  tabla.innerHTML = contenidoTabla
}

function buscarCliente(cedula){
  let clienteEncontrado = null
  let unidadCliente
  for(let i = 0; i < clientes.length; i++){
    unidadCliente = clientes[i]
    if(unidadCliente.cedula == cedula){
      clienteEncontrado = unidadCliente
      break
    }
  }
  return clienteEncontrado
}

function seleccionarCliente(cliente){
  let resultado = buscarCliente(cliente.cedula)
  if(resultado != null){
    clienteSeleccionado = resultado
    mostrarTextoEnCaja("idCedula",clienteSeleccionado.cedula)
    mostrarTextoEnCaja("idNombre",clienteSeleccionado.nombre)
    mostrarTextoEnCaja("idApellido",clienteSeleccionado.apellido)
    mostrarTextoEnCaja("idIngresos",clienteSeleccionado.numIngresos)
    mostrarTextoEnCaja("idEgresos",clienteSeleccionado.numEgresos)
  }
}

function limpiar(){
  mostrarTextoEnCaja("idCedula","")
  mostrarTextoEnCaja("idNombre","")
  mostrarTextoEnCaja("idApellido","")
  mostrarTextoEnCaja("idIngresos","")
  mostrarTextoEnCaja("idEgresos","")
}
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios