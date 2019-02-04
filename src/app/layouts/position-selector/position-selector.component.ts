import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PositionService } from '../../services/position.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-position-selector',
  templateUrl: './position-selector.component.html',
  styleUrls: ['./position-selector.component.css']
})
export class PositionSelectorComponent implements OnInit {

  @Output() position = new EventEmitter();
  @Input() positionExt: string;
  positions: Observable<any[]>;

  constructor(private positionService: PositionService) { }

  ngOnInit() {
    this.positions = this.positionService.positions;
  }

  ngChange(event) {
    this.position.emit(event);
  }

}
