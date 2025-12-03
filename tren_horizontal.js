
// Animación tren portada (index.html) + barra ferroviaria (index2.html)

window.addEventListener("load", () => {
    // === Animación del tren de portada (index.html) ===
    const trenPortada = document.getElementById("tren-animado");
    if (trenPortada) {
        trenPortada.classList.add("tren-animando");
    }

    const btn = document.getElementById("btn-iniciar");
    if (btn) {
        btn.addEventListener("click", () => {
            setTimeout(() => {
                window.location.href = "index2.html";
            }, 300);
        });
    }

    // === Barra ferroviaria de navegación (index2.html) ===
    const railway = document.querySelector(".railway");
    const track = document.querySelector(".track");
    const train = document.getElementById("train");
    const stations = document.querySelectorAll(".track .station");
    const labels = document.querySelectorAll(".railway__labels .label");

    if (!railway || !track || !train || stations.length === 0) {
        return; // No hay barra ferroviaria en esta página
    }

    const sectionIds = [
        "inicio",
        "sistema",
        "territorio",
        "patrones",
        "san-bernardo",
        "metodologia",
        "equipo"
    ];

    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    function setActiveIndex(activeIndex) {
        stations.forEach((st, i) => {
            st.classList.toggle("active", i === activeIndex);
        });
        labels.forEach((lb, i) => {
            lb.classList.toggle("is-active", i === activeIndex);
        });

        const activeStation = stations[activeIndex];
        const trackRect = track.getBoundingClientRect();
        const stRect = activeStation.getBoundingClientRect();

        const centerStation = stRect.left + stRect.width / 2;
        const offsetWithinTrack = centerStation - trackRect.left;

        train.style.left = offsetWithinTrack + "px";

        const progress = document.getElementById("progress");
        if (progress) {
            const totalWidth = trackRect.width * 0.92; // coincide con left/right 4%
            const step = totalWidth / (stations.length - 1 || 1);
            progress.style.width = step * activeIndex + "px";
        }
    }

    function updateByScroll() {
        const scrollY = window.scrollY;
        let bestIndex = 0;

        sections.forEach((sec, i) => {
            const rect = sec.getBoundingClientRect();
            const offsetTop = rect.top + window.scrollY;
            if (scrollY + 140 >= offsetTop) { // compensar header + barra
                bestIndex = i;
            }
        });

        setActiveIndex(bestIndex);
    }

    // Click en etiquetas
    labels.forEach(label => {
        label.addEventListener("click", (e) => {
            e.preventDefault();
            const index = parseInt(label.dataset.index, 10);
            const targetId = sectionIds[index];
            const target = document.getElementById(targetId);
            if (!target) return;
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // Click en estaciones
    stations.forEach(st => {
        st.addEventListener("click", () => {
            const index = parseInt(st.dataset.index, 10);
            const targetId = sectionIds[index];
            const target = document.getElementById(targetId);
            if (!target) return;
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    window.addEventListener("scroll", updateByScroll);
    updateByScroll();
});
