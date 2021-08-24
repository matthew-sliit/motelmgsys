import NavigationModel from "../../models/NavigationModel";
export default function BJNavigations(){
    let navigations = new NavigationModel();
    navigations.addSection("NAVIGATIONS");
    navigations.addNavigationWitIcon("NAVIGATIONS","Burgers Menu","/joint/menu","icon-home");
    navigations.addNavigationWitIcon("NAVIGATIONS","Add New Burger","/joint/new","icon-file-text");
    navigations.addNavigationWitIcon("NAVIGATIONS","Update Burgers","/joint/edit", "icon-server");
    navigations.addNavigationWitIcon("NAVIGATIONS","Search Burgers","/joint","icon-file-text");


    //navigations.addSection("Account");
    //navigations.addNavigationWitIcon("Account","Profile","/","icon-sidebar");
    //navigations.addNavigationWitIcon("Account","Logout","/","icon-power");
    return navigations;
}