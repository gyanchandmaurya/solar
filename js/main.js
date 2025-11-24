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
      if (!isDCR) return 0; // Subsidy only for DCR panel
      if (capacity === 3) return 78000;
      if (capacity > 3) return capacity * 18000;
      return 0;
    }

    function calculate() {
      const capacity = parseFloat(document.getElementById("capacity").value);
      const buildingRate = parseFloat(document.getElementById("building").value);
      const structureRate = parseFloat(document.getElementById("structure").value);

      const panelSelect = document.getElementById("panel");
      const panelRate = parseFloat(panelSelect.value);
      const panelType = panelSelect.options[panelSelect.selectedIndex].dataset.type;

      if (isNaN(capacity) || capacity < 3 || capacity > 200) {
        document.getElementById("result").innerHTML = "<b>Please enter capacity between 3kW and 200kW.</b>";
        return;
      }

      const ratePerKW = getRatePerKW(capacity);
      const baseCost = capacity * ratePerKW;

      // Additional charges per kW
      const additionalBuilding = capacity * buildingRate;
      const additionalPanel = capacity * panelRate;
      const additionalStructure = capacity * structureRate;
      const additionalTotal = additionalBuilding + additionalPanel + additionalStructure;

      const subtotal = baseCost + additionalTotal;
      const finalRatePerKW = subtotal / capacity; // before GST
      const gst = subtotal * 0.089;
      const total = subtotal + gst;

      // Subsidy (only for DCR Panel)
      const subsidy = getSubsidy(capacity, panelType === "dcr");
      const netCost = total - subsidy;

      document.getElementById("result").innerHTML = `
        <b>Calculation Result:</b><br>
        Capacity: ${capacity} kW<br>
        Rate per kW: ₹${ratePerKW.toLocaleString()}<br>
        Base Cost: ₹${baseCost.toLocaleString()}<br>
        Building Charge: ₹${additionalBuilding.toLocaleString()}<br>
        Structure Charge: ₹${additionalStructure.toLocaleString()}<br>
        DCR Panel Charge: ₹${additionalPanel.toLocaleString()}<br>
        Additional Total: ₹${additionalTotal.toLocaleString()}<br>
        <b>Final Rate per kW (Before GST): ₹${finalRatePerKW.toLocaleString(undefined,{maximumFractionDigits:0})}</b><br>
        <b>Subtotal: ₹${subtotal.toLocaleString()}</b><br>
        <b>GST (8.90%): ₹${gst.toLocaleString(undefined,{maximumFractionDigits:0})}</b><br>
        <b>Total Project Cost: ₹${total.toLocaleString(undefined,{maximumFractionDigits:0})}</b><br><br>
        <b>Government Subsidy: ₹${subsidy.toLocaleString()}</b><br>
        <b>Net Cost after Subsidy: ₹${netCost.toLocaleString(undefined,{maximumFractionDigits:0})}</b>
      `;
    }
    // Additional Total: ₹${additionalTotal.toLocaleString()}<br>
    // <!-- ---------------Soalr Pant Calculator End------------------------ -->

    // Additional Total: ₹${additionalTotal.toLocaleString()}<br></br>