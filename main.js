var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const len = 100;

canvas.height = Math.floor(window.innerHeight * 0.3);
canvas.width = Math.floor(window.innerWidth / len) * len;

console.log(canvas.width);

const list = [];
var delay = 1;

const lenRatio = canvas.height / len;
const lineWidth = canvas.width / len;
ctx.lineWidth = lineWidth;

init();
function init() {
  initArr(list);
  scrambleArr(list);
  drawArr(list);
  debug(list);
}

function clearAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clearLine(index) {
  ctx.clearRect(index * lineWidth, 0, lineWidth, canvas.height);
}

function reset() {
  clearAll();
  while (list.length) {
    list.pop();
  }
  init();
}

function initArr(array = list) {
  for (i = 0; i < len; i++) {
    array.push(i + 1);
  }
}

function scrambleArr(array = list) {
  var tempIndex;
  for (i = 0; i < array.length; i++) {
    tempIndex = getRndInteger(0, array.length);
    swap(array, i, tempIndex, 0);
  }
}

async function swap(array, i, j, isDelayed = 1) {
  aux = array[i];
  array[i] = array[j];
  array[j] = aux;
  clearLine(i);
  clearLine(j);
  if (delay >= 100 && isDelayed) {
    drawLine(array[i], i, "blue");
    drawLine(array[j], j, "blue");
    await sleep();
  }
}

function drawArr(array = list) {
  array.forEach(drawLine);
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

function debug(array = list) {
  console.log(array);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function bubbleSort(array = list) {
  var n = array.length;
  for (i = 0; i < n - 1; i++)
    for (j = 0; j < n - i - 1; j++) {
      drawLine(array[j], j, "red");
      drawLine(array[j + 1], j + 1, "red");
      await sleep();

      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
      await sleep();
      drawLine(array[j], j);
      drawLine(array[j + 1], j + 1);
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
function quickSort(arr = list, low = 0, high = len - 1) {
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
