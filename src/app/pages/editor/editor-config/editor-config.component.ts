import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditorService } from '../../../services/editor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editor-config',
  templateUrl: './editor-config.component.html',
  styleUrls: ['./editor-config.component.css']
})
export class EditorConfigComponent implements OnInit {

  userId;
  editor;
  age = new FormControl('', Validators.required);
  occupation = new FormControl('', Validators.required);
  position = new FormControl('', Validators.required);
  reg_url = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  dataEditorForm = new FormGroup({
    age: this.age,
    occupation: this.occupation,
    position: this.position,
    description: new FormControl(),
    description_long: new FormControl(),
    facebook: new FormControl('', Validators.pattern(this.reg_url)),
    twitter: new FormControl('', Validators.pattern(this.reg_url)),
    linkedin: new FormControl('', Validators.pattern(this.reg_url))
  });

  constructor(private route: ActivatedRoute, private editorService: EditorService, private toastr: ToastrService) { }

  dataEditor(form) {
    const data = {
      updateAt: Date(),
      age: form.age,
      occupation: form.occupation,
      position: form.position,
      description: form.description,
      description_long: form.description_long,
      social: {
        facebook: form.facebook,
        twitter: form.twitter,
        linkedin: form.linkedin
      },
    };
    this.editorService.updateEditor(this.userId, data)
      .then(() => this.toastr.success('Guardado!', 'Piensa digital'))
      .catch((e) => this.toastr.error('Error:' + e, 'Piensa digital'));
  }


  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe(params => this.userId = params.id);
    }
    this.editor = this.editorService.getEditor(this.userId);
    this.editor.subscribe(editor => {
      this.dataEditorForm.get('age').setValue(editor.age);
      this.dataEditorForm.get('occupation').setValue(editor.occupation);
      this.dataEditorForm.get('position').setValue(editor.position);
      this.dataEditorForm.get('description').setValue(editor.description);
      this.dataEditorForm.get('description_long').setValue(editor.description_long);
      this.dataEditorForm.get('facebook').setValue(editor.social ? editor.social.facebook : '');
      this.dataEditorForm.get('twitter').setValue(editor.social ? editor.social.twitter : '');
      this.dataEditorForm.get('linkedin').setValue(editor.social ? editor.social.linkedin : '');
      // this.image = post.image;
      // setTimeout(() => {
      //   this.imageCrop.getImage(post.image);
      // }, 100);
    });
  }

  changeAge(event): void {
    this.dataEditorForm.get('age').setValue(event);
  }

  changeOccupation(event): void {
    this.dataEditorForm.get('occupation').setValue(event);
  }

  changePosition(event): void {
    this.dataEditorForm.get('position').setValue(event);
  }

}
