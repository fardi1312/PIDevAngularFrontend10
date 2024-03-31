import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
  items?: Menu[]
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  megaMenu?: boolean;
  image?: string;
  active?: boolean;
  badge?: boolean;
  badgeText?: string;
  badgeIcon?: boolean;
  children?: Menu[];
  level?: number;
  section?: Menu[]
  right?: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class NavService {

  constructor() {}

  public MENUITEMS: Menu[] = [
    {
      title: 'home',
      icon: 'home',
      type: 'sub',
      active: false,
      level: 1,
      children: [
        {
          title: 'classic',
          path: '/theme/slider-filter-search/theme/classic',
          type: 'link',
          badge: true,
          badgeText: 'New',
        },
        {
          title: 'morden video',
          path: '/theme/slider-filter-search/theme/morden-video',
          type: 'link',
        },
       
        
      ],
    },
    {
      title: 'service',
      icon: 'clipboard',
      type: 'sub',
      level: 1,
      active: false,
      children: [
        
         
        {
          title: 'Carpooling offers',
          type: 'sub',
          active: false,
          level: 2,
          children: [
            
            {
              title: 'ask',
              path: '/theme/slider-filter-search/agent/agent-list',
              type: 'link',
              level: 2,
            },
            {
              title: 'add',
              path: '/theme/slider-filter-search/agent/submit-property',
              type: 'link',
              level: 2,
            },
          ],
        },
        {
          title: 'Collocation offers',
          type: 'sub',
          active: false,
          level: 2,
          children: [
            {
              title: 'ask',
              path: '/theme/slider-filter-search/listing/list-view/thumbnail-image',
              type: 'link',
              level: 3,
            },
            {
              title: 'add',
              path: '/theme/slider-filter-search/agent/submit-property',
              type: 'link',
              level: 3,
            },
           
          ],
        },
      ],
    },
    {
      title: 'charity',
      icon: 'link',
      type: 'sub',
      active: false,
      children: [
        {
          title: 'football',
          path: '/theme/slider-filter-search/property/modal-details',
          type: 'link',
        },
        {
          title: 'taxi',
          path: '/theme/slider-filter-search/property/info-tab',
          type: 'link',
        },
        {
          title: 'camping',
          path: '/theme/slider-filter-search/property/left-sidebar',
          type: 'link',
        },
       
      ],
    },
    
    
    {
      title: 'subscription',
      icon: 'user',
      active: false,
      right: true,
      level: 1,
      type: 'sub',
      children: [
        {
          title: 'plans and prices',
          path: '0/agent/agent-profile',
          type: 'link',
        },
        {
          title: ' registration',
          path: '/theme/slider-filter-search/agent/agent-grid',
          type: 'link',
        },
        
      ],
    },
    {
      title: 'contact',
      icon: 'map-pin',
      active: false,
      right: true,
      type: 'sub',
      level: 1,
      children: [
        {
          title: 'Contact us 1',
          path: '/theme/slider-filter-search/contact/contact-1',
          type: 'link',
        },
        {
          title: 'Contact us 2',
          path: '/theme/slider-filter-search/contact/contact-2',
          type: 'link',
        },
       
      ],
    },
  ];

  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}



