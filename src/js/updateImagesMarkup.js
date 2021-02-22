import refs from './refs';
import galleryTmpl from '../templates/galleryTmpl.hbs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';

function updateImagesMarkup(images) {
  const markup = galleryTmpl(images);
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
}

export default updateImagesMarkup;
