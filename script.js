document.addEventListener("DOMContentLoaded", function () {
  const imageViewer = document.createElement("div");
  imageViewer.className = "image-viewer";
  imageViewer.hidden = true;
  imageViewer.setAttribute("role", "dialog");
  imageViewer.setAttribute("aria-modal", "true");
  imageViewer.setAttribute("aria-label", "Expanded image viewer");
  const viewerImage = document.createElement("img");
  const viewerDescription = document.createElement("p");
  viewerDescription.className = "image-viewer-description";
  const closeViewer = document.createElement("button");
  closeViewer.type = "button";
  closeViewer.className = "image-viewer-close";
  closeViewer.textContent = "×";
  closeViewer.setAttribute("aria-label", "Close expanded image");
  imageViewer.appendChild(viewerImage);
  imageViewer.appendChild(viewerDescription);
  imageViewer.appendChild(closeViewer);
  document.body.appendChild(imageViewer);
  let lastFocusedImage = null;

  const hideImageViewer = () => {
    imageViewer.hidden = true;
    imageViewer.classList.remove("is-open");
    document.body.classList.remove("image-viewer-open");
    viewerImage.removeAttribute("src");
    viewerDescription.textContent = "";
    viewerDescription.hidden = true;
    if (lastFocusedImage) {
      lastFocusedImage.focus();
    }
  };
  const showImageViewer = (image) => {
    lastFocusedImage = image;
    viewerImage.src = image.currentSrc || image.src;
    viewerImage.alt = image.alt;
    const description = image.closest(".photo-tile")?.querySelector(".photo-caption")?.textContent.trim() || "";
    viewerDescription.textContent = description;
    viewerDescription.hidden = !description;
    imageViewer.hidden = false;
    document.body.classList.add("image-viewer-open");
    window.requestAnimationFrame(() => imageViewer.classList.add("is-open"));
    closeViewer.focus();
  };
  document.addEventListener("click", (event) => {
    const image = event.target.closest("img.enhance-image");
    if (image) {
      showImageViewer(image);
    }
  });
  document.addEventListener("keydown", (event) => {
    const image = event.target.closest("img.enhance-image");
    if (image && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      showImageViewer(image);
    }
  });
  closeViewer.addEventListener("click", hideImageViewer);
  imageViewer.addEventListener("click", (event) => {
    if (event.target === imageViewer) {
      hideImageViewer();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (!imageViewer.hidden && event.key === "Escape") {
      hideImageViewer();
    }
  });

  document.querySelectorAll(".accordion-header").forEach((header) => {
    const content = document.getElementById(header.getAttribute("aria-controls")) || header.nextElementSibling;
    const updateContentHeight = () => {
      if (content && header.getAttribute("aria-expanded") === "true" && content.style.maxHeight !== "none") {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    };
    if (!header.hasAttribute("aria-expanded")) {
      header.setAttribute("aria-expanded", String(content && !content.hidden));
    }

    const isOpen = header.getAttribute("aria-expanded") === "true";
    header.classList.toggle("active", isOpen);
    if (content) {
      content.hidden = !isOpen;
      content.style.maxHeight = isOpen ? "none" : "";
      content.addEventListener("load", updateContentHeight, true);
      content.addEventListener("transitionend", (event) => {
        if (event.propertyName === "max-height" && header.getAttribute("aria-expanded") === "true") {
          content.style.maxHeight = "none";
        }
      });
    }

    header.addEventListener("click", function () {
      const isOpen = header.getAttribute("aria-expanded") === "true";

      header.classList.toggle("active", !isOpen);
      header.setAttribute("aria-expanded", String(!isOpen));
      if (content) {
        if (isOpen) {
          content.style.maxHeight = content.scrollHeight + "px";
          window.requestAnimationFrame(() => {
            content.style.maxHeight = "0px";
          });
          window.setTimeout(() => {
            if (header.getAttribute("aria-expanded") === "false") {
              content.hidden = true;
            }
          }, 300);
        } else {
          content.hidden = false;
          content.style.maxHeight = "0px";
          void content.offsetHeight;
          window.requestAnimationFrame(() => {
            updateContentHeight();
          });
        }
      }
    });
  });

  const lastModified = document.getElementById("last-modified");
  if (lastModified) {
    const date = new Date(document.lastModified);
    lastModified.textContent = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  const mapElement = document.getElementById("trip-map");
  const tripDataElement = document.getElementById("trip-data");
  const tripData = tripDataElement ? JSON.parse(tripDataElement.textContent) : [];
  if (mapElement && window.L && tripData.length) {
    const map = L.map(mapElement, { scrollWheelZoom: false, preferCanvas: true });
    const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    const bounds = [];
    const tripsByLocation = new Map();
    const monthNumbers = new Map([
      ["January", 1], ["February", 2], ["March", 3], ["April", 4],
      ["May", 5], ["June", 6], ["July", 7], ["August", 8],
      ["September", 9], ["October", 10], ["November", 11], ["December", 12]
    ]);
    const dateValue = (date) => {
      if (date === "Ongoing") {
        return Number.POSITIVE_INFINITY;
      }
      const match = String(date).match(/^([A-Za-z]+)\s+(\d{4})/);
      return match ? Number(match[2]) * 12 + (monthNumbers.get(match[1]) || 0) : 0;
    };

    tripData.forEach((trip) => {
      const coordinateKey = trip.coordinates.join(",");
      if (!tripsByLocation.has(coordinateKey)) {
        tripsByLocation.set(coordinateKey, []);
      }
      tripsByLocation.get(coordinateKey).push(trip);
    });

    tripsByLocation.forEach((trips) => {
      trips.sort((firstTrip, secondTrip) => dateValue(secondTrip.date) - dateValue(firstTrip.date));
      const firstTrip = trips[0];
      const point = [firstTrip.coordinates[0], firstTrip.coordinates[1]];
      bounds.push(point);
      const popup = document.createElement("div");
      const title = document.createElement("strong");
      const eventViewport = document.createElement("div");
      const eventContent = document.createElement("div");
      const event = document.createElement("span");
      const date = document.createElement("small");
      const mediaRow = document.createElement("div");
      const description = document.createElement("p");
      title.textContent = firstTrip.place + ", " + firstTrip.country;
      popup.className = "trip-popup";
      popup.appendChild(title);
      popup.appendChild(document.createElement("br"));
      eventViewport.className = "trip-event-viewport";
      eventContent.className = "trip-event-content";
      mediaRow.className = "trip-media-row";
      eventContent.appendChild(event);
      eventContent.appendChild(document.createElement("br"));
      eventContent.appendChild(date);
      eventContent.appendChild(mediaRow);
      eventContent.appendChild(description);
      eventViewport.appendChild(eventContent);
      popup.appendChild(eventViewport);
      let currentTripIndex = 0;
      const previousEvents = document.createElement("button");
      const nextEvents = document.createElement("button");
       previousEvents.classList.add("carousel-control-prev");
       nextEvents.classList.add("carousel-control-next");
      const updateControls = () => {
        previousEvents.hidden = currentTripIndex === 0;
        nextEvents.hidden = currentTripIndex === trips.length - 1;
      };
      const renderTrip = (direction = 0) => {
        const trip = trips[currentTripIndex];
        event.textContent = trip.title;
        date.textContent = trip.date;
        description.textContent = trip.description;
        eventContent.style.transition = "none";
        eventContent.style.transform = direction > 0 ? "translateX(18px)" : direction < 0 ? "translateX(-18px)" : "none";
        eventContent.style.opacity = direction ? "0" : "1";
        mediaRow.replaceChildren();
        if (trip.image) {
          const image = document.createElement("img");
          image.src = new URL("/" + trip.image.replace(/^\/+/, ""), window.location.origin).href;
          image.alt = "Trip photograph";
          image.loading = "lazy";
          image.className = "enhance-image";
          image.tabIndex = 0;
          image.setAttribute("role", "button");
          image.setAttribute("aria-label", "View larger image");
          mediaRow.appendChild(image);
        }
        if (trips.length > 1) {
          mediaRow.classList.add("has-controls");
          mediaRow.appendChild(previousEvents);
          if (trip.image) {
            mediaRow.insertBefore(previousEvents, mediaRow.firstChild);
          }
          mediaRow.appendChild(nextEvents);
        }
        window.requestAnimationFrame(() => {
          eventContent.style.transition = "transform 180ms ease-out, opacity 180ms ease-out";
          eventContent.style.transform = "translateX(0)";
          eventContent.style.opacity = "1";
        });
        updateControls();
      };
      if (trips.length > 1) {
        previousEvents.type = "button";
        previousEvents.className = "trip-event-arrow carousel-control-prev";
        previousEvents.innerHTML = '<svg viewBox="0 0 18 24" aria-hidden="true" focusable="false"><polyline points="15,2 3,12 15,22"></polyline></svg>';
        previousEvents.setAttribute("aria-label", "Show more recent event");
        nextEvents.type = "button";
        nextEvents.className = "trip-event-arrow carousel-control-next";
        nextEvents.innerHTML = '<svg viewBox="0 0 18 24" aria-hidden="true" focusable="false"><polyline points="3,2 15,12 3,22"></polyline></svg>';
        nextEvents.setAttribute("aria-label", "Show older event");
        previousEvents.addEventListener("click", () => {
          currentTripIndex -= 1;
          renderTrip(-1);
        });
        nextEvents.addEventListener("click", () => {
          currentTripIndex += 1;
          renderTrip(1);
        });
      }
      renderTrip();
      const markerIcon = L.divIcon({
        className: "trip-marker",
        html: '<svg viewBox="0 0 24 32" width="24" height="32" aria-hidden="true" focusable="false"><path d="M12 1c-5.5 0-10 4.5-10 10 0 7.4 10 20 10 20s10-12.6 10-20C22 5.5 17.5 1 12 1Zm0 14.5A4.5 4.5 0 1 1 12 6a4.5 4.5 0 0 1 0 9.5Z" fill="#d32f2f" stroke="#fff" stroke-width="1.4"/><circle cx="12" cy="12" r="3.4" fill="#fff"/></svg>',
        iconSize: [24, 32],
        iconAnchor: [12, 30],
        popupAnchor: [0, -24]
      });
      L.marker(point, { icon: markerIcon }).addTo(map).bindPopup(popup);
    });

    map.fitBounds(bounds, { padding: [24, 24], maxZoom: 5 });
  }
});
