setTimeout(removeGraphy, 3000);

function removeGraphy() {
  console.log("Yo!");
  var els = document.querySelector(".containerBody");
  var next = els.nextElementSibling;
  next.style.display = "none";
}
