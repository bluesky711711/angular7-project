import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { ForyouService } from '../../../services/foryou.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home-foryou',
  templateUrl: './home-foryou.component.html',
  styleUrls: ['./home-foryou.component.css']
})
export class HomeForyouComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  posts$: any;
  posts: any;
  userId = null;
  bookmark = [];
  showEmpty = true;

  constructor(private auth: AuthService,
              private foryouService: ForyouService) { }

  ngOnInit() {
    this.auth.user$.subscribe(auth => {
      if (auth) {
        this.userId = auth.uid;
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
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  trackByIdx(i) {
    return i;
  }

}
