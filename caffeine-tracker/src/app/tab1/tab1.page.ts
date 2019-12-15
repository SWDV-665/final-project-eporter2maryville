import { Component, Injectable, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { InputPromptService } from '../input-prompt.service';
import { DatabaseService, Caf } from '../database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
@Injectable()
export class Tab1Page implements OnInit {

  caffeineLog: Caf[] = [];

  caffeine = {};

  constructor( public toastCtrl: ToastController, 
    public alertCtrl: AlertController, 
    public promptService: InputPromptService,
    private db:DatabaseService,
    ) {}

   
    ngOnInit(){
      this.db.getDatabaseState().subscribe(ready => {
        if (ready){}
        this.db.getCafs().subscribe(cafs => {
          console.log('Getting Caffeine Log');
          this.caffeineLog = cafs;
        });
      });
    }

    addItemSQL(productType,productName,caffeineAmount,date) {
      console.log("Adding an item to list and SQLite db");
      this.promptService.sqlAddPrompt(productType, productName,caffeineAmount,date);
    }

    addItem(item) {
      console.log("Adding an item to list and SQLite db");
      this.promptService.showPrompt(item);
    }

    addCaffeineLog() {
      this.db.addCaffeineLog(this.caffeine['productType'], this.caffeine['productName'], 
      this.caffeine['caffeineAmount'], this.caffeine['date'])
      .then(_ => {
        this.caffeine = {};
      });
    }
  }