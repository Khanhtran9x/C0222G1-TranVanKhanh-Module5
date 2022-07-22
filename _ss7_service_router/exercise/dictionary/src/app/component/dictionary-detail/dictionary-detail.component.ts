import {Component, OnInit} from '@angular/core';
import {DictionaryService} from '../../service/dictionary.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dictionary-detail',
  templateUrl: './dictionary-detail.component.html',
  styleUrls: ['./dictionary-detail.component.css']
})
export class DictionaryDetailComponent implements OnInit {
  word: string;
  mean: string;

  constructor(private dictionaryService: DictionaryService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.word = this.activatedRoute.snapshot.params.word;
    this.mean = this.dictionaryService.findByWord(this.word);
  }
}
