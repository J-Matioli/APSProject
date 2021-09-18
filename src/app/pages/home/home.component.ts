import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Denuncia } from 'src/app/models/denuncia';
import { DenunciaService } from 'src/app/services/denuncia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  denuncias: Denuncia[];

  nenhumaDenuncia$:Observable<boolean>

  constructor(private denunciaService: DenunciaService, public toastController: ToastController) { }

  ngOnInit() {

    this.getDenuncias();

    this.nenhumaDenuncia$ = this.denunciaService.getDenuncias().pipe(
      map((data: []) => {
          return !data.length
        })
      )
  }

  apagarDenuncia(id) {
    this.denunciaService.deleteDenuncia(id).subscribe(data => {
      this.presentToast(data.mensagem)
      this.getDenuncias()
    })
  }

  getDenuncias() {
    this.denunciaService.getDenuncias().subscribe((denuncias) => {
      this.denuncias = denuncias
    })
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      color: "success",
      duration: 2000,
      position: 'top',
      animated: true
    });
    toast.present();    
  }

}
