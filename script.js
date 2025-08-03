document.addEventListener('DOMContentLoaded', () => {
    const ramos = document.querySelectorAll('.ramo');
    const aprobados = new Set();

    function verificarPrerrequisitos() {
        ramos.forEach(ramo => {
            const prerequisitosStr = ramo.dataset.prerequisitos;
            if (prerequisitosStr) {
                const prerequisitos = prerequisitosStr.split(' ');
                const todosAprobados = prerequisitos.every(prereq => aprobados.has(prereq));
                if (todosAprobados) {
                    ramo.classList.remove('bloqueado');
                    ramo.classList.add('no-aprobado');
                } else {
                    ramo.classList.add('bloqueado');
                    ramo.classList.remove('no-aprobado');
                }
            } else {
                // Si no tiene prerrequisitos, no está bloqueado
                ramo.classList.remove('bloqueado');
                ramo.classList.add('no-aprobado');
            }
        });
    }

    function inicializarEstado() {
        // Al cargar la página, todos los ramos se consideran no aprobados, 
        // y los que tienen prerrequisitos se bloquean.
        ramos.forEach(ramo => {
            ramo.classList.remove('aprobado');
        });
        verificarPrerrequisitos();
    }

    ramos.forEach(ramo => {
        ramo.addEventListener('click', () => {
            const ramoId = ramo.id;
            
            // Si el ramo ya está aprobado, no hacemos nada
            if (aprobados.has(ramoId)) {
                return;
            }

            // Marcar como aprobado
            ramo.classList.remove('no-aprobado');
            ramo.classList.add('aprobado');
            aprobados.add(ramoId);

            // Verificar y desbloquear los ramos que dependan de este
            verificarPrerrequisitos();
        });
    });

    inicializarEstado();
});
