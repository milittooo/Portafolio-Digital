/**
 * Función que maneja el desplazamiento horizontal de los carruseles de materias.
 * * @param {string} carouselId - El ID del elemento 'grilla-scroll' a desplazar (ej: 'grilla-primer-ano'.
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
document.addEventListener('DOMContentLoaded', function () {
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
document.addEventListener('DOMContentLoaded', function () {
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

/* === Inicializar slider de Trabajos Realizados (no borra HTML existente) === */
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.trabajos-slider');
    if (!slider) return;

    const prev = slider.querySelector('.slider-prev');
    const next = slider.querySelector('.slider-next');
    const viewport = slider.querySelector('.slider-viewport');

    if (!viewport) return;

    // paso de desplazamiento: 85% del ancho de la ventana visible del slider
    function getStep() {
        return Math.round(viewport.clientWidth * 0.85);
    }

    function updateButtons() {
        if (prev) prev.disabled = viewport.scrollLeft <= 0;
        if (next) {
            const max = viewport.scrollWidth - viewport.clientWidth;
            next.disabled = viewport.scrollLeft >= Math.max(0, max - 1);
        }
    }

    if (prev) prev.addEventListener('click', () => {
        viewport.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });
    if (next) next.addEventListener('click', () => {
        viewport.scrollBy({ left: getStep(), behavior: 'smooth' });
    });

    // soporte teclado cuando el viewport está enfocado
    viewport.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') viewport.scrollBy({ left: getStep(), behavior: 'smooth' });
        if (e.key === 'ArrowLeft') viewport.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });

    // Actualizar al hacer scroll / resize
    viewport.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);

    // drag-to-scroll (funciona en desktop)
    let isDown = false, startX, scrollStart;
    viewport.addEventListener('mousedown', (e) => {
        isDown = true;
        viewport.classList.add('dragging');
        startX = e.pageX - viewport.offsetLeft;
        scrollStart = viewport.scrollLeft;
        e.preventDefault();
    });
    window.addEventListener('mouseup', () => { isDown = false; viewport.classList.remove('dragging'); });
    window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const x = e.pageX - viewport.offsetLeft;
        const walk = (startX - x);
        viewport.scrollLeft = scrollStart + walk;
    });

    // estado inicial
    setTimeout(updateButtons, 60);
});

/* Inicializar galería carrusel: carga imágenes desde img/Practica */
(function initGaleriaPractica() {
    const carousel = document.querySelector('.galeria-carousel');
    if (!carousel) return;
    const track = carousel.querySelector('.slider-track');
    const viewport = carousel.querySelector('.slider-viewport');
    const prev = carousel.querySelector('.slider-prev');
    const next = carousel.querySelector('.slider-next');

    // Opción B: lista manual de archivos (si no usás index.json o fetch falla)
    let imagesPratica = [
      "IMG-20250905-WA0017.jpg",
      "IMG-20250905-WA0018.jpg",
      "IMG-20250905-WA0019.jpg",
      "IMG-20250905-WA0020.jpg",
      "IMG-20250905-WA0021.jpg",
      "IMG-20250905-WA0022.jpg",
      "IMG-20250905-WA0023.jpg",
      "IMG-20250905-WA0024.jpg",
      "IMG-20250905-WA0025.jpg"
    ];

    function buildItems(list) {
        track.innerHTML = '';
        list.forEach(name => {
            const item = document.createElement('figure');
            item.className = 'galeria-item';
            const img = document.createElement('img');
            img.src = `img/Practica/${name}`;
            img.alt = name.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, '');
            img.loading = 'lazy';
            const figcap = document.createElement('figcaption');
            figcap.textContent = img.alt;
            item.appendChild(img);
            item.appendChild(figcap);
            track.appendChild(item);
        });
        updateButtons();
    }

    // intenta cargar manifest index.json (Opción A)
    fetch('img/Practica/index.json').then(r => {
        if (!r.ok) throw new Error('no manifest');
        return r.json();
    }).then(list => {
        if (Array.isArray(list) && list.length) buildItems(list);
    }).catch(() => {
        // fallback a lista manual
        if (imagesPratica.length) buildItems(imagesPratica);
    });

    function getStep() { return Math.round(viewport.clientWidth * 0.85); }

    function updateButtons() {
        if (!prev || !next) return;
        prev.disabled = viewport.scrollLeft <= 0;
        const max = viewport.scrollWidth - viewport.clientWidth;
        next.disabled = viewport.scrollLeft >= Math.max(0, max - 1);
    }

    if (prev) prev.addEventListener('click', () => viewport.scrollBy({ left: -getStep(), behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => viewport.scrollBy({ left: getStep(), behavior: 'smooth' }));

    viewport.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);

    // drag-to-scroll
    let isDown = false, startX = 0, scrollStart = 0;
    viewport.addEventListener('mousedown', e => {
        isDown = true; viewport.classList.add('dragging');
        startX = e.pageX - viewport.offsetLeft;
        scrollStart = viewport.scrollLeft;
        e.preventDefault();
    });
    window.addEventListener('mouseup', () => { isDown = false; viewport.classList.remove('dragging'); });
    window.addEventListener('mousemove', e => {
        if (!isDown) return;
        const x = e.pageX - viewport.offsetLeft;
        const walk = (startX - x);
        viewport.scrollLeft = scrollStart + walk;
    });

    // estado inicial
    setTimeout(updateButtons, 80);
})();

/* Lightbox simple para la galería estática */
(function initGaleriaLightbox() {
  // crear lightbox si no existe
  function createLB() {
    if (document.querySelector('.galeria-lightbox')) return;
    const lb = document.createElement('div');
    lb.className = 'galeria-lightbox';
    lb.innerHTML = '<button class="lb-close" aria-label="Cerrar">✕</button><img alt="Ampliada">';
    document.body.appendChild(lb);

    const close = lb.querySelector('.lb-close');
    const img = lb.querySelector('img');

    function closeLB() {
      lb.classList.remove('open');
      img.src = '';
    }

    close.addEventListener('click', closeLB);
    lb.addEventListener('click', (e) => {
      if (e.target === lb) closeLB();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLB();
    });
  }

  // abrir lightbox al hacer clic en una imagen de la galería
  document.querySelectorAll('.galeria-item img').forEach((img) => {
    img.addEventListener('click', () => {
      createLB();
      const lb = document.querySelector('.galeria-lightbox');
      const lightboxImg = lb.querySelector('img');
      lightboxImg.src = img.parentElement.href;
      lb.classList.add('open');
    });
  });
})();

/* Inicializar carrusel de galería y lightbox con navegación */
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.galeria-carousel');
    if (!carousel) return;
    const viewport = carousel.querySelector('.slider-viewport');
    const track = carousel.querySelector('.slider-track');
    const btnPrev = carousel.querySelector('.slider-prev');
    const btnNext = carousel.querySelector('.slider-next');
    const thumbs = document.querySelectorAll('.galeria-thumbs img');

    function step() { return Math.round(viewport.clientWidth * 0.8); }
    function updateBtns() {
        if (!btnPrev || !btnNext) return;
        btnPrev.disabled = viewport.scrollLeft <= 0;
        btnNext.disabled = viewport.scrollLeft >= (viewport.scrollWidth - viewport.clientWidth - 1);
    }
    if (btnPrev) btnPrev.addEventListener('click', () => viewport.scrollBy({ left: -step(), behavior: 'smooth' }));
    if (btnNext) btnNext.addEventListener('click', () => viewport.scrollBy({ left: step(), behavior: 'smooth' }));

    viewport.addEventListener('scroll', updateBtns, { passive: true });
    window.addEventListener('resize', updateBtns);
    setTimeout(updateBtns, 60);

    /* abrir lightbox y navegación entre imágenes */
    const imgs = Array.from(track.querySelectorAll('img'));
    // crear lightbox DOM
    function createLB() {
        if (document.querySelector('.galeria-lightbox')) return;
        const lb = document.createElement('div'); lb.className = 'galeria-lightbox';
        lb.innerHTML = '<button class="lb-close" aria-label="Cerrar">✕</button><button class="lb-nav lb-prev" aria-label="Anterior">‹</button><img alt="Ampliada"><button class="lb-nav lb-next" aria-label="Siguiente">›</button>';
        document.body.appendChild(lb);
        const close = lb.querySelector('.lb-close'), prev = lb.querySelector('.lb-prev'), next = lb.querySelector('.lb-next'), img = lb.querySelector('img');
        function closeLB(){ lb.classList.remove('open'); img.src=''; currentIndex = -1; }
        close.addEventListener('click', closeLB);
        lb.addEventListener('click', (e)=> { if (e.target === lb) closeLB(); });
        prev.addEventListener('click', ()=> showIndex(currentIndex-1));
        next.addEventListener('click', ()=> showIndex(currentIndex+1));
        window.addEventListener('keydown', (e)=> {
            if (!lb.classList.contains('open')) return;
            if (e.key === 'Escape') closeLB();
            if (e.key === 'ArrowLeft') showIndex(currentIndex-1);
            if (e.key === 'ArrowRight') showIndex(currentIndex+1);
        });
    }

    let currentIndex = -1;
    function showIndex(i){
        if (i < 0) i = imgs.length -1;
        if (i >= imgs.length) i = 0;
        currentIndex = i;
        createLB();
        const lb = document.querySelector('.galeria-lightbox');
        const img = lb.querySelector('img');
        img.src = imgs[i].src;
        lb.classList.add('open');
        // actualizar prev/next disabled visual (opcional)
        lb.querySelector('.lb-prev').disabled = imgs.length<=1;
        lb.querySelector('.lb-next').disabled = imgs.length<=1;
    }

    // click en imagen del carrusel abre lightbox
    imgs.forEach((im, idx) => im.addEventListener('click', () => showIndex(idx)));
    // thumbs abren el mismo índice
    thumbs.forEach((t, i) => t.addEventListener('click', () => {
        // scroll carousel to item i
        const item = track.children[i];
        if (item) viewport.scrollTo({ left: item.offsetLeft - 12, behavior: 'smooth' });
    }));
});