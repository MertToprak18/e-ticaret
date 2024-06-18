const url = "https://jsonplaceholder.typicode.com/users";

// asenkron mantığımız gerekiyor
// 2 tane yöntem var.
// then catch finally
// async await

// promise isteğin beklediğini söylüyor. bir süre geçmesi gerektiğini söylüyor.
// bunun sonucunda 2 tür cevap döner.
// olumlu cevap yani response
// olumsuz rejected hata döner.

// fetch : apilere istek atmamı sağlıyor
fetch(url)
  // olumlu cevap gelirse then içerisine yazdığımız fonksiyon çalışcak
  .then((response) => {
    return response.json();
  })
  .then((veri) => {
    verileriEkranaBas(veri);
  })
  // olumsuz bir cevap gelseydi yani hata olsaydı o zaman catch kısmı çalışacaktı
  .catch((error) => {
    console.log("hata oluştu", error);
  })
  .finally(() => console.log("olumlu olumsuz farketmez ben hep çalışırım"));

console.log("1. konsol");
console.log("2. konsol");

function verileriEkranaBas(veri) {
  veri.forEach((user) => document.write(user.name + "<br>"));
}

// javascript trick kısa yollarından birisi.
// es6 beraber geldi işleri kolaylaştırıyor

// spread operator (dağıtmak anlamına geliyor) ( ... )

// bir objenin veya dizinin sahip olduğu değerleri farklı
// bir obje veya diziye aktarmaya yarar

const arac = {
  type: "elektrikli",
  vites: 5,
};

const tesla = {
  ...arac,
  vites: 6,
  marka: "tesla",
};

console.log(tesla);