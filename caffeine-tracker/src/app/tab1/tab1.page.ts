import { Component, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { ToastController } from '@ionic/angular'
import { InputPromptService } from '../input-prompt.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
@Injectable()
export class Tab1Page {

  constructor( public toastCtrl: ToastController, public alertCtrl: AlertController, 
    public promptService: InputPromptService) {}

    addItem() {
      console.log("Adding an item to list");
      this.promptService.showPrompt();
    }
  }