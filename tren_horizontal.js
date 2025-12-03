
// Tren de portada (index.html) + barra ferroviaria (index2.html)
window.addEventListener("load", function () {
    // === Animación del tren de portada (index.html) ===
    var trenPortada = document.getElementById("tren-animado");
    if (trenPortada) {
        trenPortada.classList.add("tren-animando");
    }

    // === Barra del tren en la historia (index2.html) ===
    inicializarBarraTren();
});

function inicializarBarraTren() {
    var railway = document.querySelector(".railway");
    var line = document.querySelector(".railway__line");
    var train = document.getElementById("rail-train");
    var stations = document.querySelectorAll(".railway__station");
    var progress = document.getElementById("rail-progress");

    if (!railway || !line || !train || !stations.length) {
        return; // No hay barra de tren en esta página
    }

    // IDs de secciones en el orden del viaje
    var sectionIds = [
        "inicio",
        "san-bernardo",
        "senializacion",
        "territorio",
        "patrones",
        "metodologia",
        "equipo"
    ];

    var sections = sectionIds.map(function (id) {
        return document.getElementById(id);
    });

    function setActive(index) {
        if (index < 0 || index >= stations.length) return;

        stations.forEach(function (st, i) {
            if (i === index) {
                st.classList.add("is-active");
            } else {
                st.classList.remove("is-active");
            }
        });

        // Posicionar el tren pegado a la línea, sobre la estación activa
        var trackRect = line.getBoundingClientRect();
        var stationRect = stations[index].getBoundingClientRect();
        var centerStation = stationRect.left + stationRect.width / 2;
        var offsetInsideTrack = centerStation - trackRect.left;

        train.style.left = offsetInsideTrack + "px";

        // Progreso
        if (progress) {
            var maxWidth = trackRect.width;
            var width = Math.max(0, Math.min(maxWidth, offsetInsideTrack));
            progress.style.width = width + "px";
        }
    }

    function updateByScroll() {
        var scrollY = window.scrollY || window.pageYOffset;
        var bestIndex = 0;

        sections.forEach(function (sec, i) {
            if (!sec) return;
            var top = sec.offsetTop;
            // Compensamos header + barra (aprox 160px)
            if (scrollY + 160 >= top) {
                bestIndex = i;
            }
        });

        setActive(bestIndex);
    }

    // Click en estaciones: scroll suave
    stations.forEach(function (station, index) {
        station.addEventListener("click", function () {
            var id = sectionIds[index];
            var target = id && document.getElementById(id);
            if (!target) return;
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // Hacer que el menú superior también mueva el tren (scroll suave)
    var navLinks = document.querySelectorAll(".main-nav a[href^='#']");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (ev) {
            var hash = link.getAttribute("href");
            if (!hash || hash.charAt(0) !== "#") return;
            ev.preventDefault();
            var id = hash.substring(1);
            var target = document.getElementById(id);
            if (!target) return;
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    window.addEventListener("scroll", updateByScroll);
    // Llamada inicial
    updateByScroll();
}
