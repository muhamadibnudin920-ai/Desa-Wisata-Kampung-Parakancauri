import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* ================= FIREBASE ================= */
const firebaseConfig = {
 apiKey: "AIzaSyDGtaYv3aoWCgIgRfolj8vsOcihKCVc39k",
 authDomain: "kampung-parakanceuri.firebaseapp.com",
 projectId: "kampung-parakanceuri",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ================= CART ================= */
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const list = document.getElementById("cartList");
const totalEl = document.getElementById("totalHarga");
const statusEl = document.getElementById("statusBayar");

let total = 0;
list.innerHTML = "";

cart.forEach(i => {
 const sub = i.harga * i.qty;
 total += sub;
 list.innerHTML += `
  <div class="item">
   <span>${i.nama} x ${i.qty}</span>
   <span>Rp ${sub.toLocaleString("id-ID")}</span>
  </div>
 `;
});

const ongkir = 15000;
totalEl.innerText =
 "Subtotal: Rp " + total.toLocaleString("id-ID") +
 "\nOngkir: Rp " + ongkir.toLocaleString("id-ID") +
 "\nTotal: Rp " + (total + ongkir).toLocaleString("id-ID");

/* ================= REKENING ADMIN ================= */
const rekeningAdmin = {
 BCA: "1234567890 a.n Admin UMKM",
 BRI: "9876543210 a.n Admin UMKM",
 DANA: "081234567890",
 OVO: "081234567890"
};

/* ================= LINK BANK ================= */
const paymentLink = {
 BCA: "https://www.bca.co.id",
 BRI: "https://bri.co.id",
 DANA: "https://link.dana.id",
 OVO: "https://ovo.id"
};

/* ================= BAYAR ================= */
window.bayar = async function () {
 const nama = document.getElementById("nama").value;
 const alamat = document.getElementById("alamat").value;
 const hp = document.getElementById("hp").value;
 const bank = document.getElementById("bank").value;

 if (!nama || !alamat || !hp || !bank) {
  alert("Lengkapi data terlebih dahulu");
  return;
 }

 statusEl.innerHTML = "⏳ Membuat pesanan...";

 const orderData = {
  nama,
  alamat,
  hp,
  metode: bank,
  rekening: rekeningAdmin[bank],
  items: cart,
  subtotal: total,
  ongkir,
  totalBayar: total + ongkir,
  estimasi: "2 - 5 Hari",
  status: "MENUNGGU PEMBAYARAN",
  batasBayar: Date.now() + 3600000,
  waktu: serverTimestamp()
 };

 await addDoc(collection(db, "orders"), orderData);

 statusEl.innerHTML = `
  <b>Pesanan dibuat</b><br><br>
  Metode: ${bank}<br>
  Tujuan: ${rekeningAdmin[bank]}<br>
  Total: Rp ${(total + ongkir).toLocaleString("id-ID")}<br>
  Estimasi: 2 – 5 Hari<br><br>
  ⏱️ Selesaikan pembayaran dalam 1 jam
  <br><br>
  <button onclick="batalkan()">Batalkan Pesanan</button>
 `;

 setTimeout(() => {
  window.open(paymentLink[bank], "_blank");
 }, 1200);
};

/* ================= BATALKAN ================= */
window.batalkan = function () {
 statusEl.innerHTML = "❌ Pesanan dibatalkan";
 localStorage.removeItem("cart");
};
