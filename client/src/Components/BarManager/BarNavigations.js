import NavigationModel from "../../models/NavigationModel";
export default function BarNavigations(){
    let navigations = new NavigationModel();
    navigations.addSection("NAVIGATIONS");
    navigations.addNavigationWitIcon("NAVIGATIONS","Add a Drink","/bar","icon-home");
    navigations.addNavigationWitIcon("NAVIGATIONS","Drinks Menu","/bar","icon-file-text");

    //navigations.addSection("Account");
    //navigations.addNavigationWitIcon("Account","Profile","/","icon-sidebar");
    //navigations.addNavigationWitIcon("Account","Logout","/","icon-power");
    return navigations;
}