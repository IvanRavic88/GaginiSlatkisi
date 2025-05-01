"use strict";
// set the current year in the footer
function setCurrentYear() {
  const yearEl = document.querySelector(".year");
  const currentYear = new Date().getFullYear();

  yearEl.textContent = currentYear;
}

// Toggle the mobile navigation
function toggleMobileNav() {
  const btnNavEl = document.querySelector(".btn-mobile-nav");
  const headerEl = document.querySelector(".header");

  btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
  });
}

// Smooth scrolling for anchor links

function enableSmoothScrolling() {
  const allLinks = document.querySelectorAll(".prevent-default-link");

  allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = link.getAttribute("href");

      // Scroll back to top
      if (href === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      // Scroll to other sections
      if (href !== "#" && href.startsWith("#")) {
        const sectionEl = document.querySelector(href);
        sectionEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// Sticky navigation
function enableStickyNavigation() {
  const stickyEl = document.querySelector(".sticky-section");
  if (stickyEl) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        document.body.classList.add("sticky");
      } else {
        document.body.classList.remove("sticky");
      }
    });
  }
}

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}

// Inserting dynamic honeypot
function insertDynamicHoneypot() {
  const formEl = document.querySelector("form");
  if (formEl && !formEl.querySelector('input[name="middle_name"]')) {
    const honeypotInput = document.createElement("input");
    honeypotInput.type = "text";
    honeypotInput.name = "middle_name";
    honeypotInput.style.display = "none";
    honeypotInput.tabIndex = "-1";
    honeypotInput.autocomplete = "off";

    const submitInput = formEl.querySelector('input[type="submit"]');
    if (submitInput) {
      formEl.insertBefore(honeypotInput, submitInput);
    }
  }
}
// Initialize functions
function init() {
  setCurrentYear();
  toggleMobileNav();
  enableSmoothScrolling();
  enableStickyNavigation();
  checkFlexGap();
  insertDynamicHoneypot();
}
// Run the initialize functions when the DOM is loaded
document.addEventListener("DOMContentLoaded", init);

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
