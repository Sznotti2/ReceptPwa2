import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal {
  @Input() title = 'Megerősítés';
  @Input() message = 'Biztos végrehajtod a műveletet?';
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel  = new EventEmitter<void>();

  confirm() { this.onConfirm.emit(); }
  cancel()  { this.onCancel.emit(); }
}
