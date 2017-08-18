import { qs } from 'utils';

const partnerNews = qs('.news-partners__same-source');
const newsBlock = qs('.news-card');

if (partnerNews && newsBlock) {
  let url = '/news/from_same_source.json';
  let template = _.template(qs('#teaser-container-template').innerHTML);
  let clusterId = newsBlock.dataset.clusterId;

  const renderNews = (news) => {
    // Parse news into title, url, content_type, image_base64 vars
    let { title, url, image: { url: imageUrl } } = news;

    let object = { title: title, url: url, src: imageUrl };
    let rendered = template(object);

    partnerNews.insertAdjacentHTML('beforeEnd', rendered);
  };

  fetch(`${url}?cluster_id=${clusterId}`)
    .then((response) => {
      return response.json();
    })

    .then((json) => {
      return _.each(json, (news) => renderNews(news));
    })

    .then((json) => {
      if (json.length > 0) partnerNews.classList.remove('_hidden');
    })

    .catch((error) => console.log(error));
}
