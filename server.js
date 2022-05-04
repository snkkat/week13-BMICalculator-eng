//const { response } = require('express');
//const exp = require('constants');
const express = require('express');
const app = express();

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',(request,response) =>
{
    response.render('index',{resultToRender: ''});
});

app.post('/bmi',(request, response)=>{
    let height = Number(request.body.height)/100;
    let weight = Number(request.body.weight);
    let bmi = (weight/(height*height)).toFixed(2);
    let userResult = '';

    if(bmi<19){
        userResult = 'underweight';
    }
    else if(bmi >= 19 && bmi<= 24.9){
        userResult = 'normal weight';
    }
    else if(bmi >= 25 && bmi<= 29.9){
        userResult = 'overweight';
    }
    else {
        userResult = 'obese';
    }

    let finalResult ={
        userBMI:bmi,
        result:userResult
    };
    response.render('index',{resultToRender: finalResult})
});

const port = 3000;

app.listen(port, () =>{
    console.log(`Server is running at ${port} now.`)
})