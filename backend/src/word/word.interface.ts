export interface WordData {
  name: string;
}

export interface WordRO {
  word: WordData;
}

export interface WordsRO {
  words: WordData[];
  wordsCount: number;
}
