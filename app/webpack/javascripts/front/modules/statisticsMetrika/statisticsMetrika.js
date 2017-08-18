import {search, newsMainPage, newsCardPage, questionAskQuestion, questionAskTag} from './nodes';

export default () => {
  search.addEventListener('click', e => {
    let target = e.target;
    // Дилегируем событие и в зависимости от класса, оправляем данные в счетчик
    if (target.closest('.js-clear-input')) yaCounter44184924.reachGoal('click_cross');
    if (target.closest('.js-search-question')) yaCounter44184924.reachGoal('click_element_question');
    if (target.closest('.js-search-theme')) yaCounter44184924.reachGoal('click_element_tag');
    if (target.closest('.js-search-result')) yaCounter44184924.reachGoal('click_link_all_results');
    if (target.closest('.js-search-search')) yaCounter44184924.reachGoal('click_global_search');
    if (target.closest('.js-clear-button')) yaCounter44184924.reachGoal('click_create_button_issue');
  });

  // События на главной странице
  if(newsMainPage){
    // Виджет в блоке с вопросами
    questionAskQuestion.addEventListener('click', e => {
      let target = e.target;
      if (target.closest('.js-present-question-input')) yaCounter44184924.reachGoal('click_create_issue_text_b');
      if (target.closest('.js-open-pop-up-ques')) {
        let textarea = target.closest('.js-present-question').querySelector('.js-present-question-input');
        // Проветк на начилие текста в поле
        if (textarea.value.length > 0) yaCounter44184924.reachGoal('click_create_issue_button_b_open');
        else yaCounter44184924.reachGoal('click_create_issue_button_b');
      }
    });

    // Виджет в блоке с темами
    questionAskTag.addEventListener('click', e => {
      let target = e.target;
      if (target.closest('.js-present-question-input')) yaCounter44184924.reachGoal('click_create_issue_text_b2');
      if (target.closest('.js-open-pop-up-ques')) {
        let textarea = target.closest('.js-present-question').querySelector('.js-present-question-input');
        // Проветк на начилие текста в поле
        if (textarea.value.length > 0) yaCounter44184924.reachGoal('click_create_issue_button_b2_open');
        else yaCounter44184924.reachGoal('click_create_issue_button_b2');
      }
    });
  }

  // События на детальной странице
  if(newsCardPage){
    // Виджет в блоке с вопросами
    questionAskQuestion.addEventListener('click', e => {
      let target = e.target;
      if (target.closest('.js-present-question-input')) yaCounter44184924.reachGoal('click_create_issue_text_b3');
      if (target.closest('.js-open-pop-up-ques')) {
        let textarea = target.closest('.js-present-question').querySelector('.js-present-question-input');
        // Проветк на начилие текста в поле
        if (textarea.value.length > 0) yaCounter44184924.reachGoal('click_create_issue_button_b3_open');
        else yaCounter44184924.reachGoal('click_create_issue_button_b3');
      }
    });

    // Виджет в блоке с темами
    questionAskTag.addEventListener('click', e => {
      let target = e.target;
      if (target.closest('.js-present-question-input')) yaCounter44184924.reachGoal('click_create_issue_text_b4');
      if (target.closest('.js-open-pop-up-ques')) {
        let textarea = target.closest('.js-present-question').querySelector('.js-present-question-input');
        // Проветк на начилие текста в поле
        if (textarea.value.length > 0) yaCounter44184924.reachGoal('click_create_issue_button_b4_open');
        else yaCounter44184924.reachGoal('click_create_issue_button_b4');
      }
    });
  }
};
