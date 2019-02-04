import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AgeService } from '../../services/age.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-age-range-selector',
  templateUrl: './age-range-selector.component.html',
  styleUrls: ['./age-range-selector.component.css']
})
export class AgeRangeSelectorComponent implements OnInit {
  @Output() age = new EventEmitter();
  @Input() ageExt: string;
  ages: Observable<any[]>;

  constructor(private ageService: AgeService) { }

  ngOnInit() {
    this.ages = this.ageService.ages;
  }

  ngChange(event) {
    this.age.emit(event);
  }

}
