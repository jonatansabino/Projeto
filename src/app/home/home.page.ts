import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  weight: number;
  height: number;
  
  constructor(private toastController: ToastController) {}

  isFormValid() {
    return !(this.weight && this.height && this.weight > 0 && this.height > 0);
  }

  ImcCalcular(IMC: number){
    if (IMC < 18.5){
      return 'Abaixo do Peso';
    } else if (IMC < 25){
      return 'Normal';
    } else if (IMC < 30) {
      return 'Sobrepeso';
    } else if (IMC < 40){
      return 'Odesidade';
    } else {
      return 'Odesidade Grave';
    }
  }

  onCalcular(){
    const IMC = this.weight / (this.height * this.height);
    const peso = this.ImcCalcular(IMC);
    this.showMessage(`IMC = ${IMC.toFixed(2)}   -   ${peso}`)
  }

  async showMessage(msg: string){
    const previousToast = await this.toastController.getTop();
    if (previousToast){
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create({
      message: msg,
      color: 'tertiary',
      buttons: [
        {
          icon: 'close'
        }
      ]
    });

    toast.present();
  }
}
