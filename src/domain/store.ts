export type Store = {
  id: number;
  name: string;
  urlLogo: string;
  address: string;
  ownerId: number
}

export type NewStore = Omit<Store, 'id'>