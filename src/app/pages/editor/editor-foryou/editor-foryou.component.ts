import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ForyouService } from '../../../services/foryou.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-editor-foryou',
  templateUrl: './editor-foryou.component.html',
  styleUrls: ['./editor-foryou.component.css']
})
export class EditorForyouComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  posts$: any;
  posts: any;
  userId = null;
  bookmark = [];
  showEmpty = true;

  constructor(private route: ActivatedRoute,
    private foryouService: ForyouService) { }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe(params => this.userId = params.id);
      this.posts = this.foryouService.getPosts(this.userId);
      // Devuelve una promesa y la resolvemos
      this.posts.then(posts$ => {// resuelve en un observable
        posts$.pipe(takeUntil(this.unsubscribe$)).subscribe(posts => {// Nos suscribimos...
          if (posts) {// Si no llega vacia
            // Si es un arreglo completo solo o si lo devuelve directo
            this.posts$ = posts[0].posts ? posts[0].posts : posts;
            this.showEmpty = posts.length > 0 ? false : true;
          }
        });
      }).catch(e => console.log('no sigues tags o contribuidores'));
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  trackByIdx(i) {
    return i;
  }

}
