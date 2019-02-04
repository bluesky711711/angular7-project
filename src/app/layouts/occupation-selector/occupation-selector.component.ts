import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OccupationService } from '../../services/occupation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-occupation-selector',
  templateUrl: './occupation-selector.component.html',
  styleUrls: ['./occupation-selector.component.css']
})
export class OccupationSelectorComponent implements OnInit {

  @Output() occupation = new EventEmitter();
  @Input() occupationExt: string;
  occupations: Observable<any[]>;

  constructor(private occupationService: OccupationService) { }

  ngOnInit() {
    this.occupations = this.occupationService.occupations;
  }

  ngChange(event) {
    this.occupation.emit(event);
  }

}
