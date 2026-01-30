const produk = [
  {
    id: 1,
    nama: "Saroja Mini",
    harga: 12000,
    img: "assets/umkm1.jpg"
  },
  {
    id: 2,
    nama: "Black Tea",
    harga: 15000,
    img: "assets/umkm2.jpg"
  },
  {
    id: 3,
    nama: "Gula Aren Cair",
    harga: 20000,
    img: "assets/umkm3.jpg"
  },
  {
    id: 4,
    nama: "Paladang",
    harga: 18000,
    img: "assets/umkm4.jpg"
  },
  {
    id: 5,
    nama: "Gula Aren Bubuk",
    harga: 22000,
    img: "assets/umkm5.jpg"
  },
  {
    id: 6,
    nama: "Saroja Besar",
    harga: 25000,
    img: "assets/umkm6.jpg"
  },
  {
    id: 7,
    nama: "Kopi Parakanceuri",
    harga: 30000,
    img: "assets/umkm7.jpg"
  },
  {
    id: 8,
    nama: "Gula Aren Premium",
    harga: 28000,
    img: "assets/umkm8.jpg"
  },
  {
    id: 9,
    nama: "Gula Aren Organik",
    harga: 26000,
    img: "assets/umkm9.jpg"
  },
  {
    id: 10,
    nama: "Gula Aren Balok",
    harga: 24000,
    img: "assets/umkm10.jpg"
  }
];

const list = document.getElementById("produkList");

function render() {
  list.innerHTML = "";
  produk.forEach(p => {
    list.innerHTML += `
      <div class="card">
        <img src="${p.img}" alt="${p.nama}">
        <h4>${p.nama}</h4>
        <div class="price">Rp ${p.harga.toLocaleString("id-ID")}</div>

        <div class="qty">
          <button onclick="ubahQty(${p.id}, -1)">-</button>
          <span id="q${p.id}">1</span>
          <button onclick="ubahQty(${p.id}, 1)">+</button>
        </div>

        <button class="btn" onclick="addCart(${p.id})">
          Tambah ke Keranjang
        </button>
      </div>
    `;
  });
}

function ubahQty(id, val) {
  const el = document.getElementById("q" + id);
  let q = parseInt(el.innerText) + val;
  if (q < 1) q = 1;
  el.innerText = q;
}

function addCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let qty = parseInt(document.getElementById("q" + id).innerText);
  let p = produk.find(x => x.id === id);
  let item = cart.find(i => i.id === id);

  if (item) {
    item.qty += qty;
  } else {
    cart.push({ ...p, qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ Produk masuk ke keranjang");
}

render();
