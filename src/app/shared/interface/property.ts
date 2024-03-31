export interface images {
  img: string;
  icon?: string;
}

export interface list {
  data: string;
}

export interface img {
  url: string;
  fileType: string;
  title?: string;
  description?: string;
}

export interface details {
  data: string;
  svgIcon: string;
}

export interface homeSectionData{
  homeSection: homeSectionSlider[]
}
export interface homeSectionSlider {
  id: number;
  type: string;
  img?: string;
  images?: images[];
  title?: string;
  subTitle?: string;
  buttonText?: string;
  path?: string;
  bad?: number;
  bath?: number;
  sqft?: number;
  price?: number;
}

export interface latestForSaleData{
  latestForSale: latestForSale[]
}

export interface latestForSale {
  id: string;
  title?: string;
  propertyStatus?: string;
  type?: string;
  label?: string[];
  price: number;
  bed?: number;
  bath?: number;
  balcony?: number;
  area?: number;
  url?: string;
  date?: string;
  sale?: boolean;
  fees?: boolean;
  openHouse?: boolean;
  sold?: boolean;
}

export interface featuredPropertyData{
  featuredProperty: featuredProperty[]
}
export interface featuredProperty {
  id: number;
  city: string;
  title: string;
  label?: string;
  price: number;
  description: string;
  bed: string;
  bath: string;
  sqft: string;
  homeType?: string;
  img?: string;
  thumb?: string;
  imgLabel?: string;
  sign?: string;
  type: string;
  tag?: string;
  images? : img[]
}

export interface latestForRentData{
  latestForRent : latestForRent[]
}

export interface latestForRent {
  id: number;
  type: string;
  img: img[];
  thumbnail: string;
  propertyStatus: string;
  country: string;
  title: string;
  price: number;
  details: string;
  home?: string;
  bed: string;
  bath: string;
  sqft: number;
  rooms: number;
  date: string;
  propertyType: string | number;
  agencies: string;
  labels: string[];
  sale?: boolean;
  fees?: boolean;
  openHouse?: boolean;
  sold?: boolean;
  params?:any;
  propertyTab?: number
}

export interface newOfferData{
  newOffer : newOffer[]
}

export interface newOffer {
  id: number;
  type: string;
  img: string;
  heading?: string;
  title?: string;
  desc?: string;
}

export interface propertyCityData{
  property: propertyInCity[]
}

export interface propertyInCity {
  id: number;
  type: string;
  img: string;
  property?: number;
  city: string;
  text?: string;
  colClass?: boolean;
}

export interface bannerData{
  banner: banner[]
}
export interface banner {
  id: number;
  type: string;
  img?: string;
  title: string;
  subTitle?: string;
  desc: string;
  button1Text?: string;
  button2Text?: string;
}

export interface agentsData {
  agents: agents[]
}
export interface agents {
  id: number;
  type: string;
  img: string;
  name: string;
  title: string;
  email: string;
  desc: string;
}

export interface happyClientsData{
  clients: happyClients[]
}

export interface happyClients {
  id: number;
  type: string;
  images: images[];
  desc: string;
  title: string;
  name: string;
  email?: string;
}
export interface brandData{
  brand: brand[]
}
export interface brand {
  id: number;
  type: string;
  img: string;
}

export interface providedServicesData{
  services: providedServices[]
}

export interface providedServices {
  id: number;
  type: string;
  img?: string;
  icon?: string;
  title: string;
  desc: string;
}

export interface pricingPlanData{
  pricingPlan: pricingPlan[]
}

export interface pricingPlan {
  id: number;
  type: string;
  icon: string;
  heading: string;
  desc: string;
  details: list[];
  price: number;
}

export interface latestBlogData{
  latestBlog: latestBlog[]
}

export interface latestBlog {
  id: number;
  type: string;
  img: string;
  date: string;
  month: string;
  city: string;
  title: string;
  desc: string;
  right?: boolean
}

export interface propertyOfDayData{
  propertyOfDay: propertyOfDay[]
}

export interface propertyOfDay {
  id: number;
  type: string;
  images: images[];
  location: string;
  city: string;
  desc: string;
  sqft: string;
  price: number;
  title: string;
}

export interface peopleSayData{
  peopleSay: peopleSay[]
}

export interface peopleSay {
  id: number;
  type: string;
  img: string;
  name: string;
  position: string;
  desc: string;
}

export interface propertySearch {
  id: number;
  heading: string;
  button: boolean;
  listData: list[];
}

export interface markersData {
  position: {
    lat: number;
    lng: number;
  };
  label: {
    color: string;
    text: string;
  };
}

export interface stickTabHome {
  title: string;
  city: string;
  details: details[];
  price: number;
}


export interface propertyBrief{
  desc: string
}


export interface featuresData{
  features: feature[]
}

export interface feature{
  title: string;
  icon: string;
}

export interface propertyDetails{
  title: string;
  data: string;
}

export interface review{
  name: string;
  img: string;
  date: string;
  description: string;
  rating: number;
  right: boolean
}

export interface gridImage{
  url: string;
  fileType: string;
  title: string;
  description: string;
  type: string;
}

export interface parallaxImage{
  url: string;
  fileType?: string;
  title: string;
  description: string;
  right?: boolean;
  type? : string;
}

export interface creative3{
  url: string;
  fileType: string;
  type: string;
  colClass: string;
}

export interface blogDetailsData {
  blogDetails: blogDetails[];
  commentsData: comments[]
}
export interface blogDetails{
  id: number;
  images: img[];
  date: string;
  posted_by: string;
  hits: number;
  comments: number;
  title: string;
  description: description[]
}

export interface description{
  details: string
}

export interface comments{
  name: string;
  img: string;
  date: string;
  description: string;
  right: boolean
}

export interface agencyData {
  agencyData: agency[];
  agentsData: agencyAgent[];
  allAgencyData: agencyAgent[];
}

export interface agency{
  id: number;
  title: string;
  subTitle: string;
  img: string;
  location: string;
  mobile: string;
  email: string;
  link: string;
  property: number;
  aboutAgency: description[]
}

export interface agencyAgent{
  id: number;
  title: string;
  subTitle: string;
  img: string;
  mobile: string;
  email: string;
  fax: string;
  property: number;
}

export interface faqData{
  faq: faq[]
}
export interface faq{
  id: number;
  title: string;
  description: string;
  panelNumber: string
}

export interface termsData{
  terms: termsConditionDetails[]
}

export interface termsConditionDetails {
  title: string;
  value: string;
  details: termsDetails[]
}

export interface termsDetails{
  description: string;
}

export interface privacyData{
  privacy: privacyPolicy[]
}

export interface privacyPolicy {
  title: string;
  value: string;
  details: policyDetails[];
}

export interface policyDetails {
  description: string;
}

export interface agentsDetails {
  agentsProfileDetails: agency[]
}

export interface tagData {
  category: string;
  status: string;
  rooms: string;
  beds: string;
  bath: string;
  agency: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
}

export interface priceFilter{
  minPrice: number;
  maxPrice: number
}

export interface areaFilter{
  minArea: number;
  maxArea: number
}

export interface statusParams{
  status : string
}

export interface categoryParams {
  category: string;
}

export interface roomsParams {
  room: string;
}

export interface bedParams {
  bed: string;
}

export interface bathParams {
  bath: string;
}

export interface agencyParams {
  agency: string;
}

export interface currency{
  name: string;
  currency: string;
  symbol: string;
  price:number
}

export interface slider{
  id: number;
  url: string;
  propertyType: string;
  propertyStatus: string;
}

export interface pagination{
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number,
  endPage: number,
  startIndex: number,
  endIndex: number,
  pages: number[]
}

export interface propertyDetailsData{
  data: detailsData[];
  propertyFilterSlider: img[];
  propertyImages: img[];
  propertyImageSliderHome: img[];
  propertyImageSliderImage: imageSlider[];
  gridImages: gridImages[];
  parallaxImagesData: img[];
  creativePageData: creativePageData[];
  creativePage2Data: creativePage2Data[];
  creativePage3Data: creativePage3Data[]
}

export interface detailsData{
  title: string;
  value: string;
  slugTitle: string;
  details: detailsProperty[]
}

export interface detailsProperty{
  desc?: string;
  features?: feature[];
  url?: string;
  fileType?: string;
  title?: string;
  name?: string;
  img?: string;
  date?: string;
  description?: string;
  rating?: number;
  right?: boolean;
}

export interface features{
  title: string;
  icon: string;
}

export interface imageSlider{
  images: img[]
}

export interface gridImages{
  url: string;
  fileType: string;
  title: string;
  description: string;
  type?: string;
}

export interface creativePageData{
  url: string;
  fileType: string;
  title: string;
  description: string;
  right: boolean
}

export interface creativePage2Data{
  url?: string;
  type?: string;
  title?: string;
  description?: string;
}

export interface creativePage3Data{
  url: string;
  fileType: string;
  type: string;
  colClass: string;
}

export interface sliderData{
  slider: sliderImagesData[]
}

export interface sliderImagesData{
  id: number;
  url: string;
  propertyType: string;
  propertyStatus: string;
}

export interface accountInformation{
  user_name: string;
  mobile: number;
  email: string;
  password: string;
}

export interface addressInformation{
  address: string;
  city: string;
  state: string;
  country: string;
  pin_code: number
}


