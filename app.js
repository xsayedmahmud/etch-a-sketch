const sketchBox = document.querySelector("#sketchbox");
const slider = document.querySelector("#slider");
const blockNumbers = document.querySelector(".block-num");
const draw = document.querySelector("#draw");
const erase = document.querySelector("#erase");
const clear = document.querySelector(".clear");
let buttons = document.querySelectorAll(".btn");
const colorPicker = document.querySelector("#color-picker");
let mousePressed = false;
let mode = "draw";
let colorMode = "black";

function updateSketchBox() {
  const value = slider.value;
  sketchBox.style.setProperty("--value", value);

  while (sketchBox.firstChild) {
    sketchBox.removeChild(sketchBox.firstChild);
  }

  for (let i = 0; i < value * value; i++) {
    const sketchBlock = document.createElement("div");
    sketchBlock.classList.add("skb");
    sketchBox.appendChild(sketchBlock);
    blockNumbers.textContent = `${value} x ${value}`;
    blockNumbers.style.setProperty("font-size", "1.5`rem");
  }
}

updateSketchBox();
slider.addEventListener("input", updateSketchBox);

erase.addEventListener("click", () => {
  mode = "erase";
});

draw.addEventListener("click", () => {
  mode = "draw";
});

buttons.forEach(function (button) {
  button.addEventListener("click", (e) => {
    buttons.forEach((btn) => btn.classList.remove("active-btn"));
    e.target.classList.add("active-btn");
  });
});

function sketchOver(e) {
  if (e.type === "mouseup") {
    mousePressed = false;
  } else if (e.type === "mousedown") {
    mousePressed = true;
  } else if (e.type === "mouseover") {
    if (e.target.classList.contains("skb") && mousePressed) {
      if (mode === "draw") {
        e.target.style.backgroundColor = colorMode;
      } else if (mode === "erase") {
        e.target.style.backgroundColor = "transparent";
      }
      e.stopPropagation();
    }
  }
}

function sketchClick(e) {
  if (e.target.classList.contains("skb")) {
    if (mode === "draw") {
      e.target.style.backgroundColor = colorMode;
    } else if (mode === "erase") {
      e.target.style.backgroundColor = "transparent";
    }
    e.stopPropagation();
  }
}

sketchBox.addEventListener("mouseup", sketchOver);
sketchBox.addEventListener("mousedown", sketchOver);
sketchBox.addEventListener("mouseover", sketchOver);
sketchBox.addEventListener("click", sketchClick);

clear.addEventListener("click", () => {
  let blocks = sketchBox.querySelectorAll(".skb");
  for (let block of blocks) {
    block.style.backgroundColor = "transparent";
  }
  drawMode = true;
  colorPicker.value = "#000000";
});

function colorChoice() {
  colorPicker.addEventListener("change", () => {
    colorMode = colorPicker.value;
  });
}
colorChoice();
