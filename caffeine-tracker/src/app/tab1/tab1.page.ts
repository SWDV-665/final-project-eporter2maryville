import { Component, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
@Injectable()
export class Tab1Page {

  constructor( public toastCtrl: ToastController, public alertCtrl: AlertController) {}

  caffeineEntry = [
    {
      productType: '',
      productName: '',
      caffeineAmount: '',
    },
  ];

  caffeineLog = []

  addItem() {
    console.log("Adding an item to list, "+this.caffeineEntry);
    this.caffeineEntry.push();
    
  }

}
    /**this.showAddItemPrompt();
  }
  
  async showAddItemPrompt() {
    const popup = this.alertCtrl.create({
      message: "Are you sure you want to add this item to your log?",

      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log("Cancel Clicked");
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved Clicked', item);
            this.caffeineLog.push(item);
          }
        }
      ]
    });
    (await popup).present()*/
