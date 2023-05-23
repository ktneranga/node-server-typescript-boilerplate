import {Schema, model, connect} from 'mongoose'
import { ICompany, ILocation } from '../utils/types';

const locationSchema = new Schema<ILocation>({
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

const companySchema = new Schema<ICompany>({
    name: {
        type: String,
        required: true
    },
    location: {
        type: locationSchema,
        required: true
    },
    companySize: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
},{timestamps: true});

export const companies = model<ICompany>("companies", companySchema)