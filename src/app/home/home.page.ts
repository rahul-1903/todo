import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import { NativeStorage } from '@ionic-native/native-storage';
// import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoList: string[] = ['Eat an apple', 'Go For a walk'];
  todoForm: FormGroup;

  constructor(private formBuilder: FormBuilder,) {
    this.todoForm = this.formBuilder.group({
      todo: ['', Validators.required],
    });

    // this.nativeStorage.setItem('todoList', this.todoList)
    //   .then(
    //     () => console.log('Stored item'),
    //     error => console.log(error)
    //   );
  }

  onSubmit() {
    this.addTodo(this.todoForm.value['todo']);
    this.todoForm.reset();
  }

  addTodo(todo) {
    console.log('task added');
    this.todoList.push(todo);

  }

  removeTodo(index) {
    console.log('task removed');
    delete this.todoList[index];

  }

}
