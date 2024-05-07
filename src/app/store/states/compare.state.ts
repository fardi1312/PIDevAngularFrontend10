import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ToastrService } from "ngx-toastr";
import { latestForRent } from "../../interface/property";
import { addCompareItem, getCompareData, removeCompareItem } from "../actions/compare.action";

export class compareModel {
  data: {
    compare : latestForRent[];
  }
}


@State<compareModel>({
  name: 'compare',
  defaults: {
    data: {
      compare: [],
    },
  },
})

@Injectable()
export class compareState {

  constructor(private toastr: ToastrService) {}

  @Selector()
  static getCompareData(state: compareModel) {
    return state.data.compare;
  }

  // Get Compare Data
  @Action(getCompareData)
  getwishlist(ctx: StateContext<compareModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
    });
  }

  // Add To Compare
  @Action(addCompareItem)
  addCompareData(ctx: StateContext<compareModel>, action: addCompareItem) {
    const state = ctx.getState();

    const compareData = state.data.compare.find((item: { id: number }) => item.id === action.payload.id);

    if (!compareData) {
      ctx.patchState({
        data: {
          compare: [...state.data.compare, action.payload],
        },
      });
      this.toastr.success('Property has been added in Compare.');
    } else {
      this.toastr.error('Property Already exist in Compare.');
    }
  }

  // Remove From  Wishlist
  @Action(removeCompareItem)
  removeWishlist(ctx: StateContext<compareModel>,action: removeCompareItem) {
    const state = ctx.getState();

    let cart = state.data.compare.filter((value) => value.id != action.id);

    ctx.patchState({
      data: {
        compare: cart,
      },
    });
    this.toastr.success('Property has been removed from Compare.');
  }
}

