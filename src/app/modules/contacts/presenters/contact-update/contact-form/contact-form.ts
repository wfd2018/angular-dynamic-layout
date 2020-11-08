import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { Contact } from '../../../models/contact.model';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.html'
})
export class ContactForm implements OnInit {

  @Input()  entity: Contact;
  @Output() save = new EventEmitter<Contact>();

  form = this.formBuilder.group({
    id:       ['', [Validators.required]],
    name:     ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    jobTitle: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form.patchValue(this.entity || {});
  }

  resetForm(): void {
    this.form.reset();
  }

  saveEntity(): void {
    if (this.form.valid) {
      this.entity = this.form.getRawValue();
      this.save.emit(this.entity);
    }
  }
}
