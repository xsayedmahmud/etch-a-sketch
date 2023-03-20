const sketchbox = document.querySelector("#sketchbox");
const slider = document.querySelector("#slider");

function updateSketchBox() {
  const value = slider.value;
  sketchbox.style.setProperty("--value", value);

  while (sketchbox.firstChild) {
    sketchbox.removeChild(sketchbox.firstChild);
  }

  for (let i = 0; i < value * value; i++) {
    const sketchBlock = document.createElement("div");
    sketchBlock.classList.add("skb");
    sketchbox.appendChild(sketchBlock);
  }
}

updateSketchBox();
slider.addEventListener("input", updateSketchBox);
