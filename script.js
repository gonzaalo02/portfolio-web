document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('header > button');
    const menuDropdown = document.querySelector('.menu-dropdown');
    
    // Toggle del menú al hacer click en el botón
    menuButton.addEventListener('click', function() {
        if (menuDropdown.style.display === 'flex') {
            menuDropdown.style.display = 'none';
        } else {
            menuDropdown.style.display = 'flex';
        }
    });
    
    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function(event) {
        if (!menuButton.contains(event.target) && !menuDropdown.contains(event.target)) {
            menuDropdown.style.display = 'none';
        }
    });
    
    // Cerrar menú al hacer click en cualquier enlace del menú
    const menuLinks = document.querySelectorAll('.menu-dropdown a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuDropdown.style.display = 'none';
        });
    });
});

// Función para copiar email al portapapeles
function copyEmail() {
    const email = 'gonzalo.p.almena@gmail.com';
    
    // Usar la API moderna del portapapeles si está disponible
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(function() {
            showCopyFeedback();
        }).catch(function(err) {
            console.error('Error al copiar: ', err);
            fallbackCopyEmail(email);
        });
    } else {
        // Fallback para navegadores más antiguos
        fallbackCopyEmail(email);
    }
}

// Función fallback para copiar email
function fallbackCopyEmail(email) {
    const textArea = document.createElement('textarea');
    textArea.value = email;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (err) {
        console.error('Error al copiar: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Mostrar feedback visual al copiar
function showCopyFeedback() {
    const copyButton = document.querySelector('.copy-button');
    const originalText = copyButton.innerHTML;
    
    // Cambiar temporalmente el texto del botón
    copyButton.innerHTML = '<span class="copy-icon">✅</span>¡Copiado!';
    copyButton.style.background = 'linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(22, 163, 74, 0.2))';
    copyButton.style.borderColor = 'rgba(34, 197, 94, 0.5)';
    
    // Restaurar después de 2 segundos
    setTimeout(() => {
        copyButton.innerHTML = originalText;
        copyButton.style.background = '';
        copyButton.style.borderColor = '';
    }, 2000);
}

// Función para abrir el CV en nueva pestaña
function downloadCV() {
    // Abrir el CV en una nueva pestaña
    window.open('assets/CV_Gonzalo_Patiño_Almena.pdf', '_blank');
    
    // Mostrar feedback visual
    showOpenFeedback();
}

// Mostrar feedback visual al abrir CV
function showOpenFeedback() {
    const cvCard = document.querySelector('.about-me-cv-card');
    const originalBorder = cvCard.style.borderColor;
    const originalBackground = cvCard.style.background;
    
    // Cambiar temporalmente el estilo de la tarjeta
    cvCard.style.borderColor = 'rgba(59, 130, 246, 0.6)';
    cvCard.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(30, 64, 175, 0.2))';
    
    // Cambiar el texto del icono temporalmente
    const downloadIcon = document.querySelector('.downlowad-icon');
    const originalIcon = downloadIcon.style.backgroundColor;
    downloadIcon.style.backgroundColor = '#3b82f6';
    
    // Restaurar después de 2 segundos
    setTimeout(() => {
        cvCard.style.borderColor = originalBorder;
        cvCard.style.background = originalBackground;
        downloadIcon.style.backgroundColor = originalIcon;
    }, 2000);
}
