import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { DataService } from './shared/data.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  state = {
    seenIndexes: of(''),
    values: of({}),
    index: ''
  };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.fetchValues();
    this.fetchIndexes();
  }

  fetchValues() {
    this.state.values = this.dataService.fetchValues()
      .pipe(map( response => {
        if (response) { return response; }
        return of({});
      }
    ));
  }

  fetchIndexes() {
    this.state.seenIndexes = this.dataService.fetchIndexes()
      .pipe(
         map( response => {
          // response =  response.data;
          return response.map( ({number}) => number ).join(', ');
        })
      );
  }

  onSubmit() {
    event.preventDefault();
    this.dataService.submitIndex(this.state.index).subscribe(
      () => {
        this.state.index = '';
      });
  }
  /*
  onIndexChanged(newIndex) {
    this.state.index = newIndex;
  }
  */
}
