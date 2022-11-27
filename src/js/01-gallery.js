import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';

// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const imagesMarkup = createImageMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

galleryContainer.addEventListener('click', galleryContainerClickHandler);

function createImageMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
</div>`;
    })
    .join('');
}

function galleryContainerClickHandler(event) {
  event.preventDefault();

  const isGalleryImage = event.target.classList.contains('gallery__image');
  if (!isGalleryImage) {
    return;
  }

  SimpleLightboxHandler();
}

function SimpleLightboxHandler() {
  let lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });

  lightbox.on('show.lightbox');
}
