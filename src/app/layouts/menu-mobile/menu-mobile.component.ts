import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { HeaderNavComponent } from '../header-nav/header-nav.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.css']
})
export class MenuMobileComponent implements OnInit {
  @Output() hide_menu = new EventEmitter();
  @ViewChild(HeaderNavComponent) header: HeaderNavComponent;
  modal;

  constructor(public auth: AuthService, public router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  hideMenu() {
    this.hide_menu.emit(false);
  }

  openModal(content) {
    this.modal = this.modalService.open(content);
  }

  closeModal() {
    this.modal.close();
  }

  googleLogin() {
    this.auth.googleLogin().then(() => {
      this.closeModal();
      this.hideMenu();
    });
  }

  facebookLogin() {
    this.auth.facebookLogin().then(() => {
      this.closeModal();
      this.hideMenu();
    });
  }

  twitterLogin() {
    this.auth.twitterLogin().then(() => {
      this.closeModal();
      this.hideMenu();
    });
  }

}
