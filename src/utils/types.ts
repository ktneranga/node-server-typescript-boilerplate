import { Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  active: boolean;
}

export interface ILocation {
  country: string;
  city: string;
}

export interface ICompany {
  name: string;
  location: ILocation;
  companySize: number;
  email: string;
  about: string;
  website: string;
  userId: Types.ObjectId;
}

type seniorityType = "entry" | "junior" | "intermediate" | "senior";
type jobTypes = "office" | "remote" | "hybrid";

export interface ISalaryRange {
  min: number;
  max: number;
}

export interface IJob {
  title: string;
  description: string;
  type: jobTypes;
  seniority: seniorityType;
  salary: ISalaryRange;
  link: string;
  openingDate: Date;
  closingDate: Date;
  companyId: Types.ObjectId;
}
