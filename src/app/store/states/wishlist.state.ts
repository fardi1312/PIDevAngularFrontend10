import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ToastrService } from "ngx-toastr";
import { latestForRent } from "../../interface/property";
import { addWishlistItem, getWishlistData, removeWishlistItem } from "../actions/wishlist.action";

export class wishlistModel {
  data: {
    wishlist : latestForRent[];
  }
}


@State<wishlistModel>({
  name: 'wishlist',
  defaults: {
    data: {
      wishlist: [],
    },
  },
})

@Injectable()
export class wishlistState {

  constructor(private toastr: ToastrService) {}

  @Selector()
  static getWishListData(state: wishlistModel) {
    return state.data.wishlist;
  }


  // Get WishList Data
  @Action(getWishlistData)
  getwishlist(ctx: StateContext<wishlistModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
    });
  }

  // Add To Wishlist
  @Action(addWishlistItem)
  addwishlistData( ctx: StateContext<wishlistModel>, action: addWishlistItem) {

    const state = ctx.getState();

    const wishlistData = state.data.wishlist.find((item: { id: number }) => item.id === action.payload.id);

    if (!wishlistData) {
      ctx.patchState({
        data: {
          wishlist: [...state.data.wishlist, action.payload],
        },
      });
      this.toastr.success('Property has been added in wishlist.');
    } else {
      this.toastr.error('Property Already exist in wishlist.');
    }
  }

  // Remove From  Wishlist
  @Action(removeWishlistItem)
  removeWishlist(ctx: StateContext<wishlistModel>,action: removeWishlistItem) {
    const state = ctx.getState();

    let cart = state.data.wishlist.filter((value) => value.id != action.id);

    ctx.patchState({
      data: {
        wishlist: cart,
      },
    });
    this.toastr.success('Property has been removed from wishlist.');
  }

}

