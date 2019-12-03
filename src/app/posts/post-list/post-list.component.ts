import {Component, Input} from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent{
  // posts = [
  //   {title: 'first post Title', content: 'The First Content'},
  //   {title: 'second post Title', content: 'The Second Content'},
  //   {title: 'third post Title', content: 'The Third Content'},
  //   {title: 'fourth post Title', content: 'The Fourth Content'},
  //   {title: 'fifth post Title', content: 'The Fiffth Content'}
  // ];
  @Input() posts: Post[] = [];
}
