import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../exchange.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  portfolio: { name: string, purchasePrice: number, quantity: number, currentPrice: number}[] = [];

  displayedColumns: string[] = ['name', 'quantity', "purchasePrice", "currentPrice", "gainLoss", "sell"];

  message: string = "";

  constructor(public exchange: ExchangeService) { }

  ngOnInit(): void {
    this.updatePortfolio();
  }

  updatePortfolio(): void {
    this.exchange.calculatePrices();
    this.mapPortfolio();
  }

  mapPortfolio(): void {
    this.portfolio = [];

    this.exchange.currentPortfolio.map((myStock) => {
      this.portfolio.push({
        name: myStock.name,
        purchasePrice: myStock.purchasePrice,
        quantity: myStock.quantity,
        currentPrice: this.exchange.currentPrices.filter((stock) => stock.name === myStock.name)[0].price
      })
  })
  }
  
  sellStock(index: number, quantity: number) {
    this.message = this.exchange.sellStock(index, quantity);

    this.mapPortfolio();
  }

}
