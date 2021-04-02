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

var Nslider = document.getElementById("arrLen");
var Noutput = document.getElementById("lenNr");
Noutput.innerHTML = Nslider.value;

Nslider.oninput = function () {
  arrLen = this.value;
  Noutput.innerHTML = this.value;

  reset();
};

var Dslider = document.getElementById("delay");
var Doutput = document.getElementById("delayNr");
Doutput.innerHTML = Dslider.value + " ms";

Dslider.oninput = function () {
  delay = this.value;
  Doutput.innerHTML = this.value + " ms";
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
  //list.forEach(drawLine);
  for (var i = 0; i <= arrLen; i++) {
    drawLine(list[i], i);
  }
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

function mergeSort() {
  sort(list, 0, arrLen - 1);
}

async function merge(arr, l, m, r) {
  // Find sizes of two subarrays to be merged
  var n1 = m - l + 1;
  var n2 = r - m;

  /* Create temp arrays */
  var L = [];
  var R = [];

  /*Copy data to temp arrays*/
  for (var i = 0; i < n1; ++i) L.push(arr[l + i]);
  for (var j = 0; j < n2; ++j) R.push(arr[m + 1 + j]);

  /* Merge the temp arrays */

  // Initial indexes of first and second subarrays
  var i = 0;
  var j = 0;

  // Initial index of merged subarry array
  var k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
      drawLine(arr[k], k, "red");
      await sleep();
      drawArr();
    } else {
      arr[k] = R[j];
      j++;
      drawLine(arr[k], k, "red");
      await sleep();
      drawArr();
    }
    k++;
  }

  /* Copy remaining elements of L[] if any */
  while (i < n1) {
    arr[k] = L[i];
    i++;

    drawLine(arr[k], k, "red");
    await sleep();
    drawArr();
    k++;
  }

  /* Copy remaining elements of R[] if any */
  while (j < n2) {
    arr[k] = R[j];
    j++;

    drawLine(arr[k], k, "red");
    await sleep();
    drawArr();
    k++;
  }
}

async function sort(arr, l, r) {
  if (l < r) {
    // Find the middle point
    var m = Math.floor(l + (r - l) / 2);

    // Sort first and second halves
    await sort(arr, l, m);

    await sort(arr, m + 1, r);
    drawArr();
    await sleep();

    // Merge the sorted halves
    await merge(arr, l, m, r);
  }
}

// Reference:https://www.geeksforgeeks.org/quick-sort/
async function partition(low, high) {
  // pivot
  var pivot = list[high];

  // Index of smaller element and
  // indicates the right position
  // of pivot found so far
  var i = low - 1;

  for (var j = low; j <= high - 1; j++) {
    // If current element is smaller
    // than the pivot
    if (list[j] < pivot) {
      // Increment index of
      // smaller element
      i++;
      swap(i, j);
      await sleep();
      drawLine(list[i], i);
      drawLine(list[j], j);
    }
  }

  swap(i + 1, high);
  await sleep();
  drawLine(list[i + 1], i + 1);
  drawLine(list[high], high);

  return i + 1;
}

/* The main function that implements QuickSort
          low --> Starting index,
          high --> Ending index
 */
async function quickSort(low = 0, high = arrLen - 1) {
  if (low < high) {
    // pi is partitioning index, list
    // is now at right place
    var pi = await partition(low, high);

    // Separately sort elements before
    // partition and after partition
    quickSort(low, pi - 1);
    quickSort(pi + 1, high);
  }
}

async function quickSortSynced(low = 0, high = arrLen - 1) {
  if (low < high) {
    // pi is partitioning index, list
    // is now at right place
    var pi = await partition(low, high);

    // Separately sort elements before
    // partition and after partition
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
}
