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
  
