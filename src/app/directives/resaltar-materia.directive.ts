import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appResaltarMateria]'
})
export class ResaltarMateriaDirective {

  @Input('appResaltarMateria') cupoMateria: number=0;

  constructor(private el: ElementRef) {
    // el.nativeElement.style.backgroundColor = 'yellow';
   }

   ngOnInit(){
    this.resaltarMateria(this.cupoMateria);
   }

   private resaltarMateria(cupo: number){
    console.log("2", cupo, this.el);
    if(cupo > 20 ){
      this.el.nativeElement.style.backgroundColor = 'orange';
    } else if(cupo > 10){
      console.log("1");
      this.el.nativeElement.style.backgroundColor = 'yellow';
    }  
   }
}
