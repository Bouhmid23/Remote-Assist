const style = [{
  "selector":".arrow",
  "styles":{
    "clip-path": "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    "background-color": "transparent",
    "border": "7px  solid #ff4000",
    }
  },
  {
  "selector":".circle",
  "styles":{
    "border-radius": "50%",
    "background-color": "transparent",
    "border": "4px  solid #fd58ce",
    }
  },
  {
  "selector":".square",
  "styles":{
    "border-radius": "0%",
    "background-color": "transparent",
    "border": "3px solid #2bff00",
  }},
  {
    "selector":".triangle",
    "styles":{
      "border-left": "20px solid transparent",
      "border-right": "20px solid transparent",
      "border-bottom": "40px solid",
      "border-bottom-color": "#78dbff"
    }}
  ]


const obj = [
  {
  "type": "div",
  "class":"arrow",
  "id": "arrow",
  "width":"40px",
  "height":"40px",
  },
  {
    "type": "div",
    "class":"circle",
    "id": "circle",
    "width":"40px",
    "height":"40px",
  },
  {
    "type": "div","class":"triangle","id": "triangle", "width":"40px",
    "height":"40px",
  },
  {
    "type": "div","class":"square","id": "square", "width":"40px",
    "height":"40px",
  },
  { "type" : "svg",
    "class":"fleche",
    "id": "fleche",
    "width":"40px",
    "height":"40px",
    "content":{"xmlns": 'http://www.w3.org/2000/svg',
              "viewBox":"0 0 1280.000000 640.000000",
              "preserveAspectRatio":"xMidYMid meet",
              "innerHTML":'<g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" fill="#00FBFF" stroke="none"><path d="M7045 5791 c-91 -41 -132 -136 -122 -286 4 -49 20 -189 36 -310 40 -291 51 -407 54 -545 l2 -115 -120 3 c-524 13 -1482 86 -3110 237 -1797 166 -2234 204 -2725 236 -215 14 -565 17 -642 6 -83 -12 -145 -56 -182 -130 -26 -52 -29 -66 -28 -155 2 -110 14 -170 120 -582 109 -426 143 -644 143 -920 0 -364 -63 -629 -292 -1242 -156 -417 -172 -470 -173 -584 -1 -84 1 -94 29 -140 22 -36 44 -56 83 -76 77 -39 165 -44 442 -24 443 32 806 73 2550 291 2071 259 2672 328 3353 385 265 22 337 24 337 11 0 -5 -13 -61 -29 -123 -35 -135 -77 -256 -178 -518 -107 -277 -123 -326 -130 -405 -7 -88 16 -141 79 -182 39 -26 49 -28 147 -28 128 0 220 22 556 132 1303 427 4179 1685 5153 2254 362 212 449 322 378 474 -58 126 -276 266 -871 560 -1384 683 -3773 1616 -4531 1770 -153 31 -271 33 -329 6z"/></g>'}
            },
            { "type" : "svg",
            "class":"select",
            "id": "select",
            "width":"40px",
            "height":"40px",
            "content":{"xmlns": 'http://www.w3.org/2000/svg',
                      "xmlns:xlink":"http://www.w3.org/1999/xlink",
                      "viewBox":"0 0 60 60",
                      "xml:space":"preserve",
                      "innerHTML":'<g><path style="fill:#434C6D;" d="M59.261,46.849L44.166,29.152c-0.25-0.293-0.645-0.418-1.02-0.316c-0.373,0.1-0.654,0.405-0.725,0.784l-4.224,22.873c-0.08,0.434,0.134,0.869,0.525,1.07c0.146,0.075,0.302,0.111,0.458,0.111c0.265,0,0.525-0.105,0.719-0.305l6.879-7.115l3.484,13.003C50.383,59.706,50.787,60,51.228,60c0.086,0,0.173-0.011,0.26-0.034c0.533-0.143,0.85-0.691,0.707-1.225l-3.484-13.003l9.514,2.722c0.424,0.117,0.877-0.05,1.116-0.421S59.547,47.185,59.261,46.849z"/></g><g><path style="fill:#7383BF;" d="M35.5,52H35c-0.553,0-1-0.447-1-1s0.447-1,1-1h0.5c0.553,0,1,0.447,1,1S36.053,52,35.5,52z"/><path style="fill:#7383BF;" d="M31.118,52h-0.971c-0.553,0-1-0.447-1-1s0.447-1,1-1h0.971c0.553,0,1,0.447,1,1S31.671,52,31.118,52z M26.266,52h-0.971c-0.553,0-1-0.447-1-1s0.447-1,1-1h0.971c0.553,0,1,0.447,1,1S26.818,52,26.266,52z M21.412,52h-0.971c-0.553,0-1-0.447-1-1s0.447-1,1-1h0.971c0.553,0,1,0.447,1,1S21.965,52,21.412,52z M16.56,52h-0.971c-0.553,0-1-0.447-1-1s0.447-1,1-1h0.971c0.553,0,1,0.447,1,1S17.112,52,16.56,52z M11.706,52h-0.971c-0.553,0-1-0.447-1-1s0.447-1,1-1h0.971c0.553,0,1,0.447,1,1S12.259,52,11.706,52z M6.853,52H5.883c-0.553,0-1-0.447-1-1s0.447-1,1-1h0.971c0.553,0,1,0.447,1,1S7.406,52,6.853,52z"/><path style="fill:#7383BF;" d="M2,52H1.5c-0.553,0-1-0.447-1-1v-0.5c0-0.553,0.447-1,1-1c0.405,0,0.755,0.241,0.912,0.588C2.759,50.245,3,50.595,3,51C3,51.553,2.553,52,2,52z"/><path style="fill:#7383BF;" d="M1.5,47.5c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1s1,0.447,1,1v1C2.5,47.053,2.053,47.5,1.5,47.5z M1.5,42.5c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1s1,0.447,1,1v1C2.5,42.053,2.053,42.5,1.5,42.5z M1.5,37.5c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1s1,0.447,1,1v1C2.5,37.053,2.053,37.5,1.5,37.5z M1.5,32.5c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1s1,0.447,1,1v1C2.5,32.053,2.053,32.5,1.5,32.5z M1.5,27.5c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1s1,0.447,1,1v1C2.5,27.053,2.053,27.5,1.5,27.5z M1.5,22.5c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1s1,0.447,1,1v1C2.5,22.053,2.053,22.5,1.5,22.5z M1.5,17.5c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1s1,0.447,1,1v1C2.5,17.053,2.053,17.5,1.5,17.5z M1.5,12.5c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1s1,0.447,1,1v1C2.5,12.053,2.053,12.5,1.5,12.5z M1.5,7.5c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1s1,0.447,1,1v1C2.5,7.053,2.053,7.5,1.5,7.5z"/><path style="fill:#7383BF;" d="M1.5,2.5c-0.553,0-1-0.447-1-1V1c0-0.553,0.447-1,1-1H2c0.553,0,1,0.447,1,1c0,0.405-0.241,0.755-0.588,0.912C2.255,2.259,1.905,2.5,1.5,2.5z"/><path style="fill:#7383BF;" d="M47,2h-1c-0.553,0-1-0.447-1-1s0.447-1,1-1h1c0.553,0,1,0.447,1,1S47.553,2,47,2z M42,2h-1c-0.553,0-1-0.447-1-1s0.447-1,1-1h1c0.553,0,1,0.447,1,1S42.553,2,42,2z M37,2h-1c-0.553,0-1-0.447-1-1s0.447-1,1-1h1c0.553,0,1,0.447,1,1S37.553,2,37,2z M32,2h-1c-0.553,0-1-0.447-1-1s0.447-1,1-1h1c0.553,0,1,0.447,1,1S32.553,2,32,2z M27,2h-1c-0.553,0-1-0.447-1-1s0.447-1,1-1h1c0.553,0,1,0.447,1,1S27.553,2,27,2z M22,2h-1c-0.553,0-1-0.447-1-1s0.447-1,1-1h1c0.553,0,1,0.447,1,1S22.553,2,22,2z M17,2h-1c-0.553,0-1-0.447-1-1s0.447-1,1-1h1c0.553,0,1,0.447,1,1S17.553,2,17,2z M12,2h-1c-0.553,0-1-0.447-1-1s0.447-1,1-1h1c0.553,0,1,0.447,1,1S12.553,2,12,2z M7,2H6C5.447,2,5,1.553,5,1s0.447-1,1-1h1c0.553,0,1,0.447,1,1S7.553,2,7,2z"/><path style="fill:#7383BF;" d="M51.5,2.5c-0.405,0-0.755-0.241-0.912-0.588C50.241,1.755,50,1.405,50,1c0-0.553,0.447-1,1-1h0.5c0.553,0,1,0.447,1,1v0.5C52.5,2.053,52.053,2.5,51.5,2.5z"/><path style="fill:#7383BF;" d="M51.5,26.639c-0.553,0-1-0.447-1-1v-0.966c0-0.553,0.447-1,1-1s1,0.447,1,1v0.966C52.5,26.191,52.053,26.639,51.5,26.639z M51.5,21.811c-0.553,0-1-0.447-1-1v-0.965c0-0.553,0.447-1,1-1s1,0.447,1,1v0.965C52.5,21.363,52.053,21.811,51.5,21.811z M51.5,16.983c-0.553,0-1-0.447-1-1v-0.966c0-0.553,0.447-1,1-1s1,0.447,1,1v0.966C52.5,16.536,52.053,16.983,51.5,16.983z M51.5,12.155c-0.553,0-1-0.447-1-1V10.19c0-0.553,0.447-1,1-1s1,0.447,1,1v0.965C52.5,11.708,52.053,12.155,51.5,12.155z M51.5,7.328c-0.553,0-1-0.447-1-1V5.362c0-0.553,0.447-1,1-1s1,0.447,1,1v0.966C52.5,6.881,52.053,7.328,51.5,7.328z"/><path style="fill:#7383BF;" d="M51.5,31c-0.553,0-1-0.447-1-1v-0.5c0-0.553,0.447-1,1-1s1,0.447,1,1V30C52.5,30.553,52.053,31,51.5,31z"/></g>'}
                    },
    { "type" : "svg",
    "class":"cube",
    "id": "cube",
    "width":"40px",
    "height":"40px",
    "content":{"xmlns": 'http://www.w3.org/2000/svg',
              "xmlns:xlink":"http://www.w3.org/1999/xlink",
              "viewBox":"0 0 58 58",
              "xml:space":"preserve",
              "innerHTML":'<g><polygon style="fill:#26B99A;" points="29,58 3,45 3,13 29,26 "/><polygon style="fill:#556080;" points="29,58 55,45 55,13 29,26 "/><polygon style="fill:#434C6D;" points="3,13 28,0 55,13 29,26 "/></g>'}
            },
    { "type" : "svg",
    "class":"etoile",
    "id": "etoile",
    "width":"40px",
    "height":"40px",
    "content":{"xmlns": 'http://www.w3.org/2000/svg',
              "viewBox":"0 0 100 100",
              "innerHTML":'<polygon points="50,5 63.4,39.6 98.3,39.6 69.7,61 83.1,95 50,74.3 16.9,95 30.3,61 1.7,39.6 36.6,39.6" fill="#ff0000" stroke="#000000" stroke-width="2" />'}
            },
  {"style": style} ]


  var list_objects = []
  const styleElement = obj.find(item =>item.style !== undefined)
  var generatedCSS = generateStylesFromJSON(styleElement.style);
  addStylesToCSSFile(generatedCSS);

function generateStylesFromJSON(data) {
  let css = '';
  data.forEach(item => {
    const selector = item.selector;
    const styles = item.styles;
    const styleDeclaration = Object.entries(styles)
      .map(([key, value]) => `${key}: ${value};`)
      .join('');
    css += `${selector} { ${styleDeclaration} }\n`;
  });
  return css;
}

function addStylesToCSSFile(css) {
  const styleElement = document.createElement('style');
  styleElement.textContent = css;
  document.head.appendChild(styleElement);
}
function loadToolbarMembers() {
  const toolbar = document.getElementById("toolbar");
  obj.forEach(element => {
    if(element.type !== undefined){
      const member = document.createElement('div');
      member.className = element.class;
      member.id = element.id;
      if(element.type == "svg"){
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        for (const [key, value] of Object.entries(element.content)) {
          if (key == "innerHTML"){
            svg.innerHTML = value
          }
          else{
            svg.setAttribute(key, value);
          }
        member.appendChild(svg)
      }}
      member.style.width = element.width;
      member.style.height = element.height;
      member.draggable = true;
      member.addEventListener('dragstart', drag);
      toolbar.appendChild(member);
      console.log("Toolbar members added")
    }
  })
}


function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
   // Utiliser l'élément glissé comme image de glissement
  ev.dataTransfer.setDragImage(ev.target, 0, 0);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  const canvasDiv = document.getElementById("canvas");
  const clonedElement = document.createElement('div');
  const computedStyles = window.getComputedStyle(draggedElement);
  
  if(computedStyles !== undefined && computedStyles !== null){
    for (const styleName of computedStyles) {
      clonedElement.style[styleName] = computedStyles.getPropertyValue(styleName);}
    }
  const video = document.getElementById("peer_video_frame");
  const videoRect = video.getBoundingClientRect();
  const videoOffsetX = videoRect.left + window.scrollX;
  const videoOffsetY = videoRect.top + window.scrollY;
  const elementX = ev.clientX - videoOffsetX - (clonedElement.offsetWidth / 2) + 89;
  const elementY = ev.clientY - videoOffsetY - (clonedElement.offsetHeight / 2) - 5;

  clonedElement.id = draggedElement.id 
  clonedElement.className = draggedElement.className
  clonedElement.style.width = draggedElement.style.width;
  clonedElement.style.height = draggedElement.style.height;
  if(draggedElement.innerHTML !==null){
    clonedElement.innerHTML = draggedElement.innerHTML
  }
  clonedElement.style.position = "absolute";
  clonedElement.style.left = elementX + "px";
  clonedElement.style.top = elementY + "px";
  clonedElement.style.resize = "both";
  canvasDiv.appendChild(clonedElement);
  list_objects.push(clonedElement)

  clonedElement.draggable = true;
  clonedElement.addEventListener('mousedown', initResize);
  clonedElement.addEventListener('dragstart', drag);
  //canvasDiv.removeEventListener('drop', drop);

  // Affiche les coordinates dans la console
  console.log(`Dropped element coordinates:  x= ${elementX}, y=${elementY}`);
  send({
    "type": "drop_object",
    "data": {
        "x": elementX,
        "y": elementY,
        "object": clonedElement.id,
        "width": clonedElement.style.width,
        "height": clonedElement.style.height,
        "index": list_objects.indexOf(clonedElement),
        "innerHTML": clonedElement.innerHTML
    }
})
}

function deleteElement() {
  const canvas = document.getElementById('canvas');
  let objectsInCanvas = Array.from(canvas.querySelectorAll('div')).reverse();
  if (objectsInCanvas.length > 0) {
    const lastObject = objectsInCanvas.pop();
    lastObject.remove();
    lastObject.removeEventListener("mousedown", initResize);
    list_objects.splice(list_objects.indexOf(lastObject), 1);
    send({
      "type": "delete_object",
      "data":  lastObject.id
    })
  }
}
////////////  Parti socket  ////////////////

function drop_object(data){
  const receiving_canvas = document.getElementById("receiving_canvas")
  var object = data["object"]
  var x = data["x"]
  var y = data["y"]
  var width = data["width"]
  var height = data["height"]
  var innerHTML = data["innerHTML"]
  var clonedElement = document.createElement("div")
  clonedElement.id = object
  clonedElement.className = object
  clonedElement.innerHTML = innerHTML
  var elementX = x-7
  var elementY = y+28
  clonedElement.style.width = width
  clonedElement.style.height = height
  clonedElement.style.position = "absolute"
  clonedElement.style.left = elementX + "px"
  clonedElement.style.top = elementY + "px"
  receiving_canvas.appendChild(clonedElement)
  list_objects.push(clonedElement)
}

function delete_object(){
  const canvas = document.getElementById('receiving_canvas');
  const objectsInCanvas = Array.from(canvas.querySelectorAll('div')).reverse();
  if (objectsInCanvas.length > 0) {
    const lastObject = objectsInCanvas.pop();
    lastObject.remove();
    list_objects.splice(list_objects.indexOf(lastObject), 1);
  }
}

function initResize(event) {
  const resizableDiv = event.target;
  let newWidth;
  let newHeight;
  const startWidth = resizableDiv.offsetWidth;
  const startHeight = resizableDiv.offsetHeight;
  const startX = event.clientX;
  const startY = event.clientY;
  const resizeHandleSize = 20;
  const canvasDiv = document.getElementById("canvas");
  const rect = resizableDiv.getBoundingClientRect();
  const isResizeHandleClicked =
    startX >= rect.right - resizeHandleSize && startY >= rect.bottom - resizeHandleSize;

  if(isResizeHandleClicked  && canvasDiv.contains(resizableDiv)){
    document.addEventListener('mousemove', startResize);
    document.addEventListener('mouseup', stopResize);
    resizableDiv.draggable = false;
  }

  function startResize(e) {
    newWidth = startWidth + e.clientX - startX;
    newHeight = startHeight + e.clientY - startY;
    resizableDiv.style.width = newWidth + 'px';
    resizableDiv.style.height = newHeight + 'px';
    send({
      "type": "resize_element",
      "data": {
          "width": newWidth,
          "height": newHeight,
          "index": list_objects.indexOf(resizableDiv),
          "object": resizableDiv.id,
      }
    })
  }

  function stopResize() {
    document.removeEventListener('mousemove', startResize);
    document.removeEventListener('mouseup', stopResize);
    resizableDiv.draggable = true;
    
  }
}

function resize_object(data){
  var index = data["index"]
  var width = data["width"]
  var height = data["height"]
  const receiving_canvas = document.getElementById("receiving_canvas")
  const divs = receiving_canvas.querySelectorAll('div');
  var resizableDiv = divs[index]
  if(resizableDiv !== undefined){ 
    resizableDiv.style.width = width + 'px';
    resizableDiv.style.height = height + 'px';
}}
