import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive ({
    selector : '[dropdowndirective]'
})

export class DropdownDirective {
 @HostBinding ('class.open') toggleDropdown = false;


 @HostListener ('click') toggleOpen() {
    this.toggleDropdown = !this.toggleDropdown;
 }
}