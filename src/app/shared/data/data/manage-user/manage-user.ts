import { recentPropertyData, steps } from "../../../../shared/interface/interface";

export const projectMeetings =  [
  {
    url: "assets/images/avatar/6.jpg",
    fileType: "image"
  },
  {
    url: "assets/images/avatar/5.jpg",
    fileType: "image"
  },
  {
    url: "assets/images/avatar/9.jpg",
    fileType: "image"
  },
  {
    url: "assets/images/avatar/7.jpg",
    fileType: "image"
  },
  {
    url: "assets/images/avatar/9.jpg",
    fileType: "image"
  },
]

export const friends = [
  {
    name: "Bob",
    url: "assets/images/avatar/9.jpg",
  },
  {
    name: "Greta",
    url: "assets/images/avatar/8.jpg",
  },
  {
    name: "Zack",
    url: "assets/images/avatar/5.jpg",
  },
  {
    name: "Paige",
    url: "assets/images/avatar/6.jpg",
  },
  {
    name: "Mary",
    url: "assets/images/avatar/7.jpg",
  },
  {
    name: "Vella",
    url: "assets/images/avatar/1.jpg",
  },
]


export const recentProperty : recentPropertyData[]= [
  {
    name: "Orchard House",
    city: "Brazil",
    rate: "$5800",
    deposit: "$400",
    start_date: "Jan, 18 2023",
    url: "assets/images/property/4.jpg"
  },
  {
    name: "Neverland",
    city: "France",
    rate: "$8700",
    deposit: "$850",
    start_date: "Mar, 25 2023",
    url: "assets/images/property/2.jpg"
  },
  {
    name: "Sea Breezes",
    city: "USA",
    rate: "$5880",
    deposit: "$380",
    start_date: "Jun, 05 2023",
    url: "assets/images/property/3.jpg",
    margin: true
  }
]

export const followingData = [
  {
    name: "Bob Frapples",
    url: "assets/images/avatar/2.jpg",
    email: "bobf@gmail.com",
    status: "online",
  },
  {
    name: "Greta Life",
    url: "assets/images/avatar/3.jpg",
    email: "gretali@gmail.com",
    status: "busy",
  },
  {
    name: "Zack Lee",
    url: "assets/images/avatar/4.jpg",
    email: "zack@gmail.com",
    status: "away",
  },
  {
    name: "Zack Lee",
    url: "assets/images/avatar/5.jpg",
    email: "zack@gmail.com",
    status: "busy",
  },
]



export const stepsData : steps[] = [
  {
    id: 1,
    title: 'Get started',
    subTitle: 'Account information',
    stepNumber: 1,
    disabled: false
  },
  {
    id: 2,
    title: 'Login Details',
    subTitle: 'Set your email',
    stepNumber: 2,
    disabled: false
  },
  {
    id: 3,
    title: 'Upload files',
    subTitle: 'Successfully submitted',
    stepNumber: 3,
    disabled: false
  },
];
