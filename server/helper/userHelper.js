import Subscription from "../model/schema/subscripionSchema.js";
import User from "../model/schema/userSchema.js";

const userHelper = {
    userExist:async(email) =>{
        try {
           const response = await User.findOne({email}) 
           return response
        } catch (error) {
          console.log("error in helper");  
        }
    },
    addUser:async(email,amount,name,phonenumber,nationality,currentlocation,UploadId,DMID) =>{
        try {
            const newUser = new User({
                email,amount,name,phonenumber,nationality,currentlocation,UploadId  
            })
           const user= await newUser.save()
           return user
        } catch (error) {
            
        }
    },
    saveUserData:async(fileName,data)=>{
        try {
            
            console.log("fileName.............",fileName);
            const {amount,plan,name,phonenumber,email,nationality,currentlocation} = data
            console.log("...........data:",amount);
            const newUser = new User({
                email,amount,name,phonenumber,nationality,currentlocation,UploadId:fileName
            })
           const user= await newUser.save()
           console.log("user......",user);
        const today = new Date()
        console.log("today",today);
       
           // Get current date
const currentDate = new Date();



if(plan==="Gold"){
   // Add 150 days to the current date
currentDate.setDate(currentDate.getDate() + 150);
}else if(plan==="Silver"){
// Add 150 days to the current date
currentDate.setDate(currentDate.getDate() + 90);
}else{
    // Add 150 days to the current date
currentDate.setDate(currentDate.getDate() + 30);
}
 // Get the new expiry date
 const year = currentDate.getFullYear();

const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
const day = currentDate.getDate();

// Format the expiry date as desired
const formattedExpiryDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

// Print the expiry date
console.log('Expiry date>>>>>>>>>>>>:', formattedExpiryDate);




//save Subscription Data
const newPlan =new Subscription({
    SubscriptionType:"online",PackageExpiry:formattedExpiryDate,userId:user._id,currentPackage:plan,
})
const newsubscription = await newPlan.save()
console.log("newsubscription.....................",newsubscription);
return true

        } catch (error) {
            
        }
    }


}
export default userHelper