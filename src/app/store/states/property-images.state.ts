import { Action, Selector, State, StateContext } from "@ngxs/store"
import { latestForSale } from "../../interface/property"
import { Injectable } from "@angular/core"
import { PropertyService } from "../../services/property.service"
import { getImages } from "../actions/property-images.action"
import { tap } from "rxjs"

export class imagesModel{
  data: {
    data: latestForSale[]
  }
}

@State<imagesModel>({
  name: 'images',
  defaults: {
    data: {
      data: []
    }
  }
})


@Injectable()
export class imageState{
  constructor(private propertyService: PropertyService) {}

  @Selector()
  static images(state: imagesModel){
    return state.data.data
  }

  @Action(getImages)
  getImage(ctx: StateContext<imagesModel>, action: getImages){
    return this.propertyService.getImage(action.id).pipe(tap((res) => {
      ctx.setState({
        data: {
          data: res
        }
      })
    }))
  }
}
