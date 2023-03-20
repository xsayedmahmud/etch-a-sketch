const sketchBox = document.querySelector("#sketchbox");
const slider = document.querySelector("#slider");
const blockNumbers = document.querySelector(".block-num");
let mousePressed = false;

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

// function changeColor(e) {
//   sketchBox.addEventListener("mouseup", () => {
//     mousePressed = false;
//   });
//   sketchBox.addEventListener("mousedown", () => {
//     mousePressed = true;
//   });
//   if (mousePressed && e.target.classList.contains("skb")) {
//     e.target.style.backgroundColor = "black";
//     e.stopPropagation();
//   }
// }
// sketchBox.addEventListener("mouseover", changeColor);

// sketchBox.addEventListener("click", (e) => {
//   if (e.target.classList.contains("skb")) {
//     e.target.style.backgroundColor = "black";
//     e.stopPropagation();
//   }
// });

function changeColor(e) {
  if (e.type === "mouseup") {
    mousePressed = false;
  } else if (e.type === "mousedown") {
    mousePressed = true;
  } else if (e.type === "mouseover" || e.type === "click") {
    if (
      mousePressed ||
      (e.type === "click" && e.target.classList.contains("skb"))
    ) {
      e.target.style.backgroundColor = "black";
      e.stopPropagation();
    }
  }
}

sketchBox.addEventListener("mouseup", changeColor);
sketchBox.addEventListener("mousedown", changeColor);
sketchBox.addEventListener("mouseover", changeColor);
sketchBox.addEventListener("click", changeColor);
