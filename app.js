let express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.set('view engine','ejs');
let date = new Date();
let newtodo= [];
worklist = [];
options = {
    day: "numeric",
    weekday:"long",
    month : "long"
};
let d = date.toLocaleDateString("en-US",options);
app.get("/",(req,res)=>{
    res.render("list",{date:d,listItem : newtodo});
});
app.get("/work",function(req,res){
    res.render("list",{date:"IMPORTANT TO-DO",listItem:worklist})
})
app.post("/",function(req,res){
    console.log(req.body);
    if(req.body.list === "IMPORTANT"){
        let item = req.body.newValue;
        worklist.push(item);
        res.redirect("/work");        
    }
    else{
    let item = req.body.newValue;
    newtodo.push(item);
    res.redirect("/");
    }
})
app.listen(4000);