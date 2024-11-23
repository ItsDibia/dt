// Three.js Background
const createBackground = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('background').appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 10000; i++) {
        vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
        vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
        vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x00ffff, size: 1 }));
    scene.add(particles);

    camera.position.z = 1000;

    const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0001;
        renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

const createTypingEffect = () => {
    const text = "Welcome";
    const typingElement = document.createElement('div');
    typingElement.style.position = 'absolute';
    typingElement.style.top = '20%';
    typingElement.style.left = '50%';
    typingElement.style.transform = 'translate(-50%, -50%)';
    typingElement.style.fontSize = '4rem';
    typingElement.style.fontFamily = 'Orbitron, sans-serif';
    typingElement.style.color = '#00ffff';
    typingElement.style.textShadow = '0 0 10px #00ffff';
    document.body.appendChild(typingElement);

    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
            setTimeout(() => {
                gsap.to(typingElement, {
                    opacity: 0,
                    duration: 2,
                    ease: "power2.out",
                    onComplete: () => typingElement.remove()
                });
            }, 2000);
        }
    }, 200);
};

// GSAP Animations
const initAnimations = () => {
    // Navigation items animation on load
    gsap.from("nav h2", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from("nav ul li", {
        x: -100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Main content sections animation
    gsap.from("main .section", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "main",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // Add hover effects to menu items
    const menuItems = document.querySelectorAll("nav ul li a");
    menuItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            gsap.to(item, {
                scale: 1.1,
                color: "#00ffff",
                duration: 0.3,
                ease: "power2.out"
            });
        });

        item.addEventListener("mouseleave", () => {
            gsap.to(item, {
                scale: 1,
                color: "#e0e0e0",
                duration: 0.3,
                ease: "power2.in"
            });
        });
    });

    // Floating navigation effect
    gsap.to("nav", {
        boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });

    // Parallax effect for section backgrounds
    gsap.utils.toArray('.section').forEach(section => {
        gsap.to(section, {
            backgroundPositionY: "50%",
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
};

// Smooth scrolling
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};

const addBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

const addImageZoomEffect = () => {
    const images = document.querySelectorAll('.habitat-item img');
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            gsap.to(img, { scale: 1.1, duration: 0.3 });
        });
        img.addEventListener('mouseleave', () => {
            gsap.to(img, { scale: 1, duration: 0.3 });
        });
    });
};

const addAnimalCounters = () => {
    const counters = document.querySelectorAll('.animal-counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: 1 },
            scrollTrigger: {
                trigger: counter,
                start: "top 80%",
            }
        });
    });
};

const addGlitchEffect = () => {
    const title = document.querySelector('h1');
    setInterval(() => {
        title.classList.add('glitch');
        setTimeout(() => {
            title.classList.remove('glitch');
        }, 200);
    }, 3000);
};

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    createBackground();
    createTypingEffect();
    initAnimations();
    initSmoothScroll();
    addBackToTopButton();
    addImageZoomEffect();
    addAnimalCounters();
    addGlitchEffect();

    // Neon text color change
    const neonElements = document.querySelectorAll('h1, h2, .neon-link');
    const neonColors = ['#00ffff', '#ff00ff', '#ffff00', '#ff0000', '#00ff00'];

    setInterval(() => {
        const newColor = neonColors[Math.floor(Math.random() * neonColors.length)];
        neonElements.forEach(el => {
            el.style.color = newColor;
            el.style.textShadow = `0 0 5px ${newColor}, 0 0 15px ${newColor}, 0 0 30px ${newColor}, 0 0 45px ${newColor}`;
        });
    }, 5000);
});

