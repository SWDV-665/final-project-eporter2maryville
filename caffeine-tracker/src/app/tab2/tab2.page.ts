import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tab1Page } from '../tab1/tab1.page';
import { CaffeineLogChangeService } from '../caffeine-log-change.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { InputPromptService } from '../input-prompt.service';
import { DatabaseService, Dev } from '../database.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(public logService: CaffeineLogChangeService, private SocialSharing: SocialSharing, 
    public toastCtrl: ToastController, public alertCtrl: AlertController, public promptService: InputPromptService,
    private db:DatabaseService, ) {}

    caffeineEntry: Dev[] = [];

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
  

  loadItems() {
    return this.logService.getItems();
  }

  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + index + " ...",
      duration: 3000
    });
    (await toast).present();
    this.logService.removeItem(index);

  }

  async shareItem(item, index) {
    console.log("Sharing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + index + " ...",
      duration: 3000
    });
    (await toast).present();

    let message = "Today I had a  " + item.productName + " with " + item.caffeineAmount + " mg caffeine!";
    let subject = "Check out this caffeinated product I had!"
    this.SocialSharing.share(message, subject).then(() => {
      //sharing via email is possible
      console.log("Sharing Successful!")
    }).catch(() =>{
      //sharing via email is not possible
      console.error("Sharing Failed!");
    });

  }

  async editItem(item, index) {
    console.log("Editing an Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    (await toast).present(),
      this.promptService.showPrompt(item, index);

  }

  addItem() {
    console.log("Adding an item to list");
    this.promptService.showPrompt();
  }

}
