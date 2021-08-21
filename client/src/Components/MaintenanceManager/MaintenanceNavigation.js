import NavigationModel from "../../models/NavigationModel";
export default function MaintenanceNavigations(){
    let navigations = new NavigationModel();
    navigations.addSection("NAVIGATIONS");
    navigations.addNavigationWitIcon("NAVIGATIONS","Dashboard","/maintainer","icon-home");
    navigations.addNavigationWitIcon("NAVIGATIONS","Housekeeping","/maintainer/housekeeping","icon-server");
    navigations.addNavigationWitIcon("NAVIGATIONS","Add Cleaning Task","/maintainer/housekeeping/add","icon-file-plus");
    navigations.addNavigationWitIcon("NAVIGATIONS","Maintenance","/maintainer/maintenance", "icon-package");
    navigations.addNavigationWitIcon("NAVIGATIONS","Add Maintenance Task","/maintainer/maintenance/add","icon-file-plus");
    return navigations;
}
