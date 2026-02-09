// Smooth scroll behavior with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Ensure Font Awesome icons are loaded and visible
window.addEventListener('load', () => {
  // Force icons to be visible after page load
  document.querySelectorAll('.fab, .fas, .fa').forEach(icon => {
    icon.style.opacity = '1';
    icon.style.visibility = 'visible';
  });
});

// Navbar scroll effects
const nav = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add scrolled class for styling
  if (currentScroll > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translateY(8px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // Close menu when clicking a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and sections
const observeElements = document.querySelectorAll(
  '.edu-card, .exp-card, .project-card, .blog-card, .contact-card, section'
);

observeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Add animation class
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  nav ul.active {
    display: flex !important;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.98);
    padding: 20px;
    gap: 20px;
    box-shadow: 0 10px 30px rgba(124, 58, 237, 0.15);
  }
  
  @media (min-width: 769px) {
    nav ul.active {
      display: flex !important;
      flex-direction: row;
      position: static;
      background: none;
      padding: 0;
      box-shadow: none;
    }
  }
`;
document.head.appendChild(style);

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Add active link styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
  nav ul a.active {
    color: var(--primary) !important;
  }
  
  nav ul a.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(activeStyle);

// Typing effect for hero subtitle
const heroSubtitle = document.querySelector('.hero-text h2');
if (heroSubtitle) {
  const text = heroSubtitle.textContent;
  heroSubtitle.textContent = '';
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      heroSubtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  
  // Start typing after page load
  setTimeout(typeWriter, 800);
}

// Parallax effect for hero image
const heroImage = document.querySelector('.hero-photo');
if (heroImage) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    if (scrolled < window.innerHeight) {
      heroImage.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Add cursor glow effect
const cursor = document.createElement('div');
cursor.className = 'cursor-glow';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
  .cursor-glow {
    position: fixed;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: opacity 0.3s ease;
  }
  
  @media (max-width: 768px) {
    .cursor-glow {
      display: none;
    }
  }
`;
document.head.appendChild(cursorStyle);

// Add smooth reveal for course tags
const courseTags = document.querySelectorAll('.course-tags .tag');
courseTags.forEach((tag, index) => {
  tag.style.opacity = '0';
  tag.style.transform = 'scale(0.8)';
  tag.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`;
});

const tagsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const tags = entry.target.querySelectorAll('.tag');
      tags.forEach(tag => {
        tag.style.opacity = '1';
        tag.style.transform = 'scale(1)';
      });
      tagsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.course-tags').forEach(container => {
  tagsObserver.observe(container);
});

// Add tech stack animation
const techStacks = document.querySelectorAll('.tech-stack span');
techStacks.forEach((span, index) => {
  span.style.opacity = '0';
  span.style.transform = 'translateY(10px)';
  span.style.transition = `opacity 0.3s ease ${index * 0.03}s, transform 0.3s ease ${index * 0.03}s`;
});

const techObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const spans = entry.target.querySelectorAll('span');
      spans.forEach(span => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      });
      techObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.tech-stack').forEach(container => {
  techObserver.observe(container);
});

// Performance optimization: Reduce animations on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('*').forEach(el => {
    el.style.animation = 'none';
    el.style.transition = 'none';
  });
}

console.log('🚀 Portfolio loaded successfully!');
console.log('💼 Anjali Patil - AI & ML Specialist');
console.log('📧 patil.anjali2023@gmail.com');

// Debug: Check if Font Awesome loaded
setTimeout(() => {
  const icons = document.querySelectorAll('.fab, .fas');
  console.log(`Found ${icons.length} Font Awesome icons`);
  
  // Check if Font Awesome is actually rendering
  icons.forEach((icon, index) => {
    const computed = window.getComputedStyle(icon);
    console.log(`Icon ${index}: font-family = ${computed.fontFamily}`);
    
    // Make absolutely sure icons are visible
    icon.style.display = 'inline-block';
    icon.style.opacity = '1';
    icon.style.visibility = 'visible';
  });
  
  // If Font Awesome didn't load, log a warning
  if (icons.length > 0) {
    const firstIcon = icons[0];
    const computed = window.getComputedStyle(firstIcon);
    if (!computed.fontFamily.includes('Font Awesome')) {
      console.warn('Font Awesome may not have loaded properly');
    }
  }
}, 1000);