// Dynamically generate car cards
function displayCars(cars) {
  const carCards = document.getElementById("carCards");
  carCards.innerHTML = ""; // Clear existing cards

  if (cars.length === 0) {
    carCards.innerHTML = `<p class="no-results">No cars match your criteria. Please try again.</p>`;
    return;
  }

  cars.forEach((car) => {
    const card = document.createElement("div");
    card.className = "car-card";
    card.innerHTML = `
            <img src="${car.image}" alt="${car.make} ${car.model}">
            <h3>${car.year} ${car.make} ${car.model}</h3>
            <p>Mileage: ${car.mileage} miles</p>
            <p>Price: $${car.price}</p>
            <p>Color: ${car.color}</p>
        `;
    carCards.appendChild(card);
  });
}

// Filter cars based on user input
function filterCars() {
  const minYear = parseInt(document.getElementById("minYear").value) || 0;
  const maxYear =
    parseInt(document.getElementById("maxYear").value) || Infinity;
  const maxMileage =
    parseInt(document.getElementById("maxMileage").value) || Infinity;
  const minPrice = parseInt(document.getElementById("minPrice").value) || 0;
  const maxPrice =
    parseInt(document.getElementById("maxPrice").value) || Infinity;

  // Updated: Allow deselecting makes
  const makeSelect = document.getElementById("make");
  const make = Array.from(makeSelect.selectedOptions)
    .map((opt) => opt.value)
    .filter((value) => value !== ""); // Ignore empty option

  // Updated: Allow deselecting colors
  const colorSelect = document.getElementById("color");
  const color = Array.from(colorSelect.selectedOptions)
    .map((opt) => opt.value)
    .filter((value) => value !== ""); // Ignore empty option

  const filteredCars = usedCars.filter((car) => {
    return (
      car.year >= minYear &&
      car.year <= maxYear &&
      car.mileage <= maxMileage &&
      car.price >= minPrice &&
      car.price <= maxPrice &&
      (make.length === 0 || make.includes(car.make)) && // Updated: Show all if no make selected
      (color.length === 0 || color.includes(car.color)) // Updated: Show all if no color selected
    );
  });

  displayCars(filteredCars);
}

// Event Listener for Filters
document.getElementById("applyFilters").addEventListener("click", filterCars);

// Initial Display
document.addEventListener("DOMContentLoaded", () => displayCars(usedCars));
