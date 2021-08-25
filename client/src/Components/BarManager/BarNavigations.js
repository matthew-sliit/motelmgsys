import NavigationModel from "../../models/NavigationModel";
export default function BarNavigations(){
    let navigations = new NavigationModel();
    navigations.addSection("NAVIGATIONS");
    navigations.addNavigationWitIcon("NAVIGATIONS","Drinks Menu","/bar/menu","icon-home");
    navigations.addNavigationWitIcon("NAVIGATIONS","Add New Drink","/bar/new","icon-file-text");
    navigations.addNavigationWitIcon("NAVIGATIONS","Update Drinks","/bar/edit", "icon-server");
    navigations.addNavigationWitIcon("NAVIGATIONS","Search Drinks","/bar","icon-file-text");



    //navigations.addSection("Account");
    //navigations.addNavigationWitIcon("Account","Profile","/","icon-sidebar");
    //navigations.addNavigationWitIcon("Account","Logout","/","icon-power");
    return navigations;
}