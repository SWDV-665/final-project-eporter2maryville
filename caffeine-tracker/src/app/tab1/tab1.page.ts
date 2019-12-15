import { Component, Injectable, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { InputPromptService } from '../input-prompt.service'
import { DatabaseService, Dev } from '../database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
@Injectable()
export class Tab1Page {

  constructor( public toastCtrl: ToastController, public alertCtrl: AlertController, 
    public promptService: InputPromptService, private db:DatabaseService) {}

    caffeineEntry: Dev[] = [];

    ngOnInit(){
      this.db.getDatabaseState().subscribe(ready => {
        if (ready){}
        this.db.getCaffeine_log().subscribe(devs => {
          this.caffeineEntry = devs;
        });
      });
    }

    addItem(productName,productType,caffeineAmount,date) {
      console.log("Adding an item to list");
      this.promptService.showPromptAdd(productName,productType,caffeineAmount,date);
    }
  }