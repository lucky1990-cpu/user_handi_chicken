const _id = localStorage.getItem("ID");
console.log(_id)
const ProdUserURL = 'https://user-handi-app.herokuapp.com';
const DevUrl = 'https://localhost:3000';
const ProdUrl = 'https://handi-chichen.herokuapp.com';
const URLGet =  DevUrl+'/EditFoodItemFetchData';
const URLFoodOrder = DevUrl+'/FoodOrder';
const URLProdFoodOrder = ProdUserURL +'/BiryaniMahalUsers';
const ProdURLGet = ProdUrl+'/BiryaniMahalgetFood';
const URLEditFood = ProdUrl +'/UpdateFoodItem';
const URLDeleteFood =  ProdUrl + '/DeleteFoodItem';
const myData = {
    _id:_id
}
document.querySelector('#UpdateFood').style.visibility='hidden';
$.ajax({
    type: "GET",
    url: ProdURLGet,
    data: myData,
    cache: false,
    async: true,
    crossDomain: true,
    headers: {  'Access-Control-Allow-Origin': '*',
    'accept': 'application/json'
    },
    success: function(data){
      document.querySelector('.loader').style.visibility='hidden';
      document.querySelector('#UpdateFood').style.visibility='visible';
       EditFormBinding(data)
    }
  });

  function EditFormBinding(data){
    document.getElementById('EditFoodID').innerHTML= data[0]._id;
    document.getElementById('EditFoodName').innerHTML= data[0].foodItem;
    document.getElementById('EditFoodAmount').innerHTML= data[0].Amount;
    document.querySelector('#totalAmount').innerHTML=data[0].Amount;
    const ImgVal = 'data:'+data[0].contentType+';base64,'+data[0].ImageBase64+'';
    document.getElementById('HeaderImg').src=ImgVal;
    

  }

  $('#EditBackButton').click(()=>{
    window.location.href='/AllFoodItems' 
 })
  
 document.querySelector('#UpdateFood').addEventListener('click',(e)=>{
  e.preventDefault();
  const Qty=document.getElementById('Qnty').value;
  const foodAmount = document.querySelector('#EditFoodAmount').innerHTML;
  const amount = Qty*foodAmount;
  const dateTame =  new Date();
  const updatedFood = {
    FoodId:document.getElementById('EditFoodID').innerHTML,
    FoodName :document.getElementById('EditFoodName').innerHTML,
    Qty:  document.getElementById('Qnty').value,
    TotalAmount:amount,
    Name:document.querySelector('#UserName').value,
    PhoneNo:document.querySelector('#MobNo').value,
    Address:document.querySelector('#homeAddress').value,
    DateTime:dateTame
}
  userValidation(updatedFood)
   
 
 })

 const userValidation = (updatedFood)=>{
  if(document.querySelector('#UserName').value==''){
    document.querySelector('#UserName').style.border='1px solid red'
    return;
  }
  else{
    document.querySelector('#UserName').style.border='1px solid black'
  }
  if(document.querySelector('#MobNo').value==''){
    document.querySelector('#MobNo').style.border='1px solid red'
    return
  }
  else{
    document.querySelector('#MobNo').style.border='1px solid black'
  }
   if(document.querySelector('#homeAddress').value==''){
    document.querySelector('#homeAddress').style.border='1px solid red'
    return
   }
   else{
    document.querySelector('#homeAddress').style.border='1px solid black'
   }
   UpdateFoodItem(updatedFood)
 }




 function UpdateFoodItem(updatedFood){
  updatedFood.Status='P';
   const EditData = JSON.stringify(updatedFood)
   document.querySelector('.loader').style.visibility='visible';
  $.ajax({
    type: "POST",
    url: URLProdFoodOrder,
    dataType: "json",
   contentType: "application/json; charset=utf-8",
   data: EditData,
    success: function(data){
      document.querySelector('.loader').style.visibility='hidden';
      document.querySelector('.orderAlert').style.visibility='visible';
      document.querySelector('#UpdateFood').style.visibility='hidden';
      document.querySelector('#conMessage').innerText=data.message;
      document.querySelector('#confName').innerText=data.userName;
    },
    error:function(e){
      console.log(e)
    }
  });

 }

 function onChangeQty(e){
   const qty = e.value;
   const amount = document.querySelector('#EditFoodAmount').innerHTML;
   const totalAmount =  qty*amount
   document.querySelector('#totalAmount').innerHTML= 'Rs.'+ totalAmount;

 }

 const onOrderedPage = ()=>{
  window.location.href='/OrderedFood'
 }