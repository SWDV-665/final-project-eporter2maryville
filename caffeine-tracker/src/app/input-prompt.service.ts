import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CaffeineLogChangeService } from './caffeine-log-change.service';
import { DatabaseService, Caf } from './database.service';

/** Service for modal inputs info. To be replaced with on screen options for add at a later date 
 * (see Tab1 commented out code) */

@Injectable({
  providedIn: 'root'
})
export class InputPromptService {

  constructor(public logService: CaffeineLogChangeService, 
    private db:DatabaseService, 
    public alertCtrl:AlertController) {
    console.log('Hello InputDialogServiceProvider Provider')
   }

  async showPrompt(item?, index?) {
    const prompt = this.alertCtrl.create({
      header: item ? "Edit Item" : "Add Item",
      message: item ? "Please update the product type, name, mg of caffeine, or date:" : "Please enter the product type, name, mg of caffeine you consumed, and date:",
      inputs: [
        {
          name: 'productType',
          placeholder: ' Product Type: Coffee',
          value: item ? item.productType : null
        },
        {
          name: 'productName',
          placeholder: 'Product Name: Flat White',
          value: item ? item.productName : null
        },
        {
          name: 'caffeineAmount',
          placeholder: 'Caffeine Amount in mg: 85',
          value: item ? item.caffeineAmount : null
        },
        {
          name: 'date',
          type: 'date',
          placeholder: 'Date: YYYY-MM-DD',
          value: item ? item.date : null
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
  async sqlAddPrompt(productType, productName, caffeineAmount, date) {
    const prompt = this.alertCtrl.create({
      header: "Add Item",
      message: "Please enter the product type, name, mg of caffeine, and date:",
      inputs: [
        {
          name: 'productType',
          placeholder: ' Product Type: Coffee',
          value: null
        },
        {
          name: 'productName',
          placeholder: 'Product Name: Flat White',
          value: null
        },
        {
          name: 'caffeineAmount',
          placeholder: 'Caffeine Amount in mg: 85',
          value: null
        },
        {
          name: 'date',
          type: 'date',
          placeholder: 'Date: YYYY-MM-DD',
          value: null
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
            console.log('Save Clicked', item);
            {
              this.db.addCaffeineLog(productType, productName, caffeineAmount, date);
            }
          }
        }
      ]
    });
    (await prompt).present();
  }
}