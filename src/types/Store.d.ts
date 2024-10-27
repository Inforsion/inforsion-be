export interface Store {
  id: number;
  name: string;
  location?: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  openingHours?: Object;
  isActive: boolean;
  createdAt: Date | number;
  updatedAt: Date | number;
}
