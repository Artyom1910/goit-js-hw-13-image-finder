const apiKey = '20349165-a1cad4bdc7b6c381f0f75fb94';

export default {
  searchQuery: '',
  page: 1,
  fetchImages() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`;
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    };

    return fetch(url, options)
      .then(response => (response.ok ? response.json() : response.text()))
      .then(data => {
        this.incrementPage();
        return data.hits || [];
      })
      .catch(error => console.log(error));
  },
  resetPage() {
    this.page = 1;
  },
  incrementPage() {
    this.page += 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};
