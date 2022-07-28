import {Injectable} from '@angular/core';

let defaultId = 1;

@Injectable({
  providedIn: 'root'
})

export class SliderService {
  user: string = 'Default Id:' + defaultId++;

  constructor() {
  }
}
