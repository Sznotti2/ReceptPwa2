import { Component } from '@angular/core';
import { BlogList } from '../blog-list/blog-list';

@Component({
  selector: 'app-blog-page',
  imports: [BlogList],
  templateUrl: './blog-page.html',
  styleUrl: './blog-page.scss'
})
export class BlogPage {

}
