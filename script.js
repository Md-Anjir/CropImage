  // Get canvas and context
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Get cropped canvas and context
  const croppedCanvas = document.getElementById('croppedCanvas');
  const croppedCtx = croppedCanvas.getContext('2d');

  // Set initial image properties
  const image = new Image();

  // Load image and draw it on the canvas
  function drawImage(x, y, scale) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
  }

  // Variables for handling drag, zoom, and crop
let isDragging = false;
let dragStartX, dragStartY;
let imageX = 0;
let imageY = 0;
let scale = 1;

  // Event listeners for mouse down, move, and up
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStartX;
      const deltaY = e.clientY - dragStartY;

      // Update image position based on drag movement
      imageX += deltaX;
      imageY += deltaY;

      // Draw the image with the updated position
      drawImage(imageX, imageY, scale);

      // Update drag start coordinates
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    }
  });

  canvas.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Prevent default dragging behavior on the canvas
  canvas.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

  // Handle mouse wheel event for zoom
  canvas.addEventListener('wheel', (e) => {
    const delta = e.deltaY;

    if (delta > 0) {
      // Zoom out
      scale *= 0.9;
    } else {
      // Zoom in
      scale *= 1.1;
    }

    // Draw the image with the updated scale
    drawImage(imageX, imageY, scale);
  });

  // Handle image input change
  const imageInput = document.getElementById('imageInput');
  imageInput.addEventListener('change', handleImageUpload);

  function handleImageUpload() {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        image.src = e.target.result;
        image.onload = function () {
          drawImage(imageX, imageY, scale);
        };
      };

      reader.readAsDataURL(file);
    }
  }

  // Handle crop button click
  const cropButton = document.getElementById('cropButton');
  cropButton.addEventListener('click', handleCrop);

  function handleCrop() {
    // Get the cropped region (adjust the values based on your requirements)
    const croppedX = 0;
    const croppedY = 0;
    const croppedWidth = 600;
    const croppedHeight = 400;

    // Draw the cropped region on the cropped canvas
    croppedCtx.clearRect(0, 0, croppedCanvas.width, croppedCanvas.height);
    croppedCtx.drawImage(canvas, croppedX, croppedY, croppedWidth, croppedHeight, 0, 0, croppedCanvas.width, croppedCanvas.height);
  }
