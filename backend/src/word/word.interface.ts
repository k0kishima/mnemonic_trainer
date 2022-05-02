export interface WordData {
  id: number;
  name: string;
}

export interface WordRO {
  word: WordData;
}

export interface WordsRO {
  words: WordData[];
  wordsCount: number;
}
