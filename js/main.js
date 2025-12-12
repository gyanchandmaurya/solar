(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);


//  Our Product Execution Process Start----------
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
    //  Our Product Execution Process End----------

    // <!-- ---------------Soalr Pant Calculator Start---------------------- -->
     // Auto calculate kW when monthly units entered
document.getElementById("units").addEventListener("input", function () {
  let units = parseFloat(this.value);

  if (!isNaN(units) && units > 0) {
    let kW = Math.ceil(units / 120);  // Round UP to next whole number
    document.getElementById("capacity").value = kW;
  }
});

    function getRatePerKW(capacity) {
      if (capacity >= 3 && capacity <= 6) return 56000;
      if (capacity >= 7 && capacity <= 9) return 51000;
      if (capacity >= 10 && capacity <= 20) return 46000;
      if (capacity >= 21 && capacity <= 50) return 44000;
      if (capacity >= 51 && capacity <= 100) return 42000;
      if (capacity >= 101 && capacity <= 200) return 38000;
      return 0;
    }

    function getSubsidy(capacity, isDCR) {
      if (!isDCR) return 0;
      if (capacity === 3) return 78000;
      if (capacity > 3) return capacity * 18000;
      return 0;
    }

    function calculate() {
      let capacity = parseFloat(document.getElementById("capacity").value);

      if (isNaN(capacity) || capacity < 1 || capacity > 200) {
        document.getElementById("result").innerHTML = "<b>Please enter valid capacity (auto or manual).</b>";
        return;
      }

      const buildingRate = parseFloat(document.getElementById("building").value);
      const structureRate = parseFloat(document.getElementById("structure").value);

      const panelSelect = document.getElementById("panel");
      const panelRate = parseFloat(panelSelect.value);
      const panelType = panelSelect.options[panelSelect.selectedIndex].dataset.type;

      const ratePerKW = getRatePerKW(capacity);
      const baseCost = capacity * ratePerKW;

      const additionalBuilding = capacity * buildingRate;
      const additionalPanel = capacity * panelRate;
      const additionalStructure = capacity * structureRate;
      const additionalTotal = additionalBuilding + additionalPanel + additionalStructure;

      const subtotal = baseCost + additionalTotal;
      const finalRatePerKW = subtotal / capacity;
      const gst = subtotal * 0.089;
      const total = subtotal + gst;

      const subsidy = getSubsidy(capacity, panelType === "dcr");
      const netCost = total - subsidy;

      document.getElementById("result").innerHTML = `
        <b>Calculation Result:</b><br>
        <b>Capacity: ${capacity.toFixed(2)} kW<br>
        
        <b>Final Rate per kW: ₹${finalRatePerKW.toLocaleString(undefined,{maximumFractionDigits:0})}</b><br>
        <b>Subtotal: ₹${subtotal.toLocaleString()}</b><br>
        <b>GST (8.90%): ₹${gst.toLocaleString(undefined,{maximumFractionDigits:0})}</b><br>
        <b>Total Project Cost: ₹${total.toLocaleString(undefined,{maximumFractionDigits:0})}</b><br><br>
        <b>Government Subsidy: ₹${subsidy.toLocaleString()}</b><br>
        <b>Net Cost after Subsidy: ₹${netCost.toLocaleString(undefined,{maximumFractionDigits:0})}</b>
      `;
    }

// Additional Information not shown in calculation
        // Rate per kW: ₹${ratePerKW.toLocaleString()}<br>
        // Base Cost: ₹${baseCost.toLocaleString()}<br>
        // Building Charge: ₹${additionalBuilding.toLocaleString()}<br>
        // Structure Charge: ₹${additionalStructure.toLocaleString()}<br>
        // DCR Panel Charge: ₹${additionalPanel.toLocaleString()}<br>
        // Additional Total: ₹${additionalTotal.toLocaleString()}<br>
    // <!-- ---------------Soalr Pant Calculator End------------------------ -->



// Dropdown for Course Package Start -----------------------------------
        function toggleDropdown(id) {
      const content = document.getElementById(id);
      const icon = document.getElementById(`icon-${id}`);

      if (content.style.display === "block") {
        content.style.display = "none";
        icon.classList.remove("rotate");
      } else {
        content.style.display = "block";
        icon.classList.add("rotate");
      }
    }
// Dropdown for Course Package End --------------------------------------




// ----------------------Enquiry API Form Start------------------------

// ----------------------Enquiry API Form End------------------------