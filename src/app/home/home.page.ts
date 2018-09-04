import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoList: string[] = ['Eat an apple', 'Go For a walk'];
  todoForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private storage: Storage,
    private toastCtrl: ToastController) {
    
    this.todoForm = this.formBuilder.group({
      todo: ['', Validators.required],
    });

    storage.get('todoList')
      .then((todoList) => {
        if (todoList) {
          console.log('Your data', todoList);
          this.todoList = todoList;
        }
      })

  }

  onSubmit() {
    this.addTodo(this.todoForm.value['todo']);
    this.todoForm.reset();
  }

  addTodo(todo) {
    if (todo) {
      console.log('task added');
      this.todoList.push(todo);

      this.storage.set('todoList', this.todoList).then((data)=>console.log('data added', data));
      
      // adding toast
      this.toastCtrl.create({
        message: 'Task added to the list',
        duration: 1000,
      }).then((toast) => toast.present());
    }
    else {
      console.log('task cannot be empty');
      this.toastCtrl.create({
        message: 'Task input is empty',
        duration: 2000,
      }).then((toast) => toast.present());
    }
  }

  removeTodo(index) {
    console.log('task removed');
    this.todoList.splice(index,1);
    this.storage.set('todoList', this.todoList).then((data)=>console.log('data removed', data));;
    
    this.toastCtrl.create({
      message: 'Task deleted from the list',
      duration: 1000,
    }).then((toast) => toast.present());
  }

}
