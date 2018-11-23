import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  title = "Grocery";

  items = [
    {
      name: "Milk",
      quantity: 3    
    },
    {
      name: "Bread",
      quantity: 6    
    },
    {
      name: "Eggs",
      quantity: 12    
    },
  ];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public socialSharing: SocialSharing) {

  }
  
  shareItem(item, index) {
    console.log("Share Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'sharing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.showshareItemPrompt(item, index);
  }  
 
  showshareItemPrompt(item,index) {
    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared successfully!");
    }).catch((error) => {
      console.error("Error while sharing ", error);
    });  

  }
  
  editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.showEditItemPrompt(item, index);
  }  

  showEditItemPrompt(item, index) {
    const prompt = this.alertCtrl.create({
      title: 'Edit Item',
      message: "Please edit item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item.name
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item.quantity
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item);
            this.items[index] = item;
          }
        }
      ]
    });
    prompt.present();
  }  
  
  removeItem(item, index) {
    console.log("Removing Item - ", item);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + item.name + " ...",
      duration: 3000
    });
    toast.present();

    this.items.splice(index, 1);
  }

  addItem() {
    console.log("Adding Item");
    this.showAddItemPrompt();
  }

  showAddItemPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add Item',
      message: "Please enter item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item);
            this.items.push(item);
          }
        }
      ]
    });
    prompt.present();
  }
}

