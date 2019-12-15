import { Component, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { InputPromptService } from '../input-prompt.service';
import { DatabaseService, Dev } from '../database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
@Injectable()
export class Tab1Page {

  caffeineLog: Dev[] = [];

  caffeine = {};

  constructor( public toastCtrl: ToastController, 
    public alertCtrl: AlertController, 
    public promptService: InputPromptService,
    private db:DatabaseService,
    ) {}

    addItem(productType,productName,caffeineAmount,date) {
      console.log("Adding an item to list");
      this.promptService.sqlAddPrompt(productType, productName,caffeineAmount,date);
    }
    ngOnInit(){
      this.db.getDatabaseState().subscribe(ready => {
        if (ready){}
        this.db.getCaffeine_log().subscribe(devs => {
          console.log('Getting Caffeine Log');
          this.caffeineLog = devs;
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
  }