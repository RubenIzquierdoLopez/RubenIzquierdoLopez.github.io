//Code for the accordion
document.addEventListener("DOMContentLoaded", function () {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});

//Last modified date code:
document.addEventListener("DOMContentLoaded", function() {
  const d = new Date(document.lastModified);
  
  // Format the date in English (US)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("last-modified").textContent = d.toLocaleDateString('en-US', options);
});
