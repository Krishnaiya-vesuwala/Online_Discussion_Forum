const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/Discussion')
.then(()=>{
    console.log('connected...')
})
.catch(()=>{
    console.log('Disconnected.');
})