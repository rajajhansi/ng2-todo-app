import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.css'],
  providers: [TodoService]
})
export class TodoAppComponent implements OnInit {
  newTodo: Todo = new Todo();
  filter: string = 'all';
  filteredTodos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  addTodo() {
    this.todoService.addTodo(this.newTodo);
    this.newTodo = new Todo();
    this.filterTodo(this.filter);
  }

  toggleTodoDone(todo) {
    this.todoService.toggleTodoDone(todo);
    this.filterTodo(this.filter);
  }

  removeTodo(todo) {
    this.todoService.deleteTodo(todo.id);
    this.filterTodo(this.filter);
  }

  filterTodo(filterCriteria: string) {
    this.filter = filterCriteria;
    this.filteredTodos = this.todoService.filterTodo(filterCriteria);
  }

  completeAllTodos() {
    this.todoService.completeAllTodos();
    // this.checkIfAllTodosAreCompleted();
    this.filterTodo(this.filter);
  }

  removeAllTodos() {
    this.todoService.removeAllTodos();
    this.filterTodo(this.filter);
  }

  removeDoneTodos() {
    this.todoService.removeDoneTodos();
    this.filterTodo(this.filter);
  }
}
