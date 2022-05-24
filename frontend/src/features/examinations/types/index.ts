export type Word = {
  id: number;
  name: string;
}

export type ExaminationStatus = 'done' | 'wait_for_answers' | 'memorizing';

export type Examination = {
  readonly id: number;
  readonly rememberedAt: Date;
  readonly answeredAt: Date;
  readonly createdAt: Date;
  readonly words: Word[];
  readonly answers: Answer[];
  status?: ExaminationStatus;
}

export type Answer = {
  id: number;
  value: string;
  position: number;
}
