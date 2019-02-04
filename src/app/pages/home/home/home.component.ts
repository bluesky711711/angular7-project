import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CategoryService } from '../../../services/category.service';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { routeAnimation } from '../../../animations';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [routeAnimation]
})
export class HomeComponent implements OnInit {
  categories$;

  constructor(public auth: AuthService,
              private seoService: SeoService,
              private categoryService: CategoryService,
              public router: Router) {
    this.seoService.generateTags({
      title: 'Piensa Digital - Noticias y contenido de calidad sobre economía digital, emprendimiento y más...',
      // tslint:disable-next-line:max-line-length
      description: 'Piensa Digital es la plataforma para leer y compartir contenido sobre economía, cultura y transformación digital en Latinoamérica'
    });
  }


  async ngOnInit() {
    this.categories$ = this.categoryService.categories;
  }

  getState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

}
