
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

  let componentes3 = document.getElementById("credito")
  let listaClass3 = componente.classList;
  listaClass3.remove("activa");

  let componentes4 = document.getElementById("listaCreditos")
  let listaClass4 = componente.classList;
  listaClass4.remove("activa");

}

function mostrarSeccion(id){
  ocultarSeccion()

  let componente = document.getElementById(id);
  let listaClass = componente.classList;
  listaClass.add("activa");

}

function guardarTasa(){
  tasaInteres = recuperarInt("tasaInteres")
  if(tasaInteres >= 10 && tasaInteres <= 20){
    mostrarTexto("mensajeTasa","Tasa configurada correctamente: "+ tasaInteres + "%")
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

// PARTE DOS DEL SIMULADOR

function buscarClienteCredito(){
  let tablaClienteCredito = document.getElementById("datosClienteCredito")
  let cedula = recuperaraTexto("buscarCedulaCredito")
  let clienteEncontrado = buscarCliente(cedula)
  let contenido = ""
  if(clienteEncontrado != null){
    clienteSeleccionado = clienteEncontrado
    contenido += `<h3>Datos del Cliente</h3>
                  <p><strong>Cédula: </strong>${clienteEncontrado.cedula}</p>
                  <p><strong>Nombre: </strong>${clienteEncontrado.nombre}</p>
                  <p><strong>Apellido: </strong>${clienteEncontrado.apellido}</p>
                  <p><strong>Ingresos: </strong>${clienteEncontrado.numIngresos}</p>
                  <p><strong>Egresos: </strong>${clienteEncontrado.numEgresos}</p>`
  }else{  
    clienteSeleccionado = null
    contenido += "Cliente no encontrado"
  }
  tablaClienteCredito.innerHTML = contenido
  
  
}

// Reutilizar el sistema de credito anterior, pero si quieres dominar mucho más, crealo de nuevo
function calcularDatosCredito(){
  // Verificamos que ya se a buscado y seleccionado un cliente
  if(clienteSeleccionado == null){
    return alert("Primero busque y seleccione un cliente")
  }

  let ingresos = clienteSeleccionado.numIngresos
  let egresos = clienteSeleccionado.numEgresos
  montoCalculado = parseFloat(document.getElementById("montoCredito").value)
  plazoCalculado = parseFloat(document.getElementById("plazoCredito").value)
  let resultadoCredito = document.getElementById("resultadoCredito")


  // Calculos
  let disponibleMensual = (ingresos - egresos)
  let capacidadPago = (disponibleMensual * (50/100))
  let interes = (plazoCalculado * montoCalculado *(tasaInteres/100))
  let totalPago = montoCalculado + interes
  cuotaCalculada = (totalPago/(plazoCalculado*12))

  let boton = document.getElementById("btnSolicitarCredito")

  if(cuotaCalculada > capacidadPago){
    resultadoCredito.innerHTML = `
    Capacidad de pago:  ${capacidadPago.toFixed(2)}<br>
    Total a pagar:  ${totalPago.toFixed(2)}<br>
    Cuota mensual:  ${cuotaCalculada.toFixed(2)}<br>
    RESULTADO: Rechazado`
    resultadoCredito.className = ""
    boton.disabled = true
    creditoAprobado = false
  }else{
    resultadoCredito.innerHTML = `
    Capacidad de pago:  ${capacidadPago.toFixed(2)}<br>
    Total a pagar:  ${totalPago.toFixed(2)}<br>
    Cuota mensual:  ${cuotaCalculada.toFixed(2)}<br>
    RESULTADO: Aprobado `
    resultadoCredito.className = "aprobado"
    boton.disabled = false
    creditoAprobado = true
  }

}

// arreglar y modificar variables segun las globales
function asignarCredito(){
  let credito = {
    cedula: clienteSeleccionado.cedula,
    nombre: clienteSeleccionado.nombre,
    apellido: clienteSeleccionado.apellido,
    monto: montoCalculado,
    tasa: tasaInteres,
    plazo: plazoCalculado,
    cuota: cuotaCalculada
  }
  creditos.push(credito)
}

function buscarCreditos(cedula){
  let creditosEncontrados = []
  for(let i = 0; i < creditos.length; i++){
    let unidadCredito = creditos[i]
    if(unidadCredito.cedula == cedula){
      creditosEncontrados.push(unidadCredito)
    }
  }
  return creditosEncontrados
}

function pintarCreditos(creditos){
  let tabla = document.getElementById("tablaCreditos")
  let contenidoTabla = `<tbody id="tablaCreditos">`
  for(let i = 0; i < creditos.length; i++){
    let unidadCredito = creditos[i]
    contenidoTabla += `<tr>
          <td>${unidadCredito.cedula}</td>
          <td>${unidadCredito.nombre}</td>
          <td>${unidadCredito.apellido}</td>
          <td>${unidadCredito.monto}</td>
          <td>${unidadCredito.tasa}%</td>
          <td>${unidadCredito.plazo} años</td>
          <td>${unidadCredito.cuota.toFixed(2)}</td>
          <td><button>Eliminar</button></td>
        </tr>`
  }
  contenidoTabla += "</tbody>"
  tabla.innerHTML = contenidoTabla
}

function buscarCreditosCliente(){
  let capCedula = recuperaraTexto("buscarCedulaListado")
  let resultadoCredito = buscarCreditos(capCedula)
  pintarCreditos(resultadoCredito)
}

//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios