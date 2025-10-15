/**
 * Función que maneja el desplazamiento horizontal de los carruseles de materias.
 * * @param {string} carouselId - El ID del elemento 'grilla-scroll' a desplazar (ej: 'grilla-primer-ano').
 * @param {number} scrollAmount - La cantidad de píxeles a mover (ej: 350 para derecha, -350 para izquierda).
 */
function scrollCarousel(carouselId, scrollAmount) {
    // 1. Busca el elemento de la grilla por su ID
    const carousel = document.getElementById(carouselId);

    // 2. Si encuentra la grilla, aplica el desplazamiento
    if (carousel) {
        // Modifica la propiedad scrollLeft (posición de scroll horizontal)
        carousel.scrollLeft += scrollAmount;
    }
}

/**
 * Función que se ejecuta cuando el DOM está completamente cargado.
 * Hace que las tarjetas completas sean clickeables.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Obtener todas las tarjetas de proyecto
    const tarjetas = document.querySelectorAll('.tarjeta-proyecto');
    
    tarjetas.forEach(function(tarjeta) {
        // Buscar el enlace "Ver Detalle" dentro de cada tarjeta
        const enlaceDetalle = tarjeta.querySelector('.ver-detalle');
        
        if (enlaceDetalle) {
            // Hacer que toda la tarjeta sea clickeable
            tarjeta.style.cursor = 'pointer';
            
            // Agregar evento de clic a toda la tarjeta
            tarjeta.addEventListener('click', function(evento) {
                // Prevenir el comportamiento por defecto si se hace clic en el enlace
                if (evento.target.tagName === 'A') {
                    return;
                }
                
                // Navegar al enlace de detalle
                window.location.href = enlaceDetalle.href;
            });
            
            // Agregar efecto hover visual
            tarjeta.addEventListener('mouseenter', function() {
                tarjeta.style.transform = 'translateY(-5px)';
                tarjeta.style.transition = 'transform 0.3s ease';
            });
            
            tarjeta.addEventListener('mouseleave', function() {
                tarjeta.style.transform = 'translateY(0)';
            });
        }
    });
});

/**
 * Función para efectos de scroll reveal
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}

// Inicializar efectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initScrollReveal();
    initNombreClickeable();
});

/**
 * Función para hacer el nombre clickeable
 */
function initNombreClickeable() {
    const nombreClickeable = document.querySelector('.nombre-clickeable');
    
    if (nombreClickeable) {
        nombreClickeable.addEventListener('click', function() {
            // Navegar a la página about.html
            window.location.href = 'about.html';
        });
        
        // Agregar efecto de pulsación al hacer clic
        nombreClickeable.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        nombreClickeable.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
        
        nombreClickeable.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
}