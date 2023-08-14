import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class productListComponent implements OnInit, OnDestroy{

   private _productService;
   constructor(private productService : ProductService ){
    this._productService = productService;
   }
    pageTitle = "Products List";
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    errorMessage = "";
    sub!: Subscription;
    onRatingClicked(message: string): void{
      this.pageTitle = "Product List: " + message;
    }
private _listFilter: string ="";
filteredProducts: IProduct[] = [];
products: IProduct[] = [];
get listFilter(): string{
  return this._listFilter;
}

set listFilter(value: string){
  this._listFilter = value;
  this.filteredProducts = this.performFilter(this._listFilter);
}

performFilter(filterBy: string): IProduct[]{
  filterBy = filterBy.toLocaleLowerCase();
  return this.products.filter((product: IProduct) => 
  product.productName.toLocaleLowerCase().includes(filterBy));
}

    
    toggleImage() : void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
          this.sub = this.productService.getProducts().subscribe({
          next: products =>{
            this.products = products;
            this.filteredProducts = this.products;
          } ,
          error: err => this.errorMessage = err
        })
        console.log("In OnInit");
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }
}