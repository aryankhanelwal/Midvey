/* script.js */
function scrollToCollections() {
  document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
  console.log('Navigated to collections section');
}

document.querySelectorAll('.product-image').forEach(function(imgDiv) {
  const images = JSON.parse(imgDiv.getAttribute('data-images'));
  let idx = 0;
  const mainImg = imgDiv.querySelector('.main-img');
  let interval;

  imgDiv.addEventListener('mouseenter', function() {
    interval = setInterval(function() {
      idx = (idx + 1) % images.length;
      mainImg.src = images[idx];
    }, 1000); // Change image every 600ms
  });

  imgDiv.addEventListener('mouseleave', function() {
    clearInterval(interval);
    idx = 0;
    mainImg.src = images[0]; // Reset to first image
  });
});
