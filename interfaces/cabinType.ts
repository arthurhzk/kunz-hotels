export interface Cabin {
  id: string;
  name: string;
  maxCapacity?: number | undefined;
  discount?: number | undefined;
  regularPrice?: number | undefined;
  image: string;
}
