import { UserNavbar } from "../../component/user/UserNavbar"
import ViewData from "../../component/user/ViewData"
import UserSidebar from "../../component/user/userDashboard/Sidebar"


     
 


function ViewDataPage() {
  return (
    <div>
         <UserSidebar/>
      <UserNavbar/>
    <ViewData/>
    </div>
  )
}

export default ViewDataPage
