import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleInputTypeDirective } from './toggle-input-type.directive';

@NgModule({
  declarations: [ToggleInputTypeDirective],
  imports: [CommonModule],
  exports: [ToggleInputTypeDirective],
})
export class PasswordVisibilityToggleModule {}
