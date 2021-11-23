$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myList li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });



    
    const ProdUrl = 'https://handi-chichen.herokuapp.com/BiryaniMahalgetFood';
    
    const unOrderList = document.querySelector('#BiryaniMahalFoodContainer');

    // $.ajax({
    //     type: "GET",
    //     url: ProdUrl,
    //     async: true,
    //     crossDomain: true,
    //     headers: {  'Access-Control-Allow-Origin': '*',
    //     'accept': 'application/json'
      
    //  },

  
    //     success: function(data){
    //     //   document.querySelector('.loader').style.visibility='hidden';
    //     //   FoodListBinding(data);
    //        console.log(data)
    //     }
    //   });


    $.getJSON(ProdUrl,(result)=>{
        document.querySelector('.loader').style.visibility='hidden';
        // var maindiv = document.getElementById('CardContainer');
        if(result.length>0){
            result.forEach(element => {
              const listItem = document.createElement('li');
              listItem.className='list-group-item d-flex justify-content-between align-items-start'
              const div1 = document.createElement('div');
              div1.className='ms-2 me-auto';
              const div2 = document.createElement('div')
              div2.className='fw-bold';
              div2.innerHTML=element.foodItem;
              div1.appendChild(div2);
              const per = document.createElement('p');
              // const bold = document.createElement('b');
              per.innerHTML='RS:' +element.Amount
              // per.appendChild(bold)
              div1.appendChild(per)
              const foodButton = document.createElement('a')
              foodButton.className='btn btn-primary EditBiryaniMahalFoodItem';
              foodButton.innerHTML='Order Food'
              div1.appendChild(foodButton)
              const span = document.createElement('span');
              span.className='idVisiblity'
              span.innerHTML=element._id;
              div1.appendChild(span);
              listItem.appendChild(div1);
              const foodImg = document.createElement('img')
              foodImg.className='img-fluid rounded'
              foodImg.src='data:'+element.contentType+';base64,'+element.ImageBase64+''
              foodImg.style.width='8rem';
              listItem.appendChild(foodImg)
              unOrderList.appendChild(listItem)
                
            });

        }
        $('.EditBiryaniMahalFoodItem').click( ((e)=>{
            const foodSibling = e.target.nextElementSibling;
            const foodId = foodSibling.getInnerHTML();
            localStorage.setItem("ID", foodId);
            window.location.href='/UserDetailBiryaniMahal';
            }))
       
    

    });
 
   
  


 const  OrderedFood =(()=>{
    window.location.href='/OrderedFood'
 })

 

 

 
 