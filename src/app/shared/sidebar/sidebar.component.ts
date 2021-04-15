import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  
  /*
    get historial() es de la propiedad de esta clase SidebarComponent
    lo cual sirve para modificar el html 
  */
  get historial(){
    return this.gifsService.historial; //este es del servicio
  }

  constructor(private gifsService: GifsService){}

}
