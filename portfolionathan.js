// ====== LOADING SCREEN ======
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen")
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 2000)
})

// ====== NAVBAR FUNCTIONALITY ======
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navLinks = document.getElementById("nav-links")

// Hamburger menu toggle
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("nav-active")
    hamburger.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// ====== TYPING ANIMATION ======
const profesiEl = document.getElementById("profesi")
const profesiList = ["UI Designer", "Web Developer", "HR Recruitment", "Deaf Actor"]

let profesiIndex = 0
let charIndex = 0
let isDeleting = false

function typeEffect() {
  const currentText = profesiList[profesiIndex]

  if (isDeleting) {
    profesiEl.textContent = currentText.substring(0, charIndex - 1)
    charIndex--
  } else {
    profesiEl.textContent = currentText.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = 100

  if (isDeleting) {
    typeSpeed /= 2
  }

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    profesiIndex++
    if (profesiIndex === profesiList.length) {
      profesiIndex = 0
    }
    typeSpeed = 500
  }

  setTimeout(typeEffect, typeSpeed)
}

// Start typing animation
typeEffect()

// ====== SMOOTH SCROLLING ======
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ====== BACK TO TOP BUTTON ======
const backToTopBtn = document.getElementById("back-to-top")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("visible")
  } else {
    backToTopBtn.classList.remove("visible")
  }
})

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// ====== INTERSECTION OBSERVER FOR ANIMATIONS ======
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".skill-item, .timeline-item, .project-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// ====== CONTACT FORM ======
const contactForm = document.querySelector(".contact-form")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = contactForm.querySelector('input[type="text"]').value
  const email = contactForm.querySelector('input[type="email"]').value
  const message = contactForm.querySelector("textarea").value

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all fields")
    return
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector("button")
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  submitBtn.disabled = true

  setTimeout(() => {
    alert("Thank you for your message! I'll get back to you soon.")
    contactForm.reset()
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
  }, 2000)
})

// ====== PARALLAX EFFECT ======
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-shapes")

  parallaxElements.forEach((element) => {
    const speed = 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// ====== ACTIVE NAV LINK ======
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// ====== CURSOR EFFECT (Optional Enhancement) ======
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor")
  if (cursor) {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  }
})

// ====== PERFORMANCE OPTIMIZATION ======
// Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  // Scroll-based animations and effects
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

console.log("🚀 Nathan Portfolio loaded successfully!")
