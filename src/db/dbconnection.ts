import mongoose from 'mongoose'

export const getDBconnection=(url:string)=>{

mongoose.connect(url)
mongoose.connection.once('open', ()=>console.log('connected to database successfully')).on('error', err=>console.log('error connecting to database '+err))
}
