import {Component, OnInit} from '@angular/core';
import {DictionaryService} from '../../service/dictionary.service';
import {Iword} from '../../model/iword';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {
  dictionaries: Iword[];
  searchWord: string;

  constructor(private dictionaryService: DictionaryService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.dictionaries = this.dictionaryService.getAll();
    console.log(this.dictionaries);
  }

  searchByWord() {
    this.dictionaries = this.dictionaryService.searchByWord(this.searchWord);
  }
}
