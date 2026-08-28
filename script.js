document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".accordion-header").forEach((header) => {
    const content = document.getElementById(header.getAttribute("aria-controls")) || header.nextElementSibling;
    if (!header.hasAttribute("aria-expanded")) {
      header.setAttribute("aria-expanded", String(content && !content.hidden));
    }

    header.addEventListener("click", function () {
      const isOpen = header.getAttribute("aria-expanded") === "true";

      header.classList.toggle("active", !isOpen);
      header.setAttribute("aria-expanded", String(!isOpen));
      if (content) {
        content.hidden = isOpen;
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
  const mapTilerKeyElement = document.getElementById("maptiler-api-key");
  const tripData = tripDataElement ? JSON.parse(tripDataElement.textContent) : [];
  const mapTilerKey = mapTilerKeyElement ? JSON.parse(mapTilerKeyElement.textContent) : "";
  if (mapElement && window.L && tripData.length) {
    const map = L.map(mapElement, { scrollWheelZoom: false, preferCanvas: true });
    const tileUrl = mapTilerKey
      ? `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${encodeURIComponent(mapTilerKey)}`
      : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    const tileOptions = mapTilerKey
      ? {
          attribution: "&copy; MapTiler &copy; OpenStreetMap contributors",
          tileSize: 512,
          zoomOffset: -1,
          maxZoom: 20
        }
      : {
          attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
          subdomains: "abcd",
          maxZoom: 20,
          detectRetina: true
        };
    L.tileLayer(tileUrl, tileOptions).addTo(map);

    const bounds = [];
    tripData.forEach((trip) => {
      const point = [trip.coordinates[0], trip.coordinates[1]];
      bounds.push(point);
      const popup = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = trip.place + ", " + trip.country;
      const event = document.createElement("span");
      event.textContent = trip.title;
      const date = document.createElement("small");
      date.textContent = trip.date;
      const description = document.createElement("p");
      description.textContent = trip.description;
      popup.className = "trip-popup";
      popup.append(title, document.createElement("br"), event, document.createElement("br"), date);
      if (trip.image) {
        const image = document.createElement("img");
        image.src = trip.image;
        image.alt = trip.image_alt || "Trip photograph";
        image.loading = "lazy";
        popup.append(image);
      }
      popup.append(description);
      const markerIcon = L.divIcon({ className: "trip-marker", html: "<span></span>", iconSize: [22, 22], iconAnchor: [11, 11] });
      L.marker(point, { icon: markerIcon }).addTo(map).bindPopup(popup);
    });

    map.fitBounds(bounds, { padding: [24, 24], maxZoom: 5 });
  }
});
