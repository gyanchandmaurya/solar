    const items = document.querySelectorAll(".accordion-title");

    items.forEach(item => {
      item.addEventListener("click", () => {
        const content = item.nextElementSibling;
        item.classList.toggle("active");
        content.classList.toggle("open");

        // Close others (if only one should stay open)
        document.querySelectorAll(".accordion-title").forEach(el => {
          if (el !== item) {
            el.classList.remove("active");
            el.nextElementSibling.classList.remove("open");
          }
        });
      });
    });
  
// --------------- Feature Section ------------
    document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('[data-toggle="counter-up"]');

  const runCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / 200;

    const updateCounter = () => {
      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  };

  // Trigger only when element is visible
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          obs.unobserve(entry.target); // run only once
        }
      });
    },
    { threshold: 0.5 } // start animation when 50% visible
  );

  counters.forEach(counter => {
    observer.observe(counter);
  });
});
