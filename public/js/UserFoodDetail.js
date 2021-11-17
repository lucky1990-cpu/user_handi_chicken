const _id = localStorage.getItem("ID");
console.log(_id)
const DevUrl = 'http://localhost:3000';
const ProdUrl = 'http://handi-chichen.herokuapp.com';
const URLGet =  DevUrl+'/EditFoodItemFetchData';
const URLFoodOrder = DevUrl+'/FoodOrder';
const ProdURLGet = ProdUrl+'/EditFoodItemFetchData';
const URLEditFood = ProdUrl +'/UpdateFoodItem';
const URLDeleteFood =  ProdUrl + '/DeleteFoodItem';
const myData = {
    _id:_id
}

$.ajax({
    type: "GET",
    url: URLGet,
    data: myData,
    cache: false,
    success: function(data){
      document.querySelector('.loader').style.visibility='hidden';
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
  const updatedFood = {
    FoodId:document.getElementById('EditFoodID').innerHTML,
    FoodName :document.getElementById('EditFoodName').innerHTML,
    Qty:  document.getElementById('Qnty').value,
    TotalAmount:amount,
    Name:document.querySelector('#UserName').value,
    PhoneNo:document.querySelector('#MobNo').value,
    Address:document.querySelector('#homeAddress').value
}
 UpdateFoodItem(updatedFood)
 })


 function DeleteRecord(deleteId){
   const delData =  JSON.stringify(deleteId);
  $.ajax({
    type: "POST",
    url: URLDeleteFood,
    dataType: "json",
   contentType: "application/json; charset=utf-8",
   data: delData,
    success: function(data){
      alert(data.data)
      window.location.href='/'
    },
    error:function(e){
      console.log(e)
    }
  });
 }

 function UpdateFoodItem(updatedFood){
   const EditData = JSON.stringify(updatedFood)
  $.ajax({
    type: "POST",
    url: URLFoodOrder,
    dataType: "json",
   contentType: "application/json; charset=utf-8",
   data: EditData,
    success: function(data){
      alert(data.data)
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