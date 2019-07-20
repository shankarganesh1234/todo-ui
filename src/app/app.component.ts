import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'angular-todo-app';
  loading = true;
  error: any;
  tasks: any[]

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
              tasksByKey (key: "shankar") {
              id
              name
              tag
              key
              dateTime
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        console.log(result);
    });
  }
}
