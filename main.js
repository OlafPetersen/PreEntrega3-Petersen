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
  boton.addEventListener("click", () => {
    const accion = prompt("¿Qué acción deseas realizar? (mostrar, agregar, buscar, ordenar)");
    switch (accion) {
      case "mostrar":
        mostrarTabla();
        break;
      case "agregar":
        const nombre = prompt("Ingresa el nombre de la persona");
        const edad = parseInt(prompt("Ingresa la edad de la persona"));
        agregarPersona(nombre, edad);
        break;
      case "buscar":
        const nombreBusqueda = prompt("Ingresa el nombre de la persona a buscar");
        const resultado = buscarPersona(nombreBusqueda);
        console.table(resultado);
        break;
      case "ordenar":
        ordenarPorEdad();
        break;
      default:
        alert("Acción no válida");
    }
  });
});