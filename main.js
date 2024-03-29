document.addEventListener("DOMContentLoaded", () => {
  let personas = JSON.parse(localStorage.getItem("personas")) || [
    { nombre: "Juan", edad: 25 },
    { nombre: "Maria", edad: 32 },
    { nombre: "Pedro", edad: 18 }
  ];

  function guardarPersonas() {
    localStorage.setItem("personas", JSON.stringify(personas));
  }

  function mostrarTabla() {
    const tbody = document.querySelector("#tabla tbody");
    tbody.innerHTML = "";
    for (const persona of personas) {
      const tr = document.createElement("tr");
      const tdNombre = document.createElement("td");
      tdNombre.textContent = persona.nombre;
      tr.appendChild(tdNombre);
      const tdEdad = document.createElement("td");
      tdEdad.textContent = persona.edad;
      tr.appendChild(tdEdad);
      tbody.appendChild(tr);
    }
  }

  function agregarPersona(nombre, edad) {
    personas.push({ nombre, edad });
    guardarPersonas();
    mostrarTabla();
  }

  function buscarPersona(nombre) {
    const resultado = personas.filter(persona => persona.nombre === nombre);
    if (resultado.length > 0) {
      let mensaje = "Personas encontradas:\n";
      for (const persona of resultado) {
        mensaje += `Nombre: ${persona.nombre}, Edad: ${persona.edad}\n`;
      }
      Swal.fire(mensaje);
    } else {
      Swal.fire("No se encontró ninguna persona con ese nombre");
    }
  }
  

  function ordenarPorEdad() {
    personas.sort((a, b) => a.edad - b.edad);
    guardarPersonas();
    mostrarTabla();
  }

  const boton = document.querySelector("#boton");
  boton.addEventListener("click", async () => {
    const { value: accion } = await Swal.fire({
      title: "¿Qué acción deseas realizar?",
      input: "select",
      inputOptions: {
        agregar: "Agregar",
        buscar: "Buscar",
        ordenar: "Ordenar"
      },
      showCancelButton: true
    });

    if (accion) {
      switch (accion) {
        case "agregar":
          const { value: nombre } = await Swal.fire({
            title: "Ingresa el nombre de la persona",
            input: "text",
            showCancelButton: true
          });
          const { value: edad } = await Swal.fire({
            title: "Ingresa la edad de la persona",
            input: "number",
            showCancelButton: true
          });
          if (nombre && edad) {
            agregarPersona(nombre, parseInt(edad));
          }
          break;
        case "buscar":
          const { value: nombreBusqueda } = await Swal.fire({
            title: "Ingresa el nombre de la persona a buscar",
            input: "text",
            showCancelButton: true
          });
          if (nombreBusqueda) {
            const resultado = buscarPersona(nombreBusqueda);
          }
          break;
        case "ordenar":
          ordenarPorEdad();
          break;
        default:
          Swal.fire("Acción no válida");
      }
    }
  });

  mostrarTabla();
});