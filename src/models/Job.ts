import {Schema, model, Types} from 'mongoose'
import { IJob } from '../utils/types'
import { ISalaryRange } from '../utils/types';

const salarySchema = new Schema<ISalaryRange>({
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    }
})

const jobSchema = new Schema<IJob>({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    salary: {
        type: salarySchema,
        required: true 
    },
    link: {
        type: String,
        required: true
    },
    seniority: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    openingDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    closingDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: "companies"
    }
},{timestamps:true});

export const jobs = model<IJob>("jobs", jobSchema) 