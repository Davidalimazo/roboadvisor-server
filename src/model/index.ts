import mongoose from 'mongoose'

const RoboStatisticsSchema = new mongoose.Schema({
    riskScore: {type:Number, min:0, max:10},
    nigerianStocks: {type:String},
    foriegnStock: {type:String},
    techStocks: {type:String},
    emergingStocks: {type:String},
    nigerianBonds: {type:String},
    foriegnBonds: {type:String},
    commodities: {type:String},
    realEstate: {type:String},
    tBills: {type:String},
    alternative: {type:String}
}, {timestamps:true})

export const RoboStatistics = mongoose.model('RoboStat', RoboStatisticsSchema);












