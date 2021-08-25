import NavigationModel from "../../models/NavigationModel";
export default function AdminNavigations(){
    let navigations = new NavigationModel();
    navigations.addSection("NAVIGATIONS");
    navigations.addNavigationWitIcon("NAVIGATIONS","Dashboard","/admin","icon-home");
    navigations.addNavigationWitIcon("NAVIGATIONS","Employee Account Manager","/admin/uac","icon-file-text");
    navigations.addNavigationWitIcon("NAVIGATIONS","View Reservations","/admin/view-reserve", "icon-server");
    navigations.addNavigationWitIcon("NAVIGATIONS","Employee Recruitment","/admin/recruitments","icon-file-text");
    //navigations.addSection("Account");
    //navigations.addNavigationWitIcon("Account","Profile","/","icon-sidebar");
    //navigations.addNavigationWitIcon("Account","Logout","/","icon-power");
    return navigations;
}