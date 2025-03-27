var num1 =1;

console.log(num1);
var str1 = "HELLO";

console.log(typeof num1);
console.log(str1);

num1 ="11"; // can change value in "mum1" anytime

console.log(typeof num1);
console.log(typeof str1);

const num2= 2;// cannot change value in "mum2" 

var arr1 =[1,2,3,4,5];
var arr2 =["apple","banana", "lemon"];
var arr3 =[1 ,"kurma",true];

console.log(arr1); // display whhole array
console.log(arr2);
console.log(arr3);

console.log(arr1[0]);//display specific index no
console.log(arr3[2]);

var students =["NABIL","AMAR","WILL"]; //declare array
console.log(students);

students.push("JAI","NIQ"); //add new items into array(at the end)
console.log(students);

students.unshift("KHAI");
console.log(students); //add new items into array(at the beginning)

students.pop();
console.log(students); //remove obj (end)

students.shift(); //remove obj (beginning)
console.log(students);

students.sort(); // sort alphebetical(ascending)
console.log(students);

var num3 =3.142;
var str2 ="3.142";
console.log(str2 ==num3); //check if both variable(value) same
console.log(str2 !=num3); //check if both variable(value) is not same
console.log(str2 ===num3); //check is both variable (type) is same.
console.log(str2 !==num3); //check if both variable(type) is not same

var num1 =1
var num4="3.142";
console.log(num1 +Number(str2)); //addition for when type not in number but value is.
console.log(num1 +Number(num4));
