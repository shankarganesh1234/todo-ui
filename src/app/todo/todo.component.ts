import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Task} from '../models/task';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoService} from '../services/todo-service';
import {FormBuilder} from '@angular/forms';

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
    task: Task;
    key: string;
    addTaskForm: any;
    showAddTask: boolean = false;

    // tslint:disable-next-line:max-line-length
    constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo, private todoService: TodoService, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.key = params.key;
        });
        this.getTasksByKey(this.key);
    }

    getTasksByKey(key: string): void {
        this.tasks = [];
        this.todoService.getTasksByKey(key).subscribe(
            result => this.tasks = result,
            error => console.log(error)
        );

        this.addTaskForm = this.formBuilder.group({
            name: '',
            tag: '',
            dateTime: ''
        });
    }

    updateTask(id: string, key: string, name: string, tag: string, dateTime: string, status: string): void {
        this.todoService.updateTask(id, key, name, tag, dateTime, status).subscribe(
            result => this.task = result,
            error => console.log(error)
        );
    }

    addTask(key: string, tag: string, name: string, dateTime: string): void {
        this.todoService.addTask(key, tag, name, dateTime).subscribe(
            result => {
                let d = result.data;
                let t = d.addTask;
                this.task = t;
                this.tasks.unshift(this.task);
                this.showAddTask = false;
            },
            error => console.log(error)
        );
    }

    deleteTask(id: string): void {
        this.todoService.deleteTask(id).subscribe(
            result => {
                console.log(result);
                this.tasks = this.tasks.filter(e => e.id != id)
            },
            error => console.log(error)
        );
    }

    addTaskSubmit(addTaskData: any) {
        let dt = new Date(addTaskData.dateTime).getTime();
        let task: Task = new Task();
        task.name = addTaskData.name;
        task.tag = addTaskData.tag;
        task.dateTime = dt.toString();
        task.key = this.key;
        this.addTask(this.key, addTaskData.tag, addTaskData.name, dt.toString());
    }
}
