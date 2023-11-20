// Elements with same class
const bitContainers = document.querySelectorAll(".bit-container");
const bits = document.querySelectorAll(".bit");
const decimalDisplays = document.querySelectorAll(".decimal-display");

// Unique elements
const addBitBtn = document.getElementById("add-bit-btn");
const bitCounter = document.getElementById("bit-counter-display");
const bitTypeBtn = document.getElementById("bittype-btn");
const colormodeBtn = document.getElementById("colormode-btn");
const hideValuesBtn = document.getElementById("hide-values-btn");
const removeBitBtn = document.getElementById("remove-bit-btn");
const resetBtn = document.getElementById("reset-btn");
const showValuesBtn = document.getElementById("show-values-btn");

// Button EventListeners
addBitBtn.addEventListener('click', addBitContainer);
bitTypeBtn.addEventListener('click', toggleBitType)
colormodeBtn.addEventListener('click', toggleColorMode);
hideValuesBtn.addEventListener('click', hideAllDecimalValues)
removeBitBtn.addEventListener('click', removeBitContainer);
resetBtn.addEventListener('click', resetBits)
showValuesBtn.addEventListener('click', showAllDecimalValues)

// Bit EventListeners
bits.forEach(bit => { bit.addEventListener('click', toggleBitOnOff) });
decimalDisplays.forEach(display => { display.addEventListener('click', toggleDecimalValueShowHide) });

// Functions for decimal displays and values
function showDecimalValue(decimalDisplay) {
    let decimalValue = decimalDisplay.getAttribute("data-decimalValue");
    decimalDisplay.innerText = decimalValue;
}

function hideDecimalValue(decimalDisplay) {
    decimalDisplay.innerText = "";
}

function showAllDecimalValues() {
    decimalDisplays.forEach(decimalDisplay => {
        showDecimalValue(decimalDisplay);
    });
}
function hideAllDecimalValues() {
    decimalDisplays.forEach(decimalDisplay => {
        hideDecimalValue(decimalDisplay);
    });
}

function toggleDecimalValueShowHide(event) {
      
    if (event.target.innerText === "") {
        showDecimalValue(event.target);
    } else {
        hideDecimalValue(event.target);
    }
}

// Functions for byte
function removeBitContainer() {
    let bitCount = bitCounter.getAttribute("data-bitCount");
    if (bitCount > 0) {
        bitCount--
    };
    
    updateBitCounter(bitCount);
    showBitContainers(bitCount);
}

function addBitContainer() {
    let bitCount = bitCounter.getAttribute("data-bitCount");
    if (bitCount < 8) {
        bitCount++
    };
    
    updateBitCounter(bitCount);
    showBitContainers(bitCount);
}

function showBitContainers(bitCount) {
    // Hide all bitContainers
    bitContainers.forEach(bitContainer => hideElement(bitContainer));
    // Show BitCount amount of bitContainers
    for (let i = 0; i < bitCount; i++) {
        showElement(bitContainers[i]);
    }
    // Turn off hidden bits
    for (let i = bitCount; i < 8; i++) {
        let bit = bitContainers[i].children[1];
        let decimalDisplay = bit.parentElement.children[0];
        turnBitOff(bit, decimalDisplay);
    }
}

function toggleBitType() {
    bits.forEach(bit => {
        if (bit.classList.contains("bulb")) {
            bit.classList.remove("bulb");
            bit.classList.add("digit");
        } else {
            bit.classList.remove("digit");
            bit.classList.add("bulb");

        }

    });
}

function resetBits() {
    bits.forEach(bit => {
        turnBitOff(bit)
    });
}

// Bit counter
function updateBitCounter(bitCount) {
    bitCounter.setAttribute("data-bitCount", bitCount);
    bitCounter.innerText = bitCount;
}

// Functions for bits
function turnBitOff(bit) {
    let decimalDisplay = bit.parentElement.children[0];
    bit.classList.remove("on");
    decimalDisplay.classList.remove("on");
}

function turnBitOn(bit) {
    let decimalDisplay = bit.parentElement.children[0];
    bit.classList.add("on");
    decimalDisplay.classList.add("on");
}

function toggleBitOnOff(event) {
    let bit = event.target;
    
    if (bit.classList.contains("on")) {
        turnBitOff(bit);
    } else {
        turnBitOn(bit);
    }
}   


// Functions for all elements
function hideElement(element) {
    element.style.visibility = "hidden";
}

function showElement(element) {
    element.style.visibility = "visible";
}

function toggleElementShowHide(element) {
    if (element.style.visibility === "hidden") {
        element.style.visibility = "visible";
    } else {
        element.style.visibility = "hidden";
    }
}

// Colormode
function toggleColorMode() {
    document.documentElement.classList.toggle("lightmode");
}