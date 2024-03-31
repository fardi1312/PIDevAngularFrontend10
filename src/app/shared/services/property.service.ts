import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { agencyData, agentsData, agentsDetails, bannerData, blogDetailsData, brandData, currency, faqData, featuredPropertyData, happyClientsData, homeSectionData, latestBlogData, latestForRent, latestForRentData, latestForSale, latestForSaleData, newOfferData, peopleSayData, pricingPlanData, privacyData, propertyCityData, propertyOfDayData, providedServicesData, sliderData, termsData } from '../interface/property';

@Injectable({
  providedIn: 'root',
})

export class PropertyService {

  // Get Currency
  public currencyItem :any = localStorage.getItem('currency');
  public currency : currency = JSON.parse(this.currencyItem)

  public Currency = this.currency || { name: 'Dollar', currency: 'USD',symbol: "$", price: 1 }

  constructor(private http: HttpClient) {}

  // Home Slider Data
  homeSliderData(): Observable<homeSectionData> {
    return this.http.get<homeSectionData>('assets/data/home-section-slider.json');
  }

  // Latest For Sale
  propertyData(): Observable<latestForSaleData> {
    return this.http.get<latestForSaleData>('assets/data/latest-for-sale.json');
  }

  // Featured Property Data
  featuredPropertyData(): Observable<featuredPropertyData> {
    return this.http.get<featuredPropertyData>('assets/data/featured-property.json');
  }

  // Latest For Rent
  latestForRentData(): Observable<latestForRentData> {
    return this.http.get<latestForRentData>('assets/data/latest-for-rent.json');
  }

  // New Offer Data
  newOfferData(): Observable<newOfferData> {
    return this.http.get<newOfferData>('assets/data/new-offer.json');
  }

  // Property In City
  propertyInCityData(): Observable<propertyCityData> {
    return this.http.get<propertyCityData>('assets/data/property-in-city.json');
  }

  // Banner
  bannerData(): Observable<bannerData> {
    return this.http.get<bannerData>('assets/data/banner.json');
  }

  // Agents Data
  agentsData(): Observable<agentsData> {
    return this.http.get<agentsData>('assets/data/agents.json');
  }

  // Happy Clients Data
  happyClientsData(): Observable<happyClientsData> {
    return this.http.get<happyClientsData>('assets/data/happy-clients.json');
  }

  // Brand Data
  brandData(): Observable<brandData> {
    return this.http.get<brandData>('assets/data/brand.json');
  }

  // Provided Services
  providesServices(): Observable<providedServicesData> {
    return this.http.get<providedServicesData>('assets/data/provided-services.json');
  }

  // Pricing Plan
  pricingPlanData(): Observable<pricingPlanData> {
    return this.http.get<pricingPlanData>('assets/data/pricing-plan.json');
  }

  // Latest Blog
  latestBlogData(): Observable<latestBlogData> {
    return this.http.get<latestBlogData>('assets/data/latest-blog.json');
  }

  // Property Of Day
  propertyOfDayData(): Observable<propertyOfDayData> {
    return this.http.get<propertyOfDayData>('assets/data/property-of-day.json');
  }

  // People Say
  peopleSayData(): Observable<peopleSayData> {
    return this.http.get<peopleSayData>('assets/data/people-say.json');
  }

  // Property Details
  propertyDetailsData(): Observable<any> {
    return this.http.get<any>('assets/data/property-details.json');
  }

  // Blog DetailsData
  blogDetailsData(): Observable<blogDetailsData> {
    return this.http.get<blogDetailsData>('assets/data/blog-details.json');
  }

  // Agency Data
  agencyData(): Observable<agencyData> {
    return this.http.get<agencyData>('assets/data/agency.json');
  }

  // FAQ Data
  faqData(): Observable<faqData> {
    return this.http.get<faqData>('assets/data/faq.json');
  }

  // Terms Condition Data
  termsConditionData(): Observable<termsData> {
    return this.http.get<termsData>('assets/data/terms-condition.json');
  }

  // Privacy Policy Data
  privacyPolicyData(): Observable<privacyData> {
    return this.http.get<privacyData>('assets/data/privacy-policy.json');
  }

  // Agents Details Data
  agentsDetailsData(): Observable<agentsDetails> {
    return this.http.get<agentsDetails>('assets/data/agents-data.json');
  }

  // Slider Data For Image Content Page
  public getSliderData(): Observable<sliderData>{
    return this.http.get<sliderData>('assets/data/slider.json')
  }

  // Filter Property



 

  // Get Property Details
  


  // Pagination
  public getPager(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 6
  ) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage < paginateRange - 1) {
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }
}
