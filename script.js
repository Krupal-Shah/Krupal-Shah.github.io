'use strict';

const nav = document.getElementById('navi-btn');

// Function to check if the end of a section is at the top of the viewport
function isElementAtTop(element) {
  const rect = element.getBoundingClientRect();
  console.log(rect)
  return rect.bottom <= -100;
}

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    const header = document.getElementById('head');
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else{
        reveals[i].classList.remove("active");
      }
    }

    if (isElementAtTop(header)) {
        nav.classList.remove('hide');
    } else {
        nav.classList.add('hide');
    }
  }

window.addEventListener("scroll", reveal);

$('.slider').flickity({
  // options
  cellAlign: 'left',
  wrapAround: true,
  freeScroll: true
});


