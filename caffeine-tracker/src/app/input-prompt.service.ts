import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CaffeineLogChangeService } from './caffeine-log-change.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService, Dev } from './database.service';

/** Service for modal inputs info. To be replaced with on screen options for add at a later date 
 * (see Tab1 commented out code) */

@Injectable({
  providedIn: 'root'
})
export class InputPromptService {

  constructor(public logService: CaffeineLogChangeService, public alertCtrl:AlertController, private db:DatabaseService) {
    console.log('Hello InputDialogServiceProvider Provider')
   }

   caffeineEntry: Dev[] = [];

    caffeineEntry2: Observable<any>;

    caffeine = {}

    ngOnInit(){
      this.db.getDatabaseState().subscribe(ready => {
        if (ready){}
        this.db.getCaffeine_log().subscribe(devs => {
          this.caffeineEntry = devs;
        });
      });
    }
    addCaffeineLog() {
      this.db.addCaffeineLog(this.caffeine['productType'], this.caffeine['productName'], 
      this.caffeine['caffeineAmount'], this.caffeine['date'])
      .then(_ => {
        this.caffeine = {};
      });
    }

  async showPromptEdit(item?, index?) {
    const prompt = this.alertCtrl.create({
      header: "Edit Item",
      message: "Please update the product type, name, mg of caffeine, or date:",
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
          type: 'number',
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
              this.logService.editItem(item, index),
              this.db.updateCaffeineLog(item);
          }
        }
      ]
    });
    (await prompt).present();
  }
  async showPromptAdd(productType, productName, caffeineAmount, date) {
    const prompt = this.alertCtrl.create({
      header: "Add Item",
      message: "Please enter the product type, name, mg of caffeine you consumed, and date:",
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
          type: 'number',
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
            console.log('Saved Clicked', item);
              this.db.addCaffeineLog(productName, productType, caffeineAmount, date);
            
          }
        }
      ]
    });
    (await prompt).present();
  }
}