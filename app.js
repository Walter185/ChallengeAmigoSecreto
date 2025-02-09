// Lista para almacenar los nombres de los amigos
let listaAmigos = [];
let nombresSorteados = [];

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

// Función para validar y agregar un amigo
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombre = inputAmigo.value.trim();
    const listaAmigosElement = document.getElementById('listaAmigos');
    
    // Validaciones
    if (nombre === '') {
        asignarTextoElemento('#resultado', 'Debe ingresar un nombre antes de añadir.');
        return;
    }
    
    if (nombre.length < 3) {
        asignarTextoElemento('#resultado', 'El nombre debe tener al menos 3 caracteres');
        return;
    }
    
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        asignarTextoElemento('#resultado', 'El nombre solo debe contener letras');
        return;
    }
    
    if (listaAmigos.includes(nombre)) {
        asignarTextoElemento('#resultado', 'Este nombre ya está en la lista');
        return;
    }

    // Agregar el nombre a la lista
    listaAmigos.push(nombre);
    
    // Crear elemento de lista con botón de eliminar
    const li = document.createElement('li');
    li.className = 'name-item';
    
    const nombreSpan = document.createElement('span');
    nombreSpan.textContent = nombre;
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'button-delete';
    deleteButton.id = 'delete';
    deleteButton.innerHTML = 'Borrar';
    deleteButton.onclick = () => eliminarAmigo(nombre, li);
    
    li.appendChild(nombreSpan);
    li.appendChild(deleteButton);
    listaAmigosElement.appendChild(li);
    
    // Limpiar el input
    inputAmigo.value = '';
    
    // Restaurar el mensaje original
    asignarTextoElemento('#resultado', 'Digite el nombre de sus amigos');
}

// Función para eliminar un amigo
function eliminarAmigo(nombre, elemento) {
    const index = listaAmigos.indexOf(nombre);
    if (index > -1) {
        listaAmigos.splice(index, 1);
        elemento.remove();
        
        // Eliminar de la lista de sorteados si estaba allí
        const indexSorteado = nombresSorteados.indexOf(nombre);
        if (indexSorteado > -1) {
            nombresSorteados.splice(indexSorteado, 1);
        }
    }
}

// Función para sortear un amigo
function sortearAmigo() {
    // Validar que haya al menos dos participantes
    if (listaAmigos.length < 2) {
        asignarTextoElemento('#resultado', 'Debe ingresar al menos dos nombres antes de sortear.');
        return;
    }

    // Verificar si quedan nombres disponibles para sortear
    const nombresDisponibles = listaAmigos.filter(nombre => !nombresSorteados.includes(nombre));
    
    if (nombresDisponibles.length === 0) {
        asignarTextoElemento('#resultado', 'Ya se han sorteado todos los nombres. Reinicie el juego para volver a sortear.');
        return;
    }

    // Seleccionar un nombre al azar de los disponibles
    const indiceAleatorio = Math.floor(Math.random() * nombresDisponibles.length);
    const nombreSorteado = nombresDisponibles[indiceAleatorio];
    
    // Agregar a la lista de sorteados
    nombresSorteados.push(nombreSorteado);
    
    // Mostrar el resultado
    asignarTextoElemento('#resultado', `Su Amigo Secreto es ¡${nombreSorteado}!`);
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Limpiar las listas
    listaAmigos = [];
    nombresSorteados = [];
    
    // Limpiar la interfaz
    document.getElementById('listaAmigos').innerHTML = '';
    asignarTextoElemento('#resultado', 'Digite el nombre de sus amigos');
    document.getElementById('amigo').value = '';
}

// Event listener para el input (permitir agregar con Enter)
document.getElementById('amigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarAmigo();
    }
});