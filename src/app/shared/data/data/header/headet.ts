import { attachment, message, notification } from "../../../../shared/interface/interface"

export const attachmentData : attachment[] = [
  {
    title: 'Doc_file.doc',
    size: '800MB',
    icon: 'fas fa-file-word',
    color: 'success',
    path: '',
  },
  {
    title: 'Apartment.jpg',
    size: '500kb',
    icon: 'fas fa-file-image',
    color: 'primary',
    path: '',
  },
  {
    title: 'villa_report.pdf',
    size: '26MB',
    icon: 'fas fa-file-pdf',
    color: 'warning',
    path: '',
  }
]

export const notificationData : notification[] = [
  {
    title: "Item damaged",
    subTitle: '"the table is broken:("',
    time: "8 hours ago, Tadawis 24",
    icon: "fab fa-xbox",
    color: "primary",
    reply: true,
    img : [
      {
        url: "assets/images/about/4.jpg",
        fileType: "image",
      }
    ]
  },
  {
    title: "Payment received",
    time: "2 hours ago, Bracka 15",
    icon: "fas fa-file-invoice-dollar",
    color: "success",
    reply: false,
    img : [
      {
        url: "assets/images/about/1.jpg",
        fileType: "image",
      },
      {
        url: "assets/images/about/2.jpg",
        fileType: "image",
      },
      {
        url: "assets/images/about/3.jpg",
        fileType: "image",
      }
    ]
  },
  {
    title: "New inquiry",
    subTitle: '"is the villa still available?"',
    time: "1 Days ago, Krowada 7",
    icon: "fas fa-comment-dots",
    color: "warning",
    reply: true,
    img : [
      {
        url: "assets/images/about/2.jpg",
        fileType: "image",
      },
      {
        url: "assets/images/about/3.jpg",
        fileType: "image",
      }
    ]
  },
]

export const messageData : message[] = [
  {
    name: "Bob Frapples",
    message: "Template Represents simply...",
    status: "online",
    img: "assets/images/avatar/1.jpg",
    path: "",
  },
  {
    name: "Greta Life",
    message: "Template Represents simply...",
    status: "away",
    img: "assets/images/avatar/3.jpg",
    path: "",
  },
  {
    name: "Greta Life",
    message: "Template Represents simply...",
    status: "online",
    img: "assets/images/avatar/4.jpg",
    path: "",
  },
  {
    name: "Greta Life",
    message: "Template Represents simply...",
    status: "busy",
    img: "assets/images/avatar/7.jpg",
    path: "",
  }
]
