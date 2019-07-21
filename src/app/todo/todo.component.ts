import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Task} from '../models/task';
import {ActivatedRoute, Router} from '@angular/router';

const getTasksQuery = gql`
  query getTasksQuery ($key: ID) {
  tasksByKey (key: $key) {
    id
    name
    tag
    key
    dateTime
  }
}
`;

@Component({
  selector: 'app-key',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
  title = 'your-tasks';
  tasks: Task[] = [];
  key: string;



  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.key = params.key;
    });

    this.apollo
      .watchQuery({
        query: getTasksQuery,
        variables: {
          key: this.key,
        }
      })
      .valueChanges.subscribe(result => {
        let d = result.data as any;
        let m = d.tasksByKey as Task[];
        console.log(m);
        this.tasks = m;
    });
  }
}
