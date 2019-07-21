import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {Task} from '../models/task';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

@Injectable()
export class TodoService {

    tasks: Task[] = [];
    key: string;
    data: Observable<Task[]>;

    constructor(private apollo: Apollo) {
    }

    getTasksByKey(key: string): Observable<Task[]> {
        this.data = this.apollo
            .watchQuery({
                query: getTasksQuery,
                variables: {
                    key: this.key,
                }
            })
            .valueChanges.pipe(map(({data}) => {
                let m = data as any;
                return m.tasksByKey as Task[];
            }));
        return this.data;
    }
}

