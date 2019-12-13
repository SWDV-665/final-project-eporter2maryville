import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CaffeineLogChangeService } from './caffeine-log-change.service';

/** Service for modal inputs info. To be replaced with on screen options for add at a later date 
 * (see Tab1 commented out code) */

@Injectable({
  providedIn: 'root'
})
export class InputPromptService {

  constructor(public logService: CaffeineLogChangeService, public alertCtrl:AlertController) {
    console.log('Hello InputDialogServiceProvider Provider')
   }

  async showPrompt(item?, index?) {
    const prompt = this.alertCtrl.create({
      header: item ? "Edit Item" : "Add Item",
      message: item ? "Please update the product type, name, or mg of caffeine you consumed:" : "Please enter the product type, name, and mg of caffeine you consumed:",
      inputs: [
        {
          name: 'productType',
          placeholder: 'Coffee',
          value: item ? item.productType : null
        },
        {
          name: 'productName',
          placeholder: 'Flat White',
          value: item ? item.productName : null
        },
        {
          name: 'caffeineAmount',
          placeholder: '85',
          value: item ? item.caffeineAmount : null
        },
      ],
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
            if (index !== undefined) {
              this.logService.editItem(item, index);
            }
            else {
              this.logService.addItem(item);
            }
          }
        }
      ]
    });
    (await prompt).present();
  }
}