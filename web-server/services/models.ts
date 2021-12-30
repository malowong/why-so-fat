export interface Food {
  food_name: string;
  food_photo: string;
  total_weight: number;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  username: string;
  password: string;
  gender: string;
  height: number;
  weight: number;
  created_at: Date;
  updated_at: Date;
}

export interface NewUser {
  username: string;
  password: string;
  gender: string;
  height: number;
  weight: number;
  energy_intake: number;
}

export interface Consumptions {
  id: number;
  quantity: number;
  user_id: number;
  food_id: number;
  created_at: Date;
  updated_at: Date;
}
