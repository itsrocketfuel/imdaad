import {
  Component, OnInit
} from '@angular/core';

import {
  FirebaseService
} from '../../services/firebase.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit{

  title: String = '';
  processing: boolean = true;
  todos: String[];
  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    const itemsRef = this.firebaseService.db('items');
    itemsRef.limitToLast(10).on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.unshift({
          id: item,
          title: items[item].title,
        });
      }
      this.todos = newState;
      this.processing = false;
    });
  }

  create() {

    const item = {
      title: this.title
    }
    this.title = '';
    const itemsRef = this.firebaseService.create('items', item);

  }

  delete(id) {
    this.firebaseService.remove(`/items/${id}`);
  }
}
