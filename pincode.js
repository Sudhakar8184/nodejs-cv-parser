module.exports.pincodes=function(pincode,text)
{
      var request = require('request');
      var words1=require('./words.js');
      //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",text)
      console.log("0",pincode[0]);
      console.log("1",pincode[1]);
      var pinArr=[],ad_rr=[],up_ad=[];
      let address="";

     for(j=0;j<pincode.length;j++){
       //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!",text);
    request({url:`https://maps.googleapis.com/maps/api/geocode/json?address=${pincode[j]}&key=AIzaSyATAf58891KC6ohOJPsWL4561cUbsqz2qg`,
             json:true
             },(error,response,body)=>{
             if(error){
             console.log("unable to connect forecast.io ")
            }else if(response.statusCode ==400){
            console.log("unable to fetch data ")
            }else if(response.statusCode ==200){

            if(body.results[0].address_components.length!=null && body.results[0].address_components.length!= undefined && body.results[0].address_components.length>0)
            {
              for(let i=0;i<body.results[0].address_components.length;i++){
                            address=address+' '+body.results[0].address_components[i].long_name;
             }
             }
console.log(address);
   if(pincode.length>1)
   {

    ad_rr.push(body.results[0].address_components[1].long_name);
    ad_rr.push(body.results[0].address_components[2].long_name);
    ad_rr.push(body.results[0].address_components[3].long_name);
// console.log(ad_rr);
          pinArr.push(address);
          address="";
           // console.log(pinArr);
         for(l=0;l<ad_rr.length;l++){
             m1=ad_rr[l];
           r=`${m1}`;
           let keys1 = new RegExp(r, 'g')
           console.log("hj",r);
        //   console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",text)
          if(keys1.test(text.toString()))
          {
            if(l<3)
            {address=pinArr[0];
              words1.obj.details.address.fullAddress=body.results[0].formatted_address;
                up_ad=address.trim().split(' ');
                console.log(up_ad);
              words1.obj.details.address.pincode=up_ad[0];
              words1.obj.details.address.locality=up_ad[1];
              words1.obj.details.address.country=body.results[0].address_components[body.results[0].address_components.length-1].long_name;
            }
            else{
             address=pinArr[1];
              words1.obj.details.address.fullAddress=body.results[0].formatted_address;
                up_ad=address.trim().split(' ');
                console.log(up_ad);
              words1.obj.details.address.pincode=up_ad[0];
              words1.obj.details.address.locality=up_ad[1];
              words1.obj.details.address.country=body.results[0].address_components[body.results[0].address_components.length-1].long_name;
              }
          }
          }
        }
        else {

            words1.obj.details.address.fullAddress=body.results[0].formatted_address;
              up_ad=address.trim().split(' ');
              console.log(up_ad);
            words1.obj.details.address.pincode=up_ad[0];
            words1.obj.details.address.locality=up_ad[1];
            words1.obj.details.address.country=body.results[0].address_components[body.results[0].address_components.length-1].long_name;

        }

 }})

  }

}
