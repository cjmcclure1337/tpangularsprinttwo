import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  currentPrices: { name: string, price: number }[] = [];

  currentPortfolio: { name: string, purchasePrice: number, quantity: number}[] = [];

  constructor() { 
    this.currentPrices = [
      {name: "GNNT", price: 124.21},
      {name: "TPTH", price: 97.49},
      {name: "BTC", price: 24506.63}
    ];

    this.currentPortfolio = [
      {name: "GNNT", purchasePrice: 131.94, quantity: 2},
      {name: "TPTH", purchasePrice: 89.38, quantity: 3},
      {name: "BTC", purchasePrice:18506.63, quantity: 1}
    ];
  }

  calculatePrices() {
    this.currentPrices = this.currentPrices.map((element) => {
      element.price = element.price * ((Math.random()/5 - .1) + 1);
      if(element.price <= 0) {
        element.price = .01;
      }
      return {name: element.name, price: Math.round(element.price * 100)/100}
    })
    }

  buyStock(myStock: string, quantity: number): string {
    let currentPrice: number = this.currentPrices.filter((stock) => stock.name === myStock)[0].price

    this.currentPortfolio.push({
      name: myStock,
      quantity: quantity,
      purchasePrice: currentPrice
    })

    return "You just bought " + quantity + " share of " + myStock + " at " + currentPrice + " for a total of " + (quantity * currentPrice);
   }

  sellStock(index: number, quantity: number): string {
    let removed = this.currentPortfolio[index];
    let message = "";

    if(quantity > removed.quantity) return "You do not own that much stock";

    let currentPrice = this.currentPrices.filter((stock) => stock.name === this.currentPortfolio[index].name)[0].price

    message = "You have sold " + quantity + " shares of " + this.currentPortfolio[index].name + " at $" + currentPrice + " for a total of $" + (quantity * currentPrice);

    if(quantity < removed.quantity) {
      this.currentPortfolio[index].quantity -= quantity;
      return message;
    }

    this.currentPortfolio = this.currentPortfolio.filter((x,i) => i != index);
    return message;

   }
}
