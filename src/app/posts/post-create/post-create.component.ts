import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {

  @Output() postCreated = new EventEmitter<Post>();
  onAddPost(form: NgForm){
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    form.invalid ? null : this.postCreated.emit(post);
  }
}
