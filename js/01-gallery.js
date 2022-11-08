import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryRef = document.querySelector(".gallery");
const galleryItem = galleryItems
  .map(
    (item) =>
      `<div class="gallery__item">
    <a class="gallery__link" href="${item.original}">
        <img
         class="gallery__image" 
         src="${item.preview}" 
         data-source="${item.original}"
         alt="${item.description}"/>
    </a>
</div>`
  )
  .join("");
galleryRef.insertAdjacentHTML("beforeend", galleryItem);

galleryRef.addEventListener("click", onClickOpenModal);

function onClickOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const currentImage = event.target;
  const instance = basicLightbox.create(
    `
    <img  src="${currentImage.dataset.source}" width="1280" alt="image">
`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onClickCloseModal);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onClickCloseModal);
      },
    }
  );
  function onClickCloseModal(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
  instance.show();
}
