// LOGIN
function login() {
  const user = document.getElementById("username").value;
  if (user === "") {
    alert("Enter username");
    return;
  }
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("app").classList.remove("hidden");
}

// MOVIES (Unsplash images)
const movies = [
  {
    name: "12th Fail",
    price: 150,
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
  },
  {
    name: "3 Idiots",
    price: 200,
    img: "https://images.unsplash.com/photo-1517602302552-471fe67acf66"
  },
  {
    name: "Chhichhore",
    price: 180,
    img: "https://images.unsplash.com/photo-1505685296765-3a2736de412f"
  },
  {
    name: "MS Dhoni",
    price: 170,
    img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26"
  },
  {
    name: "Pushpa",
    price: 200,
    img: "https://images.unsplash.com/photo-1542204165-65bf26472b9b"
  }
];

let selectedMovie = null;
let selectedSeats = [];

const movieList = document.getElementById("movieList");

// Load movies
movies.forEach((m, index) => {
  let div = document.createElement("div");
  div.className = "movie-card";

  div.innerHTML = `
    <div class="img-box">
      <img src="${m.img}" onerror="this.src='https://via.placeholder.com/200x300?text=Movie'">
      <div class="overlay">${m.name}</div>
    </div>
  `;

  div.onclick = () => selectMovie(index);
  movieList.appendChild(div);
});

function selectMovie(index) {
  selectedMovie = movies[index];
  document.getElementById("movieTitle").innerText = selectedMovie.name;
  document.getElementById("booking").classList.remove("hidden");
  createSeats();
}

// SEATS
function createSeats() {
  const seatsDiv = document.getElementById("seats");
  seatsDiv.innerHTML = "";
  selectedSeats = [];

  for (let i = 1; i <= 40; i++) {
    let seat = document.createElement("div");
    seat.className = "seat";

    if (Math.random() < 0.2) seat.classList.add("occupied");

    seat.onclick = () => {
      if (!seat.classList.contains("occupied")) {
        seat.classList.toggle("selected");

        if (selectedSeats.includes(i)) {
          selectedSeats = selectedSeats.filter(s => s !== i);
        } else {
          selectedSeats.push(i);
        }

        updateTotal();
      }
    };

    seatsDiv.appendChild(seat);
  }
}

// PRICE
function updateTotal() {
  document.getElementById("count").innerText = selectedSeats.length;
  document.getElementById("total").innerText =
    selectedSeats.length * selectedMovie.price;
}

// BOOKING → PAYMENT
function confirmBooking() {
  if (selectedSeats.length === 0) {
    alert("Select seats!");
    return;
  }

  document.getElementById("booking").classList.add("hidden");
  document.getElementById("payment").classList.remove("hidden");
}

// PAYMENT → TICKET
function payNow() {
  document.getElementById("payment").classList.add("hidden");

  const text = `
Movie: ${selectedMovie.name}
Seats: ${selectedSeats.join(", ")}
Total: ₹${selectedSeats.length * selectedMovie.price}
`;

  document.getElementById("ticketInfo").innerText = text;

  document.getElementById("qr").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
    encodeURIComponent(text);

  document.getElementById("ticket").classList.remove("hidden");
}

// PRINT
function printTicket() {
  window.print();
}