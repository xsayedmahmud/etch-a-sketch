const sketchBox = document.querySelector("#sketchbox");
const slider = document.querySelector("#slider");
const blockNumbers = document.querySelector(".block-num");
const erase = document.querySelector(".erase");
const clear = document.querySelector(".clear");
let mousePressed = false;
let eraseMode = false;
let drawMode = true;

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
  eraseMode = !eraseMode;
  drawMode = !drawMode;
});

function sketchOver(e) {
  if (e.type === "mouseup") {
    mousePressed = false;
  } else if (e.type === "mousedown") {
    mousePressed = true;
  } else if (e.type === "mouseover") {
    if (e.target.classList.contains("skb") && mousePressed) {
      if (drawMode) {
        e.target.style.backgroundColor = "black";
      } else if (eraseMode) {
        e.target.style.backgroundColor = "transparent";
      }
      e.stopPropagation();
    }
  }
}

function sketchClick(e) {
  if (e.target.classList.contains("skb")) {
    if (drawMode) {
      e.target.style.backgroundColor = "black";
    } else if (eraseMode) {
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
});
