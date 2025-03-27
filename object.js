var data =
{
    "firstName" : "NABIL",
    "lastName" : "JALAL",
    "age" : 22, //number 
    "phone" :{
        "mobile" : "0198066619",
        "office" : "0342870311"
    },          //object form

    "subject" :[
         "MATHS",
         "PHYSICS",
         "CHEMISTRY"
    ],                    //array form

    "phone3" :[
        {"mom" : "0126905003"},
        {"dad" : "0192805161"}
    ]               //object in array form

}

console.log(data.age);
console.log(data.phone.mobile);
console.log(data.subject[1]);
console.log(data.phone3[1]);

console.log(data);//print all

data.firstName ="ANIS"; //change value in data
data.subject.push("HISTORY");//add values into array form
data.phone.home= "999"; //add values to object form
console.log(data);