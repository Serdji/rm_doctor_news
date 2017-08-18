export let each =  Function.call.bind([].forEach);
export let qs = document.querySelector.bind(document);
export let qsa = document.querySelectorAll.bind(document);
export { declOfNum } from 'declOfNum'
export { fetchAutToken } from 'fetchAuthenticityToken'
export { getCoords } from 'getCoords'
export function hasAtLeastChars(value, number) {
  let processed = value.replace(/[^а-яА-Яa-zA-Z0-9]/g, '');
  return processed.length >= number;
}