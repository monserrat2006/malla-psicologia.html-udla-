// Import jsPDF from CDN (en index.html)
// Puedes usar jspdf.umd.js con:
// const { jsPDF } = window.jspdf;

const malla = [
  { nombre: "Semestre 1", ramos: [
    { id: "intro_datos", nombre: "Introducción al Análisis de Datos" },
    { id: "fund_bio", nombre: "Fundamentos Biológicos de la Psicología" },
    { id: "intro_psico", nombre: "Introducción a la Psicología" },
    { id: "habilidades1", nombre: "Habilidades Profesionales I" },
    { id: "fund_sociales", nombre: "Fundamentos Sociales de la Psicología" },
    { id: "fund_epist", nombre: "Fundamentos Epistemológicos de las Ciencias Sociales" }
  ]},
  { nombre: "Semestre 2", ramos: [
    { id: "fund_cient", nombre: "Fundamentos Científicos de la Psicología" },
    { id: "teorias_sociales", nombre: "Teorías Sociales" },
    { id: "epistemologia", nombre: "Epistemología para Psicología" },
    { id: "neurofisiologia", nombre: "Neurofisiología" },
    { id: "procesos", nombre: "Procesos Psicológicos" },
    { id: "seminario1", nombre: "Seminario ADAI I" }
  ]},
  { nombre: "Semestre 3", ramos: [
    { id: "desarrollo1", nombre: "Psicología del Desarrollo I" },
    { id: "psicofisiologia", nombre: "Psicofisiología" },
    { id: "psico_social", nombre: "Psicología Social" },
    { id: "habilidades2", nombre: "Habilidades Profesionales II", desbloqueadoSi: ["habilidades1"] },
    { id: "met_inv1", nombre: "Metodología de la Investigación Social I" },
    { id: "identidad", nombre: "Identidad y Personalidad" }
  ]},
  { nombre: "Semestre 4", ramos: [
    { id: "evaluacion1", nombre: "Evaluación Psicológica I" },
    { id: "desarrollo2", nombre: "Psicología del Desarrollo II", desbloqueadoSi: ["desarrollo1"] },
    { id: "psicopatologia", nombre: "Psicopatología" },
    { id: "teorias1", nombre: "Teorías Psicológicas I" },
    { id: "met_inv2", nombre: "Metodología de la Investigación Social II" },
    { id: "seminario2", nombre: "Seminario ADAI II", desbloqueadoSi: ["seminario1"] }
  ]},
  { nombre: "Semestre 5", ramos: [
    { id: "politicas", nombre: "Políticas Públicas" },
    { id: "comunitaria", nombre: "Psicología Comunitaria" },
    { id: "psiquiatria", nombre: "Psiquiatría" },
    { id: "evaluacion2", nombre: "Evaluación Psicológica II", desbloqueadoSi: ["evaluacion1"] },
    { id: "teorias2", nombre: "Teorías Psicológicas II", desbloqueadoSi: ["teorias1"] },
    { id: "emergentes", nombre: "Áreas Emergentes de la Psicología" }
  ]},
  { nombre: "Semestre 6", ramos: [
    { id: "evaluacion3", nombre: "Evaluación Psicológica III", desbloqueadoSi: ["evaluacion2"] },
    { id: "taller_invest", nombre: "Taller Integrado de Investigación Social" },
    { id: "psicoterapias1", nombre: "Psicoterapias I" },
    { id: "clinica1", nombre: "Clínica Infanto-Juvenil I" },
    { id: "comunicacion", nombre: "Psicología de la Comunicación" },
    { id: "seminario3", nombre: "Seminario ADAI III", desbloqueadoSi: ["seminario2"] }
  ]},
  { nombre: "Semestre 7", ramos: [
    { id: "evaluacion4", nombre: "Evaluación Psicológica IV", desbloqueadoSi: ["evaluacion3"] },
    { id: "proy_soc1", nombre: "Proyectos Sociales I" },
    { id: "educacional1", nombre: "Psicología Educacional I" },
    { id: "psicoterapias2", nombre: "Psicoterapias II", desbloqueadoSi: ["psicoterapias1"] },
    { id: "clinica2", nombre: "Clínica Infanto-Juvenil II", desbloqueadoSi: ["clinica1"] },
    { id: "trabajo", nombre: "Psicología del Trabajo" }
  ]},
  { nombre: "Semestre 8", ramos: [
    { id: "organizacional", nombre: "Psicología Organizacional" },
    { id: "proy_soc2", nombre: "Proyectos Sociales II", desbloqueadoSi: ["proy_soc1"] },
    { id: "educacional2", nombre: "Psicología Educacional II", desbloqueadoSi: ["educacional1"] },
    { id: "seminario1grado", nombre: "Seminario de Grado I" },
    { id: "seminario4", nombre: "Seminario ADAI IV", desbloqueadoSi: ["seminario3"] }
  ]},
  { nombre: "Semestre 9", ramos: [
    { id: "seminario2grado", nombre: "Seminario de Grado II", desbloqueadoSi: ["seminario1grado"] },
    { id: "practica1", nombre: "Práctica Profesional I" }
  ]},
  { nombre: "Semestre 10", ramos: [
    { id: "seminario_titulo", nombre: "Seminario de Título" },
    { id: "practica2", nombre: "Práctica Profesional II", desbloqueadoSi: ["practica1"] }
  ]}
];

// Manejo de ramos aprobados en localStorage
const aprobados = new Set(JSON.parse(localStorage.getItem("ramosAprobados")) || []);

// Crear la malla en el DOM
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
      const ramoDiv = document.createElement("div");
      ramoDiv.className = "ramo";
      ramoDiv.textContent = ramo.nombre;

      if (aprobados.has(ramo.id)) {
        ramoDiv.classList.add("aprobado");
      } else if (ramo.desbloqueadoSi) {
        const requisitosCumplidos = ramo.desbloqueadoSi.every(id => aprobados.has(id));
        if (!requisitosCumplidos) {
          ramoDiv.classList.add("bloqueado");
        }
      }

      ramoDiv.onclick = () => {
        if (ramoDiv.classList.contains("bloqueado")) return;
        if (ramoDiv.classList.contains("aprobado")) {
          aprobados.delete(ramo.id);
        } else {
          aprobados.add(ramo.id);
        }
        localStorage.setItem("ramosAprobados", JSON.stringify(Array.from(aprobados)));
        crearMalla();
      };

      div.appendChild(ramoDiv);
    });

    contenedor.appendChild(div);
  });
}

// Cambiar colores con CSS variables
function aplicarColoresDesdeFormulario(event) {
  event.preventDefault();
  const form = event.target;

  const colorFondo = form["color-fondo"].value;
  const colorTexto = form["color-texto"].value;
  const colorRamos = form["color-ramos"].value;
  const colorAprobado = form["color-aprobado"].value;
  const colorBloqueado = form["color-bloqueado"].value;

  document.documentElement.style.setProperty('--color-fondo', colorFondo);
  document.documentElement.style.setProperty('--color-texto', colorTexto);
  document.documentElement.style.setProperty('--color-ramos', colorRamos);
  document.documentElement.style.setProperty('--color-aprobado', colorAprobado);
  document.documentElement.style.setProperty('--color-bloqueado', colorBloqueado);

  // Opcionales (bordes y texto bloqueado)
  // Ajustar bordes para mantener contraste visual
  const bordeRamos = shadeColor(colorRamos, -15);
  const bordeAprobado = shadeColor(colorAprobado, -25);
  const bordeBloqueado = shadeColor(colorBloqueado, -35);
  const textoBloqueado = shadeColor(colorBloqueado, 60);

  document.documentElement.style.setProperty('--color-borde-ramos', bordeRamos);
  document.documentElement.style.setProperty('--color-borde-aprobado', bordeA
