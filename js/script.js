// MENU MOBILE
function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("mobile-menu-hidden");
}

function closeMenu() {
    document.getElementById("mobileMenu").classList.add("mobile-menu-hidden");
}

// ANIMAÇÕES
const animatedItems = document.querySelectorAll("[data-animate]");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
}, { threshold: 0.2 });

animatedItems.forEach((item) => observer.observe(item));

// TRAÇAR ROTA
const directionsBtn = document.getElementById("directionsBtn");
if (directionsBtn) {
    directionsBtn.addEventListener("click", () => {
        // Endereço exato da academia
        const destino = encodeURIComponent("R. Duque de Caxias, 119 - Cariacica Sede, Cariacica - ES, 29156-100");

        // Se geolocalização não estiver disponível, abre apenas o destino
        if (!navigator.geolocation) {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${destino}&travelmode=driving`);
            return;
        }

        directionsBtn.textContent = "Carregando rota...";

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;

                // Abre a rota do usuário até o endereço
                window.open(`https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${destino}&travelmode=driving`);

                directionsBtn.textContent = "Traçar rota";
            },
            () => {
                // Se usuário negar geolocalização
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${destino}&travelmode=driving`);
                directionsBtn.textContent = "Traçar rota";
            }
        );
    });
}
