import {maxLengthCounterSelect} from './nodes';
import { declOfNum } from 'utils'; // Склонятор
const count         = declOfNum()(['тема', 'темы', 'тем']);

export default (arrVal, maxTag) => {
  let remainedTag = maxTag - arrVal.length;
  maxLengthCounterSelect.innerText = `Осталось ${remainedTag} ${count(remainedTag)}`;
  if (arrVal.length === 0) maxLengthCounterSelect.innerText = `Можно добавить ${maxTag} ${count(maxTag)}`;
};
