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
    status
  }
}
`;

const updateTaskQuery = gql`
  mutation updateTaskQuery ($id: ID, $key: String, $tag: String, $name: String, $dateTime: String, $status: String) {
  updateTask (id: $id, key: $key, tag: $tag, name: $name, dateTime: $dateTime, status: $status) {
    id
    name
    tag
    key
    dateTime
    status
  }
}
`;


const addTaskQuery = gql`
  mutation addTaskQuery ($key: String, $tag: String, $name: String, $dateTime: String) {
  addTask (key: $key, tag: $tag, name: $name, dateTime: $dateTime) {
    id
    name
    tag
    key
    dateTime
    status
  }
}
`;

const deleteTaskQuery = gql`
  mutation deleteTaskQuery ($id: ID) {
  deleteTask (id: $id) {
    status
    id
    key
    name
    tag
    dateTime
  }
}
`;

@Injectable()
export class TodoService {

    key: string;
    data: Observable<Task[]>;
    task: Observable<Task>;

    constructor(private apollo: Apollo) {
    }

    getTasksByKey(incomingKey: string): Observable<Task[]> {
        this.data = this.apollo
            .watchQuery({
                query: getTasksQuery,
                variables: {
                    key: incomingKey,
                }
            })
            .valueChanges.pipe(map(({data}) => {
                let m = data as any;
                return m.tasksByKey as Task[];
            }));
        return this.data;
    }

    updateTask(incomingId: string, incomingKey: string,
               incomingName: string, incomingTag: string, incomingDateTime: string,
               incomingStatus: string): Observable<any> {
        let t = this.apollo
            .mutate({
                mutation: updateTaskQuery,
                variables: {
                    key: incomingKey,
                    name: incomingName,
                    tag: incomingTag,
                    id: incomingId,
                    status: incomingStatus,
                    dateTime: incomingDateTime
                }
            });
        let m = t as Observable<Task>;
        return m;
    }

    addTask(incomingKey: string, incomingTag: string, incomingName: string, incomingDateTime: string): Observable<any> {
        let t =  this.apollo
            .mutate({
                mutation: addTaskQuery,
                variables: {
                    key: incomingKey,
                    name: incomingName,
                    tag: incomingTag,
                    dateTime: incomingDateTime
                }
            });
        let m = t as Observable<Task>;
        return m;
    }

    deleteTask(incomingId: string): Observable<any> {
        let t =  this.apollo
            .mutate({
                mutation: deleteTaskQuery,
                variables: {
                    id: incomingId
                }
            });
        let m = t as Observable<Task>;
        return m;
    }
}

