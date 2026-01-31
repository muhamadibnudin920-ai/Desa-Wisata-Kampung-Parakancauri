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
totalEl.innerText = "Total: Rp " + total.toLocaleString("id-ID");

/* ================= REKENING ADMIN ================= */
const rekeningAdmin = {
 BCA: "1234567890 a.n Admin UMKM",
 BRI: "9876543210 a.n Admin UMKM",
 DANA: "081234567890 (DANA)",
 OVO: "081234567890 (OVO)"
};

/* ================= LINK PEMBAYARAN ================= */
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

 statusEl.innerText = "⏳ Membuat pesanan...";

 /* ===== SIMPAN KE FIREBASE ===== */
 await addDoc(collection(db, "orders"), {
  nama,
  alamat,
  hp,
  metodePembayaran: bank,
  rekeningTujuan: rekeningAdmin[bank],
  items: cart,
  total,
  status: "MENUNGGU PEMBAYARAN",
  waktu: serverTimestamp()
 });

 /* ===== INFO KE USER ===== */
 statusEl.innerHTML = `
  ✅ Pesanan berhasil dibuat<br><br>
  <b>Nama:</b> ${nama}<br>
  <b>Alamat:</b> ${alamat}<br>
  <b>Metode:</b> ${bank}<br>
  <b>Tujuan:</b> ${rekeningAdmin[bank]}<br>
  <b>Total:</b> Rp ${total.toLocaleString("id-ID")}<br><br>
  🔔 Anda akan diarahkan ke pembayaran
 `;

 /* ===== REDIRECT KE BANK ===== */
 setTimeout(() => {
  window.open(paymentLink[bank], "_blank");
 }, 1500);

 localStorage.removeItem("cart");
};
