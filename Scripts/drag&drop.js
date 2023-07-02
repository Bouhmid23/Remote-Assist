function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.setDragImage(ev.target, 0, 0); // Utiliser l'élément glissé comme image de glissement
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  // Créer une copie de l'élément glissé
  var draggedElement = document.getElementById(data);
  var clonedElement = draggedElement.cloneNode(true);

  // Copier les styles de l'élément source vers l'élément cloné
  var computedStyles = window.getComputedStyle(draggedElement);
  for (var i = 0; i < computedStyles.length; i++) {
    var styleName = computedStyles[i];
    clonedElement.style[styleName] = computedStyles[styleName];
  }

  // Positionner la copie aux coordonnées de la souris sur la vidéo
  var video = document.getElementById("peer_video_frame");
  var videoRect = video.getBoundingClientRect();
  var videoOffsetX = videoRect.left + window.scrollX;
  var videoOffsetY = videoRect.top + window.scrollY;

  // Calculer la position de l'élément cloné par rapport à l'origine au centre de la vidéo
  var elementX = ev.clientX - videoOffsetX  - (clonedElement.offsetWidth / 2)+81;
  var elementY = ev.clientY - videoOffsetY - (clonedElement.offsetHeight / 2)-9;

  clonedElement.style.position = "absolute";
  clonedElement.style.left = elementX + "px";
  clonedElement.style.top = elementY + "px";

  document.getElementById("canvas").appendChild(clonedElement);

  // Afficher les coordonnées dans la console
  console.log(`Dropped element coordinates:  x= ${elementX}, y=${elementY}`);
  send({
    "type": "drop_object",
    "data": {
        "x": elementX,
        "y": elementY,
        "object": clonedElement.id
    }
})
}
  
function deleteElement() {
  const canvas = document.getElementById('canvas');
  const objectsInCanvas = Array.from(canvas.querySelectorAll('.arrow, .circle, .triangle, .square')).reverse();
  if (objectsInCanvas.length > 0) {
    const lastObject = objectsInCanvas.pop();
    lastObject.remove();
    send({
      "type": "delete_object",
      "data":  lastObject.id
    })
  }
}

function drop_object(data){
  var video = document.getElementById("client_video_frame")
  var videoHeight = video.offsetHeight+5;

  var object = data["object"]
  var x = data["x"]
  var y = data["y"]

  var element = document.getElementById(object)
  var clonedElement = element.cloneNode(true);

  var computedStyles = window.getComputedStyle(element);
  for (var i = 0; i < computedStyles.length; i++) {
    var styleName = computedStyles[i];
    clonedElement.style[styleName] = computedStyles[styleName];
  }
  var elementX = x
  var elementY = y+18
  clonedElement.style.position = "absolute"
  clonedElement.style.left = elementX + "px"
  clonedElement.style.top = elementY + "px"
  document.getElementById("receiving_canvas").appendChild(clonedElement)

}

function delete_object(){
  const canvas = document.getElementById('receiving_canvas');
  const objectsInCanvas = Array.from(canvas.querySelectorAll('.arrow, .circle, .triangle, .square')).reverse();
  if (objectsInCanvas.length > 0) {
    const lastObject = objectsInCanvas.pop();
    lastObject.remove();
  }
}