import { dashboardWidgets, reports } from "../../../../shared/interface/interface"

export const totalProperty = [
  {
    tag: "Sale",
    total: "1500",
    icon: "assets/images/svg/icon/sold.png",
  },
  {
    tag: "Rented",
    total: "380",
    icon: "assets/images/svg/icon/rent.png",
  },
  {
    tag: "Unlisted",
    total: "240",
    icon: "assets/images/svg/icon/unlisted.png",
  },
]

export const lastMonthData = [
  {
    title: "Paid invoices",
    amount: "$47,215",
    color: "success"
  },
  {
    title: "Open invoices",
    amount: "$5,780",
    color: "danger"
  },
]

export const widgetsData : dashboardWidgets[] = [
  {
    title: "Total projects",
    subTitle: "New users",
    status: "Completed",
    pr: "+ 20%",
    icon: "fab fa-foursquare",
    color: "primary",
    trending: true,
    trending_icon: "trending-up",
  },
  {
    title: "Behance project",
    subTitle: "Users",
    status: "Completed",
    pr: "+ 15%",
    icon: "fab fa-behance",
    color: "warning",
    trending: true,
    trending_icon: "trending-up",
  },
  {
    title: "10,000",
    subTitle: "Agents",
    text: "Coming soon",
    icon: "fab fa-angellist",
    color: "success",
    trending: false,
  },
  {
    title: "36,000",
    subTitle: "New project",
    status: "Monthly",
    pr: "+ 10%",
    icon: "fab fa-cloudscale",
    color: "primary",
    trending: true,
    trending_icon: "trending-up",
  }
]

export const assignessData = [
  {
    name: "Bob Frapples",
    title: "Pumbing",
    img: "assets/images/avatar/1.jpg",
    openData: 10,
    escaletedData: 3,
    completedData: 126,
  },
  {
    name: "Greta Life",
    title: "Pest control",
    img: "assets/images/avatar/3.jpg",
    openData: 8,
    escaletedData: 20,
    completedData: 154,
  },
  {
    name: "Zack Lee",
    title: "others",
    img: "assets/images/avatar/5.jpg",
    openData: 5,
    escaletedData: 18,
    completedData: 79,
  },
  {
    name: "Paige Turner",
    title: "Pest control",
    img: "assets/images/avatar/6.jpg",
    openData: 15,
    escaletedData: 7,
    completedData: 145,
  },
  {
    name: "Mary Goround",
    title: "Pumbing",
    img: "assets/images/avatar/4.jpg",
    openData: 10,
    escaletedData: 3,
    completedData: 126,
  },
]

export const dashboardProperty = [
  {
    title: "Orchard House",
    img: "assets/images/property/14.jpg",
    bed: 3,
    bath: 2,
    room: 1,
    status: "Rented",
    statusColor: "color-4",
  },
  {
    title: "Neverland",
    img: "assets/images/7.jpg",
    bed: 4,
    bath: 4,
    room: 2,
    status: "Rented",
    statusColor: "color-4",
  },
  {
    title: "Sea Breezes",
    img: "assets/images/8.jpg",
    bed: 3,
    bath: 2,
    room: 0,
    status: "Listed",
    statusColor: "color-3",
  },
]

export const managementReportsData : reports[]= [
  {
    from_to_date: "8/10/23 - 15/10/23",
    created_date: "16/10/23",
    img: "assets/images/svg/icon/pdf.png",
  },
  {
    from_to_date: "20/10/23 - 25/10/23",
    created_date: "24/10/23",
    img: "assets/images/svg/icon/microsoft.png",
  },
  {
    from_to_date: "30/10/23 - 5/11/23",
    created_date: "1/11/23",
    img: "assets/images/svg/icon/excel.png",
  },
  {
    from_to_date: "10/11/23 - 15/11/23",
    created_date: "17/11/23",
    img: "assets/images/svg/icon/pdf.png",
  },
  {
    from_to_date: "20/11/23 - 25/11/23",
    created_date: "28/11/23",
    img: "assets/images/svg/icon/excel.png",
  },
]
