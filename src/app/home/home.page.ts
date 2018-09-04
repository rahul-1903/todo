import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import { NativeStorage } from '@ionic-native/native-storage';
// import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoList: string[] = ['Eat an apple', 'Go For a walk'];
  todoForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private storage: Storage) {
    
    this.todoForm = this.formBuilder.group({
      todo: ['', Validators.required],
    });

    storage.get('todoList')
      .then((todoList) => {
        console.log('Your data', todoList);
        this.todoList = todoList;
      })

  }

  onSubmit() {
    this.addTodo(this.todoForm.value['todo']);
    this.todoForm.reset();
  }

  addTodo(todo) {
    console.log('task added');
    this.todoList.push(todo);

    this.storage.set('todoList', this.todoList).then((data)=>console.log('data added', data));
  }

  removeTodo(index) {
    console.log('task removed');
    // delete this.todoList[index];
    this.todoList.splice(index,1);
    this.storage.set('todoList', this.todoList).then((data)=>console.log('data removed', data));;
  }

}
