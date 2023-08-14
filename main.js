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
    console.table(personas);
  }

  function agregarPersona(nombre, edad) {
    personas.push({ nombre, edad });
    guardarPersonas();
  }

  function buscarPersona(nombre) {
    return personas.filter(persona => persona.nombre === nombre);
  }

  function ordenarPorEdad() {
    personas.sort((a, b) => a.edad - b.edad);
    guardarPersonas();
  }

  const boton = document.querySelector("#boton");
  boton.addEventListener("click", async () => {
    const { value: accion } = await Swal.fire({
      title: "¿Qué acción deseas realizar?",
      input: "select",
      inputOptions: {
        mostrar: "Mostrar",
        agregar: "Agregar",
        buscar: "Buscar",
        ordenar: "Ordenar"
      },
      showCancelButton: true
    });

    if (accion) {
      switch (accion) {
        case "mostrar":
          mostrarTabla();
          break;
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
            console.table(resultado);
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
});