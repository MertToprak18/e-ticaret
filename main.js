//! HTML'den gelenler

const categoryList = document.querySelector(".categories");
const productList = document.querySelector(".products");
const basketBtn = document.querySelector("#basket-btn");
const closeBtn = document.querySelector("#close-btn");
const modal = document.querySelector(".modal-kapsayici");
const basketList = document.querySelector("#list");
const totalInfo = document.querySelector("#total");

//! olay izleyicileri
document.addEventListener("DOMContentLoaded", () => {
  fetchCategories(), fetchProducts();
});

const baseUrl = "https://fakestoreapi.com";

//* Kategori bilgilerini alma
// 1- Api istek at (fetch)
// 2- Gelen veriyi json formatından js formatına dönüştürcem
// 3- verileri ekrana basacak fonksiyonu hazırlayacam ve çalıştırcam
// 4- hata olursa kullanıcıya bilgi vercem

function fetchCategories() {
  fetch(`${baseUrl}/products/categories`)
    .then((cevap) => cevap.json())
    // 1.yöntem --
    .then((categories) => renderCategories(categories))
    // 2.yöntem -- then çalıştığı zaman fonksiyon verileri bize direk gönderiyor
    //.then(renderCategories)
    .catch((error) =>
      console.log("Kategorileri alırken bir hata oluştu", error)
    );
}

// arrayi dönmek için 2 yöntem var birisi forEach - Map
//! her bir kategori için ekrana bir kart oluşturacak.
function renderCategories(categories) {
  categories.forEach((category) => {
    //1- div oluştur
    const categoryDiv = document.createElement("div");

    //2- dive class ekle

    categoryDiv.classList.add("category");

    //3- divin içeriğini ekleme

    const rastgeleSayi = Math.round(Math.random() * 1000);

    categoryDiv.innerHTML = `
    <div class="category">
       <img src="https://picsum.photos/300/300?r=${rastgeleSayi}" alt="${rastgeleSayi}" />
       <h2>${category}</h2>
    </div>
    `;

    //4- html de basılması için göndercez.

    categoryList.appendChild(categoryDiv);
  });
}

// normalde block scopeda olan ve hiç bir yerden ulaşılamayan
// data değişkenini global scopeda tanımladık
// bu sayede bütün fonksiyonlar bu değere erişebilecek
let data;

// ürünler verisini çeken fonksiyon
// async anahtar kelimesi ile senkron yapıdan çıkarttık.
async function fetchProducts() {
  try {
    // apiye istek attık
    const cevap = await fetch(`${baseUrl}/products`);
    //cevabı js formatına değiştirdik
    data = await cevap.json();
    // ekrana bu veriyi basmamız
    renderProducts(data);
  } catch (error) {
    console.log(error, "ürünler çekilirken bir hata oluştu.");
  }
}

function renderProducts(products) {
  const cardsHTML = products
    .map(
      (product) => `
         <div class="card">
            <div class="img-wrapper">
              <img
                src=${product.image}
                alt=""
              />
            </div>

            <h4>${product.title}</h4>

            <h4>${product.category}</h4>

            <div class="alt-kisim">
              <span>${product.price}$</span>
              <button onclick="addToBasket(${product.id})" class="button">Sepete Ekle</button>
            </div>
          </div>
    `
    )
    .join(" ");

  // hazırladığımız htmli ekrana basma
  productList.innerHTML = cardsHTML;
}

//! Sepetle ilgili işlemler

let sepet = [];
let total = 0;

// modalı açmak için event ekledik.
basketBtn.addEventListener("click", () => {
  modal.classList.add("active");
  renderBasket();
  calculateTotal();
});

// modalı kapatmak için
// modal çarpı butonuna yada modal dışında bir yere tıklandığında kapatılacak

document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("modal-kapsayici") ||
    event.target.id === "close-btn"
  ) {
    modal.classList.remove("active");
  }
});

// ! sepete ürün ekleme fonksiyonu

function addToBasket(id) {
  const product = data.find((product) => product.id === id);

  const found = sepet.find((product) => product.id === id);

  if (found) {
    //miktarını arttır
    found.miktar++;
  } else {
    // sepete ürünü ekle
    sepet.push({ ...product, miktar: 1 });
  }
}

function renderBasket() {
  basketList.innerHTML = sepet
    .map(
      (item) => `
       <div class="item">
          <img class="photo" src=${item.image} />
          <h3 class="title">${item.title.slice(0, 20)}</h3>
          <h4 class="price">${item.price}₺</h4>
          <p>Miktar: ${item.miktar}</p>
          <img id="delete-img" src="/images/e-trash.png" />
       </div>
  `
    )
    .join(" ");
}

// toplam ürün sayısını ve fiyatlarını hesaplayan fonksiyon

function calculateTotal() {
  // reduce > diziyi döner ve elemanların belirlenen değerlerini toplar
  const total = sepet.reduce(
    (toplam, item) => toplam + item.price * item.miktar,
    0
  );

  // toplam miktarı hesaplama

  const miktar = sepet.reduce((toplam, item) => toplam + item.miktar, 0);

  totalInfo.innerHTML = `
  <span id="count">${miktar} Ürün</span>
  Toplam:
  <span id="price"> ${total}</span> ₺
  `;
}