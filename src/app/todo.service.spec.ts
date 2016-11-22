/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Todo } from './todo';
import { TodoService } from './todo.service';

describe('Service: Todo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService]
    });
  });

  describe('#getAllTodos()', () => {
    it('should ...', inject([TodoService], (service: TodoService) => {
      expect(service).toBeTruthy();
    }));

    it('should reutrn an empty array by default', inject([TodoService], (service: TodoService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject([TodoService], (service: TodoService) => {
      let todo1 = new Todo({description: 'Task 1', done: false});
      let todo2 = new Todo({description: 'Task 2', done: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  describe('#save(todo)', () => {
    it('should remove todo with the corresponding id', inject([TodoService], (service: TodoService) => {
      let todo1 = new Todo({description: 'Task 1', done: false});
      let todo2 = new Todo({description: 'Task 2', done: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodo(1);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodo(2);
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should not removing anything if todo with corresponding id is not found', inject([TodoService], (service: TodoService) => {
      let todo1 = new Todo({description: 'Hello 1', done: false});
      let todo2 = new Todo({description: 'Hello 2', done: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodo(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  describe('#updateTodo(id, values)', () => {

    it('should return todo with the corresponding id and updated data', inject([TodoService], (service: TodoService) => {
      let todo = new Todo({description: 'Hello 1', done: false});
      service.addTodo(todo);
      let updatedTodo = service.updateTodo(1, {
        description: 'new description'
      });
      expect(updatedTodo.description).toEqual('new description');
    }));

    it('should return null if todo is not found', inject([TodoService], (service: TodoService) => {
      let todo = new Todo({description: 'Hello 1', done: false});
      service.addTodo(todo);
      let updatedTodo = service.updateTodo(2, {
        description: 'new description'
      });
      expect(updatedTodo).toEqual(null);
    }));

    describe('#toggleTodoDone(todo)', () => {

      it('should return the updated todo with inverse complete status', inject([TodoService], (service: TodoService) => {
        let todo = new Todo({description: 'Hello 1', done: false});
        service.addTodo(todo);
        let updatedTodo = service.toggleTodoDone(todo);
        expect(updatedTodo.done).toEqual(true);
        service.toggleTodoDone(todo);
        expect(updatedTodo.done).toEqual(false);
      }));

    });
  });
});
