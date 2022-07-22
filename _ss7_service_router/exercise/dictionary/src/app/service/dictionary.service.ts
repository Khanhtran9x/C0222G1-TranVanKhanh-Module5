import {Injectable} from '@angular/core';
import {Iword} from '../model/iword';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  dictionaries: Iword[] = [
    {word: 'Hello', mean: 'Xin chào'},
    {word: 'School', mean: 'Trường học'},
    {word: 'Student', mean: 'Sinh viên'},
  ];

  constructor() {
    this.getAll();
  }

  findByWord(word: string): string {
    const record = this.dictionaries.find(dictionary => dictionary.word === word);
    return record.mean;
  }

  searchByWord(word: string): Iword[] {
    const searchDictionaries: Iword[] = [];
    for (const item of this.dictionaries) {
      if (item.word.toLowerCase().includes(word.toLowerCase())) {
        searchDictionaries.push(item);
      }
    }
    return searchDictionaries;
  }

  getAll() {
    return this.dictionaries;
  }
}
