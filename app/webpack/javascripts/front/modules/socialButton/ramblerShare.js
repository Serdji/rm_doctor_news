const {each, qs} = require('utils');
const OG_DEFAULT_PNG = 'https://class.rambler.ru/8f56f794/front/opengraph.png';

module.exports = (nodes) => {
  // Общий конфиг для шарилок
  let options = {
    'style': {
      'buttonHeight': 40,
      'borderRadius': 0,
      'borderWidth': 1,
      'counterSize': 13,
      'buttonBackground': 'rgba(40,86,248,0)',
      'borderColor': '#eee'
    },
    'counters': true,
    'buttons': [
      'vkontakte',
      'facebook',
      'odnoklassniki',
      'livejournal',
      'twitter'
    ],
    vkontakte: {
      utm: 'utm_source=vksharing&utm_medium=social'
    },
    facebook: {
      utm: 'utm_source=fbsharing&utm_medium=social'
    },
    odnoklassniki: {
      utm: 'utm_source=oksharing&utm_medium=social'
    },
    livejournal: {
      utm: 'utm_source=ljsharing&utm_medium=social'
    },
    twitter: {
      utm: 'utm_source=twsharing&utm_medium=social',
      'description': ' '
    }
  };
  let maxLengthText = 140;
  let init = () => {

    // Шарелки на детальной cтранице новостей
    if (nodes.newsCardPage) {
      // Добавляем общие стили в конфиг
      Object.assign(options , {
        'style': {
          'buttonHeight': 36,
          'iconSize': 16,
          'borderRadius': 0,
          'counterSize': 11
        }
      });
      RamblerShare.init('.js-description-social', options);
      RamblerShare.init('.js-article-social', options);

    }


    // При условии что шарелки цветные, выводим шарелки
    if (nodes.questionSocial)  RamblerShare.init('.js-question-social', options);

    // Прозрачные шарелки
    if (nodes.commonSocial.length > 0) {
      // Добавляем общие стили в конфиг
      Object.assign(options, {
        'style': {
          'buttonHeight': 26,
          'iconSize': 14,
          'borderRadius': 50,
          'buttonBackground': 'rgba(40,86,248,0)',
          'iconColor': '#315efb',
          'iconColorHover': '#2c54e1',
          'borderColor': 'rgba(0,0,0,0)'
        },
        'counters': false
      });

      // Бежим циклом по нужным нам элементам
      each(nodes.commonSocial, el => {
        // Подключаемся к блокам в которых выведены шарелки
        let questionParentIsClass  = el.closest('.js-question-share');
        let answerParentIsClass    = el.closest('.js-answer-share');
        let questionsParentIsClass = el.closest('.js-questions-share');
        let tagParentIsClass       = el.closest('.js-tag-share');
        let searchParentIsClass    = el.closest('.js-search-share');

        // В зависимости от того блока в котором шарелки, расширяем конфиг со своими насторйками
        // Вопрос
        if (questionParentIsClass) {
          RamblerShare.init(`[data-social-link='${el.dataset.socialLink}']`, options);
          // RamblerShare.init(`[data-social-link='${el.dataset.socialLink}']`,
          //   Object.assign( options, {
          //     title: questionParentIsClass.querySelector('.js-question-share-title').innerText,      // Времменно до появления опенграфов
          //     description: questionParentIsClass.querySelector('.js-question-share-text').innerText.slice(0, maxLengthText) + '...',  // Времменно до появления опенграфов
          //   })
          // );
        }
        // Лучший ответ и ответы
        if (answerParentIsClass) {
          RamblerShare.init(`[data-social-link='${el.dataset.socialLink}']`,
            Object.assign(options, {
              description: answerParentIsClass.querySelector('.js-answer-share-text').innerText.slice(0, maxLengthText) + '...',
              url: `${window.location}?hash_id=${answerParentIsClass.id}`,
            })
          );
        }

        // Вопросы
        if (questionsParentIsClass) {
          RamblerShare.init(`[data-social-link='${el.dataset.socialLink}']`,
            Object.assign(options, {
              title: questionsParentIsClass.querySelector('.js-questions-share-title').dataset.title,
              description: questionsParentIsClass.querySelector('.js-questions-share-text').innerText.slice(0, maxLengthText) + '...',
              url: `${window.location.origin}${questionsParentIsClass.querySelector('.js-questions-share-title').getAttribute('href')}`,
              image: OG_DEFAULT_PNG
            })
          );
        }

        // Теги - темы
        if (tagParentIsClass) {
          let attrHref = tagParentIsClass.querySelector('.js-tag-share-title').getAttribute('href');
          let dataHref = tagParentIsClass.querySelector('.js-tag-share-title').dataset.href;
          RamblerShare.init(`[data-social-link='${el.dataset.socialLink}']`,
            Object.assign(options, {
              title: tagParentIsClass.querySelector('.js-tag-share-title').innerText,
              description: tagParentIsClass.querySelector('.js-tag-share-title').innerText.slice(0, maxLengthText) + '...',
              url: `${window.location.origin}${attrHref || dataHref}`,
              image: tagParentIsClass.querySelector('.js-tag-share-img').dataset.image
            })
          );
        }

        // Результаты поиска
        if (searchParentIsClass) {
          RamblerShare.init(`[data-social-link='${el.dataset.socialLink}']`, options);
        }
      });
    }
  };
  return init;
};