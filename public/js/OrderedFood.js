const DevUrl = 'http://localhost:3000';
const URLGet =  DevUrl+'/SearchedByPhoneNo';
const unOrderList =  document.querySelector('#ListMainDiv')
document.querySelector('.loader').style.visibility='hidden';

document.querySelector('#searchByPhone').addEventListener('click',(e)=>{
  e.preventDefault();
  const mobNo = document.querySelector('#PhoneNumber').value;
  SearchedPhoneCall(mobNo)
})

const SearchedPhoneCall = (mobNo)=>{
  document.querySelector('.loader').style.visibility='visible';
   const phoneData = {mob:parseInt(mobNo)}
    $.ajax({
        type: "GET",
        url: URLGet,
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
  
  data.forEach(element => {

    const list = document.createElement('li');
    list.className='list-group-item d-flex justify-content-between align-items-start';
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
    amountSapn.innerHTML=element.TotalAmount
    QtyAmountDiv.appendChild(amountSapn)
    list.appendChild(QtyAmountDiv)
  
  
    const StatusPendingDiv = document.createElement('div');
    const status =  document.createElement('div');
    status.className='fw-bold'
    status.innerHTML='Status'
    StatusPendingDiv.appendChild(status)
    const pending = document.createElement('div');
    pending.className='badge bg-primary rounded-pill';
    pending.innerHTML='pending'
    StatusPendingDiv.appendChild(pending)
  
    list.appendChild(StatusPendingDiv)



    
  });

 
  $('#EditBackButton').click(()=>{
    window.location.href='/AllFoodItems' 
 })






}