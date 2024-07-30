function mimicServerCall() {
  return new Promise((resolve, reject) => {
    // Simulate a network delay
    setTimeout(() => {
      // Simulate success or failure
      Math.random() < 0.5 ? resolve('success') : reject('fail');
    }, 1000);
  });
}


// Select DOM elements
const errorModal = document.getElementById('error-modal');
const errorMessage = document.getElementById('error-message');
const hearts = document.querySelectorAll('.like');

// Add .hidden class to error modal
errorModal.classList.add('hidden');

// Function to handle click on a heart
function handleHeartClick(event) {
  const heart = event.target.closest('.like');
  const isFullHeart = heart.classList.contains('activated-heart');
  const heartGlyph = heart.querySelector('.like-glyph');

  // Simulate server call
  mimicServerCall()
    .then(() => {
      // If the heart was empty and server call was successful
      if (!isFullHeart) {
        heart.classList.add('activated-heart');
        heartGlyph.innerHTML = '&#x2665;'; // Full heart
      } else {
        // If the heart was full and server call was successful
        heart.classList.remove('activated-heart');
        heartGlyph.innerHTML = '&#x2661;'; // Empty heart
      }
    })
    .catch(() => {
      // If server call failed
      errorMessage.innerText = 'Something went wrong. Please try again later.';
      errorModal.classList.remove('hidden');
      setTimeout(() => {
        errorModal.classList.add('hidden');
      }, 3000);
    });
}

// Add event listeners to all hearts
hearts.forEach(heart => {
  heart.addEventListener('click', handleHeartClick);
});
