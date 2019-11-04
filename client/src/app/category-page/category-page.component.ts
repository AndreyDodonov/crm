import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  
  categories$: Observable<Category[]>

  constructor(private categoriesServise: CategoriesService) { }

  ngOnInit() {
    
    this.categories$ = this.categoriesServise.fetch()

    }

  }


