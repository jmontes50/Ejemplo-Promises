let buscarProducto = (id) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    //mediante el listener onreadystatechange
    //escuchamos el estado de readyState
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status != 200) {
          //ERROR!!!!!!!!!!!
          reject("No existe!!!");
        } else {
          console.log(xhr.status);
          //EXITOOOOOOOO!!!!!!
          //Y devolvemos en el resolve la respuesta
          //convirtiendola a un objeto
          let objRpta = JSON.parse(xhr.responseText);
          resolve(objRpta);
        }
      }
    };
    let url = `https://5e22b9e7afee990014e59669.mockapi.io/productos/${id}`;
    //ejecutamos la Petición GET a Mockapi
    xhr.open("GET", url);
    xhr.send(null);
  });
};

let buscarCliente = () => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (status != 200) {
          reject("no existe el cliente");
        }
      } else {
        if (xhr.responseText != "") {
          let objRpta = JSON.parse(xhr.responseText);
          resolve(objRpta);
        }
      }
    };
    let url = `https://5e22b9e7afee990014e59669.mockapi.io/cliente/100`;
    //ejecutamos la Petición GET a Mockapi
    xhr.open("GET", url);
    xhr.send(null);
  });
};

let btnbuscar = document.getElementById("btnbuscar");

btnbuscar.addEventListener("click", () => {
  let input = document.getElementById("inputbuscar");
  let divresultado = document.getElementById("resultado");
  //como buscarProducto devuelve una promesa tenemos que obtener el resultado con
  //.then si es que hay exito o .catch si es que hay un error
  buscarProducto(input.value)
    .then((respuesta) => {
      console.log("rpta", respuesta);
      divresultado.innerHTML = respuesta.prod_nom;
      //returnar una nueva promesa
      return buscarCliente();
    }).then((rptaCliente) => {
        console.log("cliente",rptaCliente);
    })
    .catch((err) => {
      console.log(err);
      divresultado.innerHTML = "El Producto no existe";
    });
});
