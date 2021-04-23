export interface Words {
  audio: string
  audioExample: string
  audioMeaning: string
  group: number
  id: string
  image: string
  page: number
  textExample: string
  textExampleTranslate: string
  textMeaning:string
  textMeaningTranslate: string
  transcription: string
  word: string
  wordTranslate:string
}

function checkDifficultWords(words: Array<Words>, resultWords: Words): boolean {
  if (words.length === 0) return true;

  for (let i = 0; i < words.length; i += 1) {
    if (words[i].word === resultWords.word) {
      return false;
    }
  }

  return true;
}

export default checkDifficultWords;
