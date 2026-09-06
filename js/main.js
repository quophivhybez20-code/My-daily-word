// A small curated list of words. Add more or wire to an API if you like.
const WORDS = [
  {word: 'serene', pos: 'adjective', def: 'calm, peaceful, and untroubled', example: 'She had a serene expression.'},
  {word: 'lucid', pos: 'adjective', def: 'expressed clearly; easy to understand', example: 'His explanation was lucid and concise.'},
  {word: 'mettle', pos: 'noun', def: "a person\'s ability to cope well with difficulties", example: 'She showed her mettle in the crisis.'},
  {word: 'austere', pos: 'adjective', def: 'severe or strict in manner; having no comforts', example: 'The room was plain and austere.'},
  {word: 'ephemeral', pos: 'adjective', def: 'lasting for a very short time', example: 'Fashions are ephemeral.'},
  {word: 'candid', pos: 'adjective', def: 'truthful and straightforward', example: 'He gave a candid interview.'},
  {word: 'prudent', pos: 'adjective', def: 'acting with or showing care for the future', example: 'A prudent investor diversifies.'}
];

function daysSinceEpoch(date = new Date()){
  const msPerDay = 24*60*60*1000;
  const d = new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate()));
  const epoch = new Date(Date.UTC(1970,0,1));
  return Math.floor((d - epoch)/msPerDay);
}

function pickWord(offset = 0){
  const index = (daysSinceEpoch() + offset) % WORDS.length;
  return WORDS[(index + WORDS.length) % WORDS.length];
}

function render(wordObj){
  document.getElementById('word').textContent = wordObj.word;
  document.getElementById('pos').textContent = wordObj.pos;
  document.getElementById('definition').textContent = wordObj.def;
  document.getElementById('example').textContent = wordObj.example ? '“' + wordObj.example + '”' : '';
}

let dayOffset = 0;

document.getElementById('today').addEventListener('click', ()=>{ dayOffset = 0; render(pickWord(0)); });
document.getElementById('prev').addEventListener('click', ()=>{ dayOffset -= 1; render(pickWord(dayOffset)); });
document.getElementById('next').addEventListener('click', ()=>{ dayOffset += 1; render(pickWord(dayOffset)); });

// initial render
render(pickWord(0));
