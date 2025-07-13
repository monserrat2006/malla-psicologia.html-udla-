const malla = [
  { nombre: "Semestre 1", ramos: [
    { id: "intro_datos", nombre: "Introducción al Análisis de Datos" },
    { id: "fund_bio", nombre: "Fundamentos Biológicos de la Psicología" },
    { id: "intro_psico", nombre: "Introducción a la Psicología" },
    { id: "habilidades1", nombre: "Habilidades Profesionales I" },
    { id: "fund_sociales", nombre: "Fundamentos Sociales de la Psicología" },
    { id: "fund_epist", nombre: "Fundamentos Epistemológicos de las Ciencias Sociales" }
  ]}
];

const aprobados = new Set(JSON.parse(localStorage.getItem("ramosAprobados")) || []);

function crearMalla() {
  const contenedor = document.getElementById("malla-container");
  contenedor.innerHTML = "";

  malla.forEach(semestre => {
    const div = document.createElement("div");
    div.className = "semestre";

    const titulo = document.createElement("div");
    titulo.className = "titulo-semestre";
    titulo.textContent = semestre.nombre;
    div.appendChild(titulo);

    semestre.ramos.forEach(ramo => {
      const boton = document.createElement("div");
      boton.className = "ramo";
      boton.textContent = ramo.nombre;

      if (aprobados.has(ramo.id)) {
        boton.classList.add("aprobado");
      }

      boton.onclick = () => {
        if (boton.classList.contains("aprobado")) {
          aprobados.delete(ramo.id);
        } else {
          aprobados.add(ramo.id);
        }
        localStorage.setItem("ramosAprobados", JSON.stringify([...aprobados]));
        crearMalla();
      };

      div.appendChild(boton);
    });

    contenedor.appendChild(div);
  });
}

document.getElementById("form-colores").onsubmit = (e) => {
  e.preventDefault();
  document.documentElement.style.setProperty("--fondo", document.getElementById("color-fondo").value);
  document.documentElement.style.setProperty("--texto", document.getElementById("color-texto").value);
  document.documentElement.style.setProperty("--ramos", document.getElementById("color-ramos").value);
};

crearMalla();

