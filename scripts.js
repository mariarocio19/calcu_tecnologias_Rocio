let primerNumero = 0;
let operador = '';
let numeros = [];

function handleKeyPress(event) {
    const key = event.key;
    if (isNumber(key) || key === ',') {
        appendNumber(key);
    } else if (isOperation(key)) {
        chooseOperation(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLastDigit();
    }
}

function isNumber(key) {
    return /\d/.test(key);
}

function isOperation(key) {
    return ['+', '-', '*', '/'].includes(key);
}

function appendNumber(number) {
    currentNumber += number;
    updateDisplay();
}

function appendComma() {
    currentNumber += ',';
    updateDisplay();
}

function chooseOperation(op) {
    if (currentNumber === '') return;
    if (previousNumber !== '') {
        calculate();
    }
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';
}

function guardarOperador(op) {
    const input = document.getElementById('inputNumbers').value;
    primerNumero = parseFloat(input);

    if (!Number.isNaN(primerNumero)) {
        operador = op;
        document.getElementById('inputNumbers').value = '';
        actualizarInfoOperacion(op);
    } else {
        mostrarError('Introduce un número válido como primer operando.');
    }
}

function calcularResultado() {
    const input = document.getElementById('inputNumbers').value;
    const segundoNumero = parseFloat(input);

    if (!Number.isNaN(segundoNumero)) {
        let resultado;

        switch (operador) {
            case '+':
                resultado = primerNumero + segundoNumero;
                actualizarInfo(resultado, 'Suma');
                break;
            case '-':
                resultado = primerNumero - segundoNumero;
                actualizarInfo(resultado, 'Resta');
                break;
            case '*':
                resultado = primerNumero * segundoNumero;
                actualizarInfo(resultado, 'Multiplicación');
                break;
            case '/':
                if (segundoNumero === 0) {
                    mostrarError('Error: División por cero no permitida.');
                    return;
                }
                resultado = primerNumero / segundoNumero;
                actualizarInfo(resultado, 'División');
                break;
            case '%':
                resultado = primerNumero % segundoNumero;
                actualizarInfo(resultado, 'Módulo');
                break;
            default:
                mostrarError('Operación no válida.');
                return;
        }

        document.getElementById('inputNumbers').value = resultado;
    } else {
        mostrarError('Introduce un número válido como segundo operando.');
    }
}

function calcularCuadrado() {
    const input = document.getElementById('inputNumbers').value;
    const numero = parseFloat(input);

    if (!Number.isNaN(numero)) {
        const cuadrado = numero ** 2;
        document.getElementById('inputNumbers').value = cuadrado;
        actualizarInfo(cuadrado, 'Cuadrado');
    } else {
        mostrarError('Introduce un número válido.');
    }
}

function calcularCubo() {
    const input = document.getElementById('inputNumbers').value;
    const numero = parseFloat(input);

    if (!Number.isNaN(numero)) {
        const cubo = numero ** 3;
        document.getElementById('inputNumbers').value = cubo;
        actualizarInfo(cubo, 'Cubo');
    } else {
        mostrarError('Introduce un número válido.');
    }
}

function sumatorio() {
    const input = document.getElementById('inputNumbers').value;
    const numerosArray = input.split(',').map(Number);

    if (numerosArray.some(isNaN)) {
        mostrarError('Introduce una lista CSV válida.');
        return;
    }

    const sum = numerosArray.reduce((a, b) => a + b, 0);
    document.getElementById('inputNumbers').value = sum;
    actualizarInfo(sum, 'Sumatorio');
}

function ordenar() {
    const input = document.getElementById('inputNumbers').value;
    const numerosArray = input.split(',').map(Number);

    if (numerosArray.some(isNaN)) {
        mostrarError('Introduce una lista CSV válida.');
        return;
    }

    numerosArray.sort((a, b) => a - b);
    document.getElementById('inputNumbers').value = numerosArray.join(',');
    actualizarInfo(numerosArray, 'Ordenar');
}

function revertir() {
    const input = document.getElementById('inputNumbers').value;
    const numerosArray = input.split(',').map(Number);

    if (numerosArray.some(isNaN)) {
        mostrarError('Introduce una lista CSV válida.');
        return;
    }

    numerosArray.reverse();
    document.getElementById('inputNumbers').value = numerosArray.join(',');
    actualizarInfo(numerosArray, 'Revertir');
}

function quitar() {
    const input = document.getElementById('inputNumbers').value;
    const numerosArray = input.split(',');

    numerosArray.pop();
    document.getElementById('inputNumbers').value = numerosArray.join(',');
    actualizarInfo(numerosArray, 'Quitar Último');
}

function mod() {
    const input = document.getElementById('inputNumbers').value;
    const numero = parseFloat(input);

    if (!Number.isNaN(numero)) {
        const resultado = Math.abs(numero);
        document.getElementById('inputNumbers').value = resultado;
        actualizarInfo(resultado, 'Módulo');
    } else {
        mostrarError('Introduce un número válido.');
    }
}

function fact() {
    const input = document.getElementById('inputNumbers').value;
    const numero = parseInt(input);

    if (!Number.isNaN(numero) && numero >= 0) {
        let factorial = 1;

        for (let i = 2; i <= numero; i++) {
            factorial *= i;
        }

        document.getElementById('inputNumbers').value = factorial;
        actualizarInfo(factorial, 'Factorial');
    } else {
        mostrarError('Introduce un número entero no negativo válido.');
    }
}

function resetCalculadora() {
    primerNumero = 0;
    operador = '';
    numeros = [];
    document.getElementById('inputNumbers').value = '';
    document.getElementById('info').textContent = 'Info sobre el número';
}

function actualizarInfo(resultado, tipoOperacion = '') {
    const infoElement = document.getElementById('info');

    if (tipoOperacion) {
        infoElement.textContent = `Operación: ${tipoOperacion}. `;
    }

    if (resultado < 100) {
        infoElement.textContent += 'Resultado menor que 100.';
    } else if (resultado >= 100 && resultado <= 200) {
        infoElement.textContent += 'Resultado entre 100 y 200.';
    } else {
        infoElement.textContent += 'Resultado superior a 200.';
    }
}

function mostrarError(mensaje) {
    const infoElement = document.getElementById('info');
    infoElement.textContent = `Error: ${mensaje}`;
}
function calcularRaizCuadrada() {
    const input = document.getElementById('inputNumbers').value;
    const numero = parseFloat(input);

    if (!Number.isNaN(numero)) {
        const resultado = Math.sqrt(numero);
        document.getElementById('inputNumbers').value = resultado;
        
        // Actualizamos el mensaje en función de si es positivo o negativo
        if (numero >= 0) {
            actualizarInfo(resultado, 'Raíz Cuadrada (Número Positivo)');
        } else {
            actualizarInfo(resultado, 'Raíz Cuadrada (Número Negativo)');
        }
    } else {
        mostrarError('Introduce un número válido para calcular la raíz cuadrada.');
    }
}

// Función para elevar a cualquier potencia
function elevarAPotencia() {
    const base = parseFloat(document.getElementById('inputNumbers').value);
    const exponente = parseFloat(document.getElementById('exponente').value);

    if (!Number.isNaN(base) && !Number.isNaN(exponente)) {
        const resultado = Math.pow(base, exponente);
        document.getElementById('inputNumbers').value = resultado;
        actualizarInfo(resultado, `Elevación a la Potencia ${exponente}`);
    } else {
        mostrarError('Introduce números válidos tanto para la base como para el exponente.');
    }
}
function calcularMedia() {
    const input = document.getElementById('inputNumbers').value;
    const numerosArray = validar_lista();

    if (numerosArray === null || numerosArray.length === 0) {
        mostrarError('Introduce una lista CSV válida con al menos un número.');
        return;
    }

    const suma = numerosArray.reduce((a, b) => a + b, 0);
    const media = suma / numerosArray.length;
    document.getElementById('inputNumbers').value = media;
    actualizarInfo(media, 'Media');
}

// Validación para evitar listas vacías o con elementos no numéricos
function validar_lista() {
    const input = document.getElementById('inputNumbers').value.trim();
    if (input === '') {
        mostrarError('La lista está vacía.');
        return null;
    }

    const lista = input.split(',').map(num => parseFloat(num));
    if (lista.some(isNaN)) {
        mostrarError('La lista contiene elementos no numéricos.');
        return null;
    }

    ocultar_error();
    return lista;
}

// Función para eliminar un elemento específico de la lista CSV
function quitarElemento() {
    const input = document.getElementById('inputNumbers').value;
    const numerosArray = validar_lista();
    const elementoAEliminar = parseFloat(document.getElementById('eliminarElemento').value);

    if (numerosArray === null || isNaN(elementoAEliminar)) {
        mostrarError('Introduce un número válido para eliminar.');
        return;
    }

    // Filtramos la lista para eliminar el elemento específico
    const nuevaLista = numerosArray.filter(num => num !== elementoAEliminar);
    document.getElementById('inputNumbers').value = nuevaLista.join(',');
    actualizarInfo(nuevaLista, `Elemento ${elementoAEliminar} eliminado`);
}

// Actualización de la función de sumatorio, ordenación, etc.
function sumatorio() {
    const numerosArray = validar_lista();

    if (numerosArray === null || numerosArray.length === 0) {
        mostrarError('Introduce una lista CSV válida.');
        return;
    }

    const suma = numerosArray.reduce((a, b) => a + b, 0);
    document.getElementById('inputNumbers').value = suma;
    actualizarInfo(suma, 'Sumatorio');
}

// Función para mostrar un error
function mostrarError(mensaje) {
    const infoElement = document.getElementById('info');
    infoElement.textContent = `Error: ${mensaje}`;
}

// Función para ocultar el error
function ocultar_error() {
    const infoElement = document.getElementById('info');
    infoElement.textContent = '';
}
// Array para almacenar los logs de errores
let logsErrores = [];

// Función para validar entrada numérica
function validarNumero(input) {
    const numero = parseFloat(input.trim());
    if (input.trim() === '') {
        mostrarError('El campo no puede estar vacío.');
        registrarLogError('Campo vacío.');
        return null;
    }
    if (isNaN(numero)) {
        mostrarError('Entrada no válida: Por favor introduce un número.');
        registrarLogError('Entrada no válida: se ingresó texto o un valor no numérico.');
        return null;
    }
    return numero;
}

// Función para validar lista CSV
function validarListaCSV(input) {
    if (!input.trim()) {
        mostrarError('La lista CSV no puede estar vacía.');
        registrarLogError('Lista CSV vacía.');
        return null;
    }
    const numerosArray = input.split(',').map(num => parseFloat(num.trim()));
    if (numerosArray.some(isNaN)) {
        mostrarError('La lista contiene valores no numéricos o está incompleta.');
        registrarLogError('Lista CSV contiene valores no numéricos o está incompleta.');
        return null;
    }
    return numerosArray;
}

// Función para registrar los errores
function registrarLogError(mensajeError) {
    const fecha = new Date().toLocaleString();
    logsErrores.push(`${fecha}: ${mensajeError}`);
}

// Función para mostrar los errores en la interfaz
function mostrarError(mensaje) {
    const infoElement = document.getElementById('info');
    infoElement.textContent = `Error: ${mensaje}`;
    infoElement.style.color = 'red'; // Estilo de error en rojo
}

// Función para ocultar los errores
function ocultarError() {
    const infoElement = document.getElementById('info');
    infoElement.textContent = 'Info sobre el número';
    infoElement.style.color = ''; // Restablece el color
}

// Función para descargar los logs de errores
function descargarLogs() {
    if (logsErrores.length === 0) {
        mostrarError('No hay errores registrados para descargar.');
        return;
    }
    const blob = new Blob([logsErrores.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'logs_errores.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Ejemplo de uso en la función calcular resultado (implementación previa)
function calcularResultado() {
    const input = document.getElementById('inputNumbers').value;
    const segundoNumero = validarNumero(input);
    if (segundoNumero === null) return;

    let resultado;
    switch (operador) {
        case '+':
            resultado = primerNumero + segundoNumero;
            break;
        case '-':
            resultado = primerNumero - segundoNumero;
            break;
        case '*':
            resultado = primerNumero * segundoNumero;
            break;
        case '/':
            if (segundoNumero === 0) {
                mostrarError('Error: División por cero no permitida.');
                registrarLogError('División por cero.');
                return;
            }
            resultado = primerNumero / segundoNumero;
            break;
        default:
            mostrarError('Operación no válida.');
            registrarLogError('Operación no válida.');
            return;
    }
    document.getElementById('inputNumbers').value = resultado;
    ocultarError(); // Oculta el mensaje de error si el cálculo es exitoso
    actualizarInfo(resultado, 'Resultado');
}
function mostrarCargando() {
    document.getElementById('loading').style.display = 'block';
    document.body.classList.add('loading-active');
}

// Función para ocultar la animación de carga
function ocultarCargando() {
    document.getElementById('loading').style.display = 'none';
    document.body.classList.remove('loading-active');
}

// Función para resaltar el botón presionado
function resaltarBoton(button) {
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 500);
}

// Operaciones CSV con animación de carga
function sumatorio() {
    mostrarCargando();
    setTimeout(() => {
        const input = document.getElementById('inputNumbers').value;
        const numerosArray = validarListaCSV(input);
        if (numerosArray === null) {
            ocultarCargando();
            return;
        }
        const sum = numerosArray.reduce((a, b) => a + b, 0);
        document.getElementById('inputNumbers').value = sum;
        actualizarInfo(sum, 'Sumatorio');
        ocultarCargando();
    }, 1000); // Simula una operación compleja
}

// Función mejorada para quitar un elemento específico de la lista CSV con carga
function quitar() {
    mostrarCargando();
    setTimeout(() => {
        const input = document.getElementById('inputNumbers').value;
        const numerosArray = validarListaCSV(input);
        if (numerosArray === null) {
            ocultarCargando();
            return;
        }

        const valorAEliminar = prompt('Introduce el valor que deseas eliminar de la lista:');
        if (valorAEliminar === null) {
            ocultarCargando();
            return;
        }

        const valor = parseFloat(valorAEliminar.trim());
        if (isNaN(valor)) {
            mostrarError('Introduce un valor numérico válido para eliminar.');
            ocultarCargando();
            return;
        }

        const nuevoArray = numerosArray.filter(num => num !== valor);
        document.getElementById('inputNumbers').value = nuevoArray.join(',');
        actualizarInfo(nuevoArray, 'Quitar Elemento');
        ocultarCargando();
    }, 1000); // Simula una operación compleja
}

// Manejo de atajos de teclado para accesibilidad
document.addEventListener('keydown', (event) => {
    const focusedElement = document.activeElement;
    if (focusedElement.tagName === 'BUTTON') {
        if (event.key === 'Enter' || event.key === ' ') {
            focusedElement.click();
        }
    }
});

// Función para mostrar el error con accesibilidad
function mostrarError(mensaje) {
    const infoElement = document.getElementById('info');
    infoElement.textContent = `Error: ${mensaje}`;
    infoElement.setAttribute('role', 'alert'); // Añadir atributo para accesibilidad
    infoElement.style.color = 'red'; // Estilo de error en rojo
}
// Función para calcular el seno
function calcularSeno() {
    const input = document.getElementById('inputUnitaria').value;
    const numero = parseFloat(input);

    if (!isNaN(numero)) {
        const resultado = Math.sin(numero);
        document.getElementById('inputUnitaria').value = resultado;
        actualizarInfo(resultado, 'Seno');
    } else {
        mostrarError('Introduce un número válido.');
    }
}

// Función para calcular el coseno
function calcularCoseno() {
    const input = document.getElementById('inputUnitaria').value;
    const numero = parseFloat(input);

    if (!isNaN(numero)) {
        const resultado = Math.cos(numero);
        document.getElementById('inputUnitaria').value = resultado;
        actualizarInfo(resultado, 'Coseno');
    } else {
        mostrarError('Introduce un número válido.');
    }
}

// Función para calcular la tangente
function calcularTangente() {
    const input = document.getElementById('inputUnitaria').value;
    const numero = parseFloat(input);

    if (!isNaN(numero)) {
        const resultado = Math.tan(numero);
        document.getElementById('inputUnitaria').value = resultado;
        actualizarInfo(resultado, 'Tangente');
    } else {
        mostrarError('Introduce un número válido.');
    }
}
