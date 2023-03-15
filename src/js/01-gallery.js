// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const galleryImage = createGalleryImage(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryImage);

function createGalleryImage(gallery) {
    return gallery.map(({preview, original, description}) => {
        return `<div class="gallery__item"> 
        <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" width="340"/>
        </a>
        </div>`;
    })
    .join('');
};

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 300,
});
