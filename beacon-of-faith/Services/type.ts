export interface JournalEntry {
  id: string;
  date: string;
  content: string;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}