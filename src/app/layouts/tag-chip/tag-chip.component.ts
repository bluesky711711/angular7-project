import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-tag-chip',
  templateUrl: './tag-chip.component.html',
  styleUrls: ['./tag-chip.component.css']
})
export class TagChipComponent implements OnInit {
  @Output() tagsOut = new EventEmitter();
  @Input() tags: string[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  // tags: string[] = [];
  allTags: string[];
  tag: Observable<any[]>;

  @ViewChild('tagInput') tagInput: ElementRef;

  constructor(private tagService: TagService) {

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.toLowerCase();
    // Add our tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
      this.tagsOut.emit(this.tags);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.tagsOut.emit(this.tags);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const tag = event.option.viewValue.toLowerCase();
    this.tags.push(tag);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    this.tagsOut.emit(this.tags);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this.tag = this.tagService.tagsActive;
    this.tag
      .subscribe(tags => {
        this.allTags = tags.map(tag => tag.value);
        this.filteredTags = this.tagCtrl.valueChanges.pipe(
          startWith(null),
          map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
    });
  }

}
