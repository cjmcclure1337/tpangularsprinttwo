import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../exchange.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  
  prices: {name: string, price: number}[] = [];

  displayedColumns: string[] = ['name', 'price', 'buy'];

  message: string = "";

  constructor(public exchange: ExchangeService) { }

  ngOnInit(): void {
    this.updatePrices();
  }

  updatePrices(): void {
    this.exchange.calculatePrices();
    this.prices = this.exchange.currentPrices;
    console.log("Updated Prices: ", this.prices);
  }

  buyStock(myStock: string, quantity: number): void {
    if (!quantity) quantity = 1;
    this.message = this.exchange.buyStock(myStock, quantity)
  }

}
