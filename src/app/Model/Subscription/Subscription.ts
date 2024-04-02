export class Subscription {
  id!: number 
  name!: string 
  description!: string 
  price!: number
  type!: string
  duration!: string
  editMode: boolean = false // Ajoutez la propriété editMode et initialisez-la à false par défaut
  edited: Subscription | null=null // Déclaration de la propriété edited

  constructor(id: number, name: string, description: string, price: number, type: string, duration: string) {
    this.id = id
    this.name = name
    this.description = description
    this.price = price
    this.type = type
    this.duration = duration
  }
}
