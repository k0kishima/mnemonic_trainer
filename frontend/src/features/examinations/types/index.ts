export type Word = {
  id: number;
  name: string;
}

export type Examination = {
  id: number;
  rememberedAt: Date;
  answeredAt: Date;
  createdAt: Date;
  words: Word[];
  answers: Answer[];
}

export type Answer = {
  id: number;
  value: string;
  position: number;
}
