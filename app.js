// Lista para almacenar los nombres de los amigos
let listaAmigos = [];
let nombresSorteados = [];

// Función para validar y agregar un amigo
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombre = inputAmigo.value.trim();
    const listaAmigosElement = document.getElementById('listaAmigos');
    
    // Validaciones
    if (nombre === '') {
        alert('Por favor, ingrese un nombre');
        return;
    }
    
    if (nombre.length < 3) {
        alert('El nombre debe tener al menos 3 caracteres');
        return;
    }
    
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        alert('El nombre solo debe contener letras');
        return;
    }
    
    if (listaAmigos.includes(nombre)) {
        alert('Este nombre ya está en la lista');
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
    const resultadoElement = document.getElementById('resultado');
    
    // Validar que haya participantes
    if (listaAmigos.length === 0) {
        alert('Agregue al menos un participante para realizar el sorteo');
        return;
    }

    // Verificar si quedan nombres disponibles para sortear
    const nombresDisponibles = listaAmigos.filter(nombre => !nombresSorteados.includes(nombre));
    
    if (nombresDisponibles.length === 0) {
        alert('Ya se han sorteado todos los nombres. Reinicie el juego para volver a sortear.');
        return;
    }

    // Seleccionar un nombre al azar de los disponibles
    const indiceAleatorio = Math.floor(Math.random() * nombresDisponibles.length);
    const nombreSorteado = nombresDisponibles[indiceAleatorio];
    
    // Agregar a la lista de sorteados
    nombresSorteados.push(nombreSorteado);
    
    // Mostrar el resultado
    resultadoElement.innerHTML = '';
    const li = document.createElement('h1');
    li.className = 'result-item';
    li.textContent = `Su Amigo Secreto es ¡${nombreSorteado}!`;
    resultadoElement.appendChild(li);
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Limpiar las listas
    listaAmigos = [];
    nombresSorteados = [];
    
    // Limpiar la interfaz
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = 'Digite el nombre de sus amigos';
    document.getElementById('amigo').value = '';
}

// Event listener para el input (permitir agregar con Enter)
document.getElementById('amigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarAmigo();
    }
});