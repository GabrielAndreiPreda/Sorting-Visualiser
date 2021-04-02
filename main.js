var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var arrLen = 100;

canvas.height = Math.floor(window.innerHeight * 0.3);
canvas.width = Math.floor((window.innerWidth / arrLen) * 0.95) * arrLen;

console.log(canvas.width);

var list = [];
var delay = 100;

var lenRatio = canvas.height / arrLen;
var lineWidth = canvas.width / arrLen;
ctx.lineWidth = lineWidth;

init();

var slider = document.getElementById("arrLen");
var output = document.getElementById("nr");
output.innerHTML = slider.value;

slider.oninput = function () {
  arrLen = this.value;
  output.innerHTML = this.value;

  reset();
};

function init() {
  initArr();
  scrambleArr();
  drawArr();
  debug();
}

function clearAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clearLine(index) {
  ctx.clearRect(index * lineWidth, 0, lineWidth, canvas.height);
}

function reset() {
  clearAll();
  canvas.height = Math.floor(window.innerHeight * 0.3);
  canvas.width = Math.floor((window.innerWidth / arrLen) * 0.95) * arrLen;
  lenRatio = canvas.height / arrLen;
  lineWidth = canvas.width / arrLen;
  ctx.lineWidth = lineWidth;

  while (list.length) {
    list.pop();
  }
  init();
}

function initArr() {
  for (i = 0; i < arrLen; i++) {
    list.push(i + 1);
  }
}

function scrambleArr() {
  var tempIndex;
  for (i = 0; i < list.length; i++) {
    tempIndex = getRndInteger(0, list.length);
    swap(i, tempIndex, 0);
  }
}

async function swap(i, j, isDelayed = 1) {
  aux = list[i];
  list[i] = list[j];
  list[j] = aux;
  clearLine(i);
  clearLine(j);

  if (delay >= 100 && isDelayed) {
    drawLine(list[i], i, "blue");
    drawLine(list[j], j, "blue");
    await sleep();
  }
}

function drawArr() {
  clearAll();
  list.forEach(drawLine);
}

function drawLine(length, index, color = "black") {
  /* ctx.strokeStyle = color; 
  ctx.beginPath();
  ctx.moveTo(index * lineWidth + lineWidth / 2, canvas.height);
  ctx.lineTo(
    index * lineWidth + lineWidth / 2,
    canvas.height - length * lenRatio
  );
  ctx.closePath();
  ctx.stroke(); */

  ctx.fillStyle = color;
  ctx.fillRect(
    index * lineWidth,
    canvas.height - length * lenRatio,
    lineWidth,
    canvas.height
  );
}

function debug() {
  console.log(list);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function bubbleSort() {
  var n = list.length;
  for (i = 0; i < n - 1; i++)
    for (j = 0; j < n - i - 1; j++) {
      drawLine(list[j], j, "red");
      drawLine(list[j + 1], j + 1, "red");
      await sleep();

      if (list[j] > list[j + 1]) {
        swap(j, j + 1);
      }
      await sleep();
      drawLine(list[j], j);
      drawLine(list[j + 1], j + 1);
    }
}

function sleep() {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function partition(arr, low, high) {
  // pivot
  var pivot = arr[high];

  // Index of smaller element and
  // indicates the right position
  // of pivot found so far
  var i = low - 1;

  for (var j = low; j <= high - 1; j++) {
    // If current element is smaller
    // than the pivot
    if (arr[j] < pivot) {
      // Increment index of
      // smaller element
      i++;
      swap(arr, i, j);
      await sleep();
      drawLine(arr[i], i);
      drawLine(arr[j], j);
    }
  }

  swap(arr, i + 1, high);
  await sleep();
  drawLine(arr[i], i);
  drawLine(arr[high], high);
  return i + 1;
}

/* The main function that implements QuickSort
          arr[] --> Array to be sorted,
          low --> Starting index,
          high --> Ending index
 */
function quickSort(arr, low = 0, high = arrLen - 1) {
  if (low < high) {
    // pi is partitioning index, arr[p]
    // is now at right place
    var pi = partition(arr, low, high);

    // Separately sort elements before
    // partition and after partition
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}
