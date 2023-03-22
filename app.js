const sketchBox = document.querySelector("#sketchbox");
const slider = document.querySelector("#slider");
const blockNumbers = document.querySelector(".block-num");
const draw = document.querySelector("#draw");
const erase = document.querySelector("#erase");
const clear = document.querySelector(".clear");
let buttons = document.querySelectorAll(".btn");
const colorPicker = document.querySelector("#color-picker");
const rainbow = document.querySelector("#rainbow");
const colorVal = document.querySelector("#color-val");
let mousePressed = false;
let mode = "draw";
let colorMode = "colorPicker";
let colorChoice = "#000000";

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

function random(number) {
  return Math.floor(Math.random() * number);
}

function rainbowColor() {
  rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
  return rndCol;
}
colorVal.textContent = colorPicker.value;

colorPicker.addEventListener("input", () => {
  colorMode = "colorPicker";
  colorChoice = colorPicker.value;
  mode = "draw";
  colorVal.textContent = colorPicker.value;
});

rainbow.addEventListener("click", () => {
  colorMode = "rainbowCol";
  mode = "draw";
});

function sketchOver(e) {
  if (e.type === "mouseup") {
    mousePressed = false;
  } else if (e.type === "mousedown") {
    mousePressed = true;
  } else if (e.type === "mouseover") {
    if (e.target.classList.contains("skb") && mousePressed) {
      if (mode === "draw") {
        switch (colorMode) {
          case "colorPicker":
            e.target.style.backgroundColor = colorChoice;
            break;
          case "rainbowCol":
            e.target.style.backgroundColor = rainbowColor();
            break;
          default:
            e.target.style.backgroundColor = "#000000";
        }
      } else if (mode === "erase") {
        e.target.style.backgroundColor = "";
      }
      e.stopPropagation();
    }
  }
}

function sketchClick(e) {
  if (e.target.classList.contains("skb")) {
    if (mode === "draw") {
      switch (colorMode) {
        case "colorPicker":
          e.target.style.backgroundColor = colorChoice;
          break;
        case "rainbowCol":
          e.target.style.backgroundColor = rainbowColor();
          break;
        default:
          e.target.style.backgroundColor = "#000000";
      }
    } else if (mode === "erase") {
      e.target.style.backgroundColor = "";
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
    block.style.backgroundColor = "";
  }
  mode = "draw";
  colorPicker.value = "#000000";
  colorVal.textContent = colorPicker.value;
  colorMode = "colorPicker";
  colorChoice = colorPicker.value;
});
