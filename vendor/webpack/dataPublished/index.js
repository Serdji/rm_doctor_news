const moment = require('moment');
require('moment/locale/ru');
const { each } = require('utils');

module.exports = (elem) => {

  moment.locale('ru', {
    calendar: {
      sameDay: '[Сегодня,] LT',
      lastDay: '[Вчера,] LT',
    }
  });

  each(elem, el => {
    // Дата публикации
    let dateTimeCreation = el.dataset.publishedDate ? el.dataset.publishedDate * 1000 : el.dataset.publishedAt;
    // Если год совпадает выводить дату в формате (дата, месяц)
    if (moment().year() === moment(dateTimeCreation).year()) {
      // Если совпадает месяц
      if (moment().month() === moment(dateTimeCreation).month()) {
        // Если сегодня, выводим в формате (Столько то времяни назад)
        if (moment().date() === moment(dateTimeCreation).date()) {
          el.innerText = moment(dateTimeCreation).fromNow();
          // Если совпал чесы и минуты выводим (только что)
          if (moment().hour() === moment(dateTimeCreation).hour() &&
              moment().minute() === moment(dateTimeCreation).minute()) el.innerText = 'Только что';
        }
        // Если вчера, выводим в формате (дата, месяц)
        if ((moment().date() - 1) >= moment(dateTimeCreation).date()) el.innerText = moment(dateTimeCreation).format('D MMMM');

      } else {
        // Если месяц не совпал всегда выводим в формате (дата, месяц)
        el.innerText = moment(dateTimeCreation).format('D MMMM');
      }
    } else {
      // Если дата побликации прошлогодняя, выводим в формате (дата, месяц, год)
      el.innerText = moment(dateTimeCreation).format('D MMMM YYYY');
    }
  });
};