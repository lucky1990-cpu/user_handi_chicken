const ProdURL = 'https://user-handi-app.herokuapp.com';
const DevUrl = 'https://localhost:3000';
const URLGet =  DevUrl+'/SearchedByPhoneNo';
const ProdURLGet = ProdURL + '/SearchedByPhoneNo';
const orderDetailsDiv =  document.querySelector('#orderDetailsDiv')
document.querySelector('.loader').style.visibility='hidden';

document.querySelector('#EditBackButton').addEventListener('click',(e)=>{
  e.preventDefault();
  window.location.href='/AllFoodItems' 
})

document.querySelector('#searchByPhone').addEventListener('click',(e)=>{
  e.preventDefault();
  const mobNo = document.querySelector('#PhoneNumber').value;
  if(mobNo==''){
    document.querySelector('#PhoneNumber').style.border='2px solid red'
    return;
  }
  document.querySelector('#PhoneNumber').style.border='2px solid black'
  SearchedPhoneCall(mobNo)
})

document.querySelector('#searchByRefresh').addEventListener('click',(e)=>{
  e.preventDefault();
  const mobNo = document.querySelector('#PhoneNumber').value;
  if(mobNo==''){
    document.querySelector('#PhoneNumber').style.border='2px solid red'
    return;
  }
  document.querySelector('#PhoneNumber').style.border='2px solid black'
  SearchedPhoneCall(mobNo)
})


const SearchedPhoneCall = (mobNo)=>{
  document.querySelector('.loader').style.visibility='visible';
   const phoneData = {mob:parseInt(mobNo)}
    $.ajax({
        type: "GET",
        url: ProdURLGet,
        data: phoneData,
        cache: false,
        success: function(data){
          document.querySelector('.loader').style.visibility='hidden';
          FoodListBinding(data);
           console.log(data)
        }
      });

}

const FoodListBinding = (data)=>{
  orderDetailsDiv.innerText='';
  data.forEach(element => {
    const unOrderList = document.createElement('ul')
    unOrderList.style='list-style-type:none';
    orderDetailsDiv.appendChild(unOrderList)
    const list = document.createElement('li');
    list.className='list-group-item d-flex justify-content-between align-items-start OrderedItemShadow';
    const listDiv = document.createElement('div');
    listDiv.className='ms-2 me-auto';
    list.appendChild(listDiv);
    unOrderList.appendChild(list)
    
    const subHeadingDiv = document.createElement('div');
    subHeadingDiv.className='fw-bold';
    subHeadingDiv.innerHTML=element.FoodName;
    listDiv.appendChild(subHeadingDiv);
    const userDetailDiv = document.createElement('div')
    const userName = document.createElement('h5')
    userName.innerHTML=element.Name;
    userDetailDiv.appendChild(userName);
    const userPhone = document.createElement('h6')
    userPhone.innerHTML=element.PhoneNo;
    userDetailDiv.appendChild(userPhone)
    
     const userDateTime = document.createElement('p')
     const DateTime = new Date(element.DateTime)
     userDateTime.innerHTML=DateTime.toLocaleString();
     userDetailDiv.appendChild(userDateTime)

    const userAddress= document.createElement('h6');
    userAddress.innerHTML=element.Address
    userDetailDiv.appendChild(userAddress)
    listDiv.appendChild(userDetailDiv)
  
    const QtyAmountDiv = document.createElement('div');
    QtyAmountDiv.className='QtyAmount';
    const qty = document.createElement('div');
    qty.className='fw-bold'
    qty.innerHTML='Qty'
    const QtyData =  document.createElement('span')
    QtyData.innerHTML= ':' + element.Qty;
    qty.appendChild(QtyData)
    QtyAmountDiv.appendChild(qty)
    const amountSapn = document.createElement('span')
    amountSapn.innerHTML= 'Rs :' +element.TotalAmount
    QtyAmountDiv.appendChild(amountSapn)
    list.appendChild(QtyAmountDiv)

    const StatusPendingDiv = document.createElement('div');
    const status =  document.createElement('div');
    status.className='fw-bold'
    status.innerHTML='Status'
    StatusPendingDiv.appendChild(status)
    const pending = document.createElement('div');
    pending.className='badge  rounded-pill';
    if(element.Status=='P'){
      pending.innerHTML='pending'
      pending.style.backgroundColor='blue';
    }
    if(element.Status=='R'){
      pending.innerHTML='recived'
      pending.style.backgroundColor='green';
    }
    if(element.Status=='C'){
      pending.innerHTML='completed' 
      pending.style.backgroundColor='gray'
    }
    StatusPendingDiv.appendChild(pending)
    list.appendChild(StatusPendingDiv)
  });

}