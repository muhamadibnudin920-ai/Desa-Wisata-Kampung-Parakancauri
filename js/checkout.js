<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* 🔥 FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyDGtaYv3aoWCgIgRfolj8vsOcihKCVc39k",
  authDomain: "kampung-parakanceuri.firebaseapp.com",
  projectId: "kampung-parakanceuri",
  storageBucket: "kampung-parakanceuri.firebasestorage.app",
  messagingSenderId: "292542466143",
  appId: "1:292542466143:web:94d68782579f66060373ea"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* 🛒 DATA KERANJANG */
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const list = document.getElementById("cartList");
const totalEl = document.getElementById("totalHarga");

let total = 0;
cart.forEach(i => {
  let sub = i.harga * i.qty;
  total += sub;
  list.innerHTML += `
    <div class="item">
      <span>${i.nama} x ${i.qty}</span>
      <span>Rp ${sub.toLocaleString("id-ID")}</span>
    </div>
  `;
});
totalEl.innerText = "Total: Rp " + total.toLocaleString("id-ID");

/* 🏦 REKENING ADMIN (SEMUA METODE) */
const rekeningAdmin = {
  BCA: "1234567890 a.n Admin UMKM Parakanceuri",
  BRI: "9876543210 a.n Admin UMKM Parakanceuri",
  DANA: "081234567890 (DANA)",
  OVO: "081234567890 (OVO)"
};

/* 🔔 AREA STATUS */
const statusBox = document.createElement("div");
statusBox.style.margin = "20px";
statusBox.style.padding = "15px";
statusBox.style.background = "#fff";
statusBox.style.borderRadius = "12px";
document.body.appendChild(statusBox);

/* 💳 BAYAR */
window.bayar = async function () {
  const nama = document.getElementById("nama").value;
  const alamat = document.getElementById("alamat").value;
  const hp = document.getElementById("hp").value;
  const bank = document.getElementById("bank").value;

  if (!nama || !alamat || !hp || !bank) {
    alert("Lengkapi data terlebih dahulu");
    return;
  }

  /* SIMPAN KE FIREBASE */
  await addDoc(collection(db, "orders"), {
    nama,
    alamat,
    hp,
    bank,
    rekeningTujuan: rekeningAdmin[bank],
    items: cart,
    total,
    status: "MENUNGGU PEMBAYARAN",
    waktu: serverTimestamp()
  });

  statusBox.innerHTML = `
    <h3>✅ Pesanan Dibuat</h3>
    <b>Nama:</b> ${nama}<br>
    <b>Alamat:</b> ${alamat}<br>
    <b>HP:</b> ${hp}<br><br>

    <b>Metode Pembayaran:</b> ${bank}<br>
    <b>Rekening Tujuan:</b><br>
    ${rekeningAdmin[bank]}<br><br>

    <b>Total Bayar:</b> Rp ${total.toLocaleString("id-ID")}<br><br>

    ⏳ Silakan lakukan pembayaran.<br>
    Setelah transfer, pesanan akan diproses.
  `;

  localStorage.removeItem("cart");
};
</script>
