const cart=JSON.parse(localStorage.getItem("cart"))||[];
const list=document.getElementById("cartList");
const totalEl=document.getElementById("totalHarga");

let total=0;
cart.forEach(i=>{
 let sub=i.harga*i.qty;
 total+=sub;
 list.innerHTML+=`
 <div class="item">
  <span>${i.nama} x ${i.qty}</span>
  <span>Rp ${sub.toLocaleString()}</span>
 </div>`;
});
totalEl.innerText="Total: Rp "+total.toLocaleString();

const rekening={
 BCA:"1234567890 a.n Admin UMKM",
 BRI:"9876543210 a.n Admin UMKM",
 DANA:"081234567890",
 OVO:"081234567890"
};

function bayar(){
 let nama=document.getElementById("nama").value;
 let alamat=document.getElementById("alamat").value;
 let hp=document.getElementById("hp").value;
 let bank=document.getElementById("bank").value;

 if(!nama||!alamat||!hp||!bank){
  alert("Lengkapi data terlebih dahulu");
  return;
 }

 alert(
`PEMBAYARAN BERHASIL ✅

Nama: ${nama}
Alamat: ${alamat}
HP: ${hp}

Metode: ${bank}
Tujuan: ${rekening[bank]}
Total: Rp ${total.toLocaleString()}

Estimasi pengiriman:
⏱️ 2 – 5 Hari`
 );

 localStorage.removeItem("cart");
}
