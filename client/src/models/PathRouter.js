export default class PathRouter{
    constructor() {}
    static getDashboardUrlForRole(role){
        if(role==="Administrator"){
            return PathRouter.getAdminDashboardUrl();
        }else if(role==="Reservation Manager"){
            return PathRouter.getRMDashboardUrl();
        }else if(role==="Maintenance Manager"){
            return PathRouter.getMMDashboardUrl();
        }else if(role==="Bar Manager"){
            return PathRouter.getBMDashboardUrl();

        }else{
            return "#";//go nowhere
        }
    }
    static getAdminDashboardUrl(){
        return "/admin"
    }
    static getRMDashboardUrl(){
        return "/reserve"
    }
    static getMMDashboardUrl(){
        return "/maintainer"
    }
    static getBMDashboardUrl(){
        return "/bar"
    }
}