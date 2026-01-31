const produk = [
 {id:1,nama:"Saroja Mini",deskripsi:"Kue tradisional khas kampung.",harga:12000,img:"umkm1.jpg"},
 {id:2,nama:"Black Tea",deskripsi:"Teh hitam pilihan.",harga:15000,img:"umkm2.jpg"},
 {id:3,nama:"Gula Aren Cair",deskripsi:"Gula aren cair asli.",harga:20000,img:"umkm3.jpeg"},
 {id:4,nama:"Paladang",deskripsi:"Camilan tradisional gurih.",harga:18000,img:"umkm4.jpg"},
 {id:5,nama:"Gula Aren Bubuk",deskripsi:"Gula aren bubuk.",harga:22000,img:"umkm5.jpg"},
 {id:6,nama:"Saroja Besar",deskripsi:"Saroja ukuran besar.",harga:25000,img:"umkm6.jpg"},
 {id:7,nama:"Kopi Parakanceuri",deskripsi:"Kopi lokal khas.",harga:30000,img:"umkm7.jpg"},
 {id:8,nama:"Gula Aren Premium",deskripsi:"Gula aren premium.",harga:28000,img:"umkm8.jpg"},
 {id:9,nama:"Gula Aren Organik",deskripsi:"Ramah lingkungan.",harga:26000,img:"umkm9.jpg"},
 {id:10,nama:"Gula Aren Balok",deskripsi:"Gula aren balok.",harga:24000,img:"umkm10.jpg"}
];

const list=document.getElementById("produkList");

function render(){
 list.innerHTML="";
 produk.forEach(p=>{
  list.innerHTML+=`
   <div class="card">
    <img src="${p.img}">
    <h4>${p.nama}</h4>
    <small>${p.deskripsi}</small>
    <div class="price">Rp ${p.harga.toLocaleString("id-ID")}</div>
    <div class="qty">
     <button onclick="ubahQty(${p.id},-1)">-</button>
     <span id="q${p.id}">1</span>
     <button onclick="ubahQty(${p.id},1)">+</button>
    </div>
    <button class="btn" onclick="addCart(${p.id})">
     Tambah ke Keranjang
    </button>
   </div>`;
 });
}

function ubahQty(id,val){
 const el=document.getElementById("q"+id);
 let q=parseInt(el.innerText)+val;
 if(q<1)q=1;
 el.innerText=q;
}

function updateCartCount(){
 const cart=JSON.parse(localStorage.getItem("cart"))||[];
 const total=cart.reduce((a,b)=>a+b.qty,0);
 const el=document.getElementById("cartCount");
 if(el)el.innerText=total;
}

function addCart(id){
 let cart=JSON.parse(localStorage.getItem("cart"))||[];
 let qty=parseInt(document.getElementById("q"+id).innerText);
 let p=produk.find(x=>x.id===id);
 let item=cart.find(i=>i.id===id);

 if(item){item.qty+=qty}
 else{cart.push({...p,qty})}

 localStorage.setItem("cart",JSON.stringify(cart));
 updateCartCount();
 alert("✅ Produk masuk ke keranjang");
}

render();
updateCartCount();
