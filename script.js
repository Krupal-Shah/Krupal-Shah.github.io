let intro = document.querySelector(".logo");
let logo = document.querySelectorAll(".logo-intro");
let text = document.querySelector(".logo-intro-text-2");

window.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(() => {
        logo[0].classList.add('active');
        setTimeout(() => {
            logo[0].classList.remove('active');
            logo[0].classList.add('fade');
            logo[1].classList.add('active');
            setTimeout(()=>{
                var child = logo[1].children;
                child[0].classList.remove('left25');
                child[1].classList.remove('right25');
                child[0].classList.add('left0');
                child[1].classList.add('right0');
            }, 450)
        }, 700);

        setTimeout(()=>{
            intro.style.top = '-100vh';
            setTimeout(()=>{
                document.getElementById("logo").remove();
            }, 1000)
        }, 2200);
    }, 200);
})

var icon = document.getElementById("icon");
var icon2 = document.querySelectorAll("#icon")[1];

icon.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")){
        icon.src = "img/light_mode.png";
    } else {
        icon.src = "img/dark_mode.png"
    }
}

icon2.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")){
        icon2.src = "img/light_mode.png";
    } else {
        icon2.src = "img/dark_mode.png"
    }
}


const cursor = document.querySelector('.cursor');
const cursorchange = document.querySelectorAll('.cursor__change');

document.addEventListener('mousemove', (e)=>{
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';

    cursorchange.forEach((change)=>{
        change.addEventListener('mouseenter', ()=>{
            cursor.style.backgroundColor = 'var(--white)';
        })

        change.addEventListener('mouseleave', ()=>{
            cursor.style.backgroundColor = 'var(--black)';

        })
    })
})

var links = document.querySelectorAll('.navigation__link-2');
var checkbox = document.querySelector('.navigation__checkbox');
checkbox.addEventListener('click', ()=>{
    if (checkbox.checked == true){
        links.forEach((link)=>{
            link.addEventListener('click', ()=>{
                checkbox.checked = false;
                console.log("hello");
            })
        })
    };
})

const checkboxes = document.querySelectorAll('.skills__checkbox');
const skills = document.querySelectorAll('.skills__container span');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const category = this.id;
        console.log(category);
        skills.forEach(skill => {
            const skillCategories = skill.classList[1].replace('skills-', '');
            if (category == "all"){
                skill.style.display = 'block';
            } else if (skillCategories == category) {
                skill.style.display = 'block';
            } else {
                skill.style.display = 'none';
            }
        });
    });
});

const about = document.getElementById("about");
const header = document.getElementById("header-laptop");

document.addEventListener("scroll", function() {
    const rect = about.getBoundingClientRect();
    console.log(rect.top);
    if (rect.top < 0 && !(header.classList.contains("header__back"))){
        header.classList.add("header__back");
    } else if (rect.top > 0 && header.classList.contains("header__back")){
        header.classList.remove("header__back");
    };
})

const wrapper = document.querySelector(".proj__wrapper");
const carousel = document.querySelector(".proj__carousel");
const firstCardWidth = carousel.querySelector(".proj__card").offsetWidth;
const arrowBtns = document.querySelectorAll(".proj__wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "proj__left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);