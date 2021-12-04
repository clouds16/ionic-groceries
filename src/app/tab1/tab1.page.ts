import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

})
export class Tab1Page {
  title = 'Grocery Items';
  items = [
    {
      name:'eggs',
      quantity: 12,
    },
    {
      name: 'cereal',
      quantity: 2,
    },

  ];

  constructor(public toastController: ToastController, public alertController: AlertController, public socialSharing: SocialSharing ) {}

  //Add function
  async addItem( data ){
    const toast = await this.toastController.create({
      message: `Adding Item: ${data.name}`,
      duration: 2000
    });
    toast.present();
    this.items.push(data)
  }
  //Delete function
  async removeItem(item,index){
    const toast = await this.toastController.create({
      message: `Removing item: ${item.name}`,
      duration: 2000
    });
    this.items.splice(index,1);
    toast.present();
  };

  //Update function
  async editItem(item,index){
    const toast = await this.toastController.create({
      message: `Editing item: ${item.name}`,
      duration: 2000
    });
    this.editAlertPrompt(item,index);
    toast.present();
  };


  //Share item function
  async shareItem(item,index){
    const toast = await this.toastController.create({
      message: `Sharing item: ${item.name}`,
      duration: 2000
    });
    toast.present();

    let message ='Item - Name : ' + item.name  + 'Quantity: ' + item.quantity;
    let subject = 'Posted via Groceries app';

  this.socialSharing.share(message,subject).then(() => {
    console.log('Success');
    }).catch((error) => {
    console.log('Error',error);
    });
  };

  

  

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Please Enter an Item',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Item'
        },
        {
          name: 'quantity',
          type: 'text',
          id: 'item-id',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: data=> {
            console.log('Confirm Cancel',data);
          }
        }, {
          text: 'save',
          handler: data => {
            this.addItem(data);
          }
        }
      ]
    });

    await alert.present();
  }



  async editAlertPrompt(item,index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit Your Item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Item',
          value: item.name
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value:item.quantity
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: data=> {
            console.log('Confirm Cancel',item.name);
          }
        }, {
          text: 'save',
          handler: item=> {
            console.log('Confirm Ok',item);
            this.items[index] = item;
          }
        }
      ]
    });

    await alert.present();
  }
};

