"use strict";

// The model of all features
const features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false
};
console.log(features);

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document.querySelectorAll(".option").forEach(option => option.addEventListener("click", toggleOption));
}


function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  let childElement;
  let childImg;
  let parent = document.querySelector("#selected ul");



  if (features[feature] === false) {
    // TODO: Toggle feature in "model"
    features[feature] = true;
    // - mark target as chosen (add class "chosen")
    target.classList.add("chosen");
    // - un-hide the feature-layer(s) in the #product-preview;
    document.querySelector(`img[data-feature="${feature}"`).classList.remove("hide");
    // - create featureElement and append to #selected ul
    childElement = document.createElement("li");
    childImg = target.querySelector("img").cloneNode(true);
    childElement.appendChild(childImg);
    parent.appendChild(childElement);
    childElement.dataset.feature = feature;

    // - create FLIP-animation to animate featureElement from img in target, to
    //   its intended position. Do it with normal animation or transition class!
    // FIRST
    const start = document.querySelector(`figure[data-feature="${feature}"`).getBoundingClientRect();
    console.log(start);
    // LAST
    const end = childElement.getBoundingClientRect();
    console.log(end);
    // INVERT (translate element to the start position)
    const diffX = start.x - end.x;
    const diffY = start.y - end.y;
    childElement.style.transform = `translate(${diffX}px, ${diffY}px)`;
    childElement.offsetHeight;
    // PLAY: animate the element to translate (0,0)
    childElement.style.transition = "transform 1s";
    childElement.style.transform = "translate(0, 0)";


  } else {
    // Else - if the feature (became) turned off:
    features[feature] = false;
    // - no longer mark target as chosen
    target.classList.remove("chosen");
    // - hide the feature-layer(s) in the #product-preview
    document.querySelector(`img[data-feature="${feature}"`).classList.add("hide");
    const toBeRemoved = document.querySelector(`li[data-feature="${feature}"`);
    toBeRemoved.remove();

  }
}

document.querySelector("#saveBtn").addEventListener("click", function () {
  const choice = document.querySelector("#product-preview");
  localStorage.setItem("robot", choice.innerHTML);
});



// Create featureElement to be appended to #selected ul - could have used a <template> instead


// function createFeatureElement(feature) {
//   const li = document.createElement("li");
//   li.dataset.feature = feature;

//   const img = document.createElement("img");
//   img.src = `images/feature_${feature}.png`;
//   img.alt = capitalize(feature);

//   li.append(img);

//   return li;
// }

// function capitalize(text) {
//   return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
// }