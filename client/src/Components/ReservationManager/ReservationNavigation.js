import NavigationModel from "../../models/NavigationModel";
export default function ReservationNavigations(){
    let navigations = new NavigationModel();
    navigations.addSection("NAVIGATIONS");
    navigations.addNavigationWitIcon("NAVIGATIONS","Hello","/reserve","icon-home");
    navigations.addNavigationWitIcon("NAVIGATIONS","Edit Reservations","/reserve/edit","icon-file-text");
    return navigations;
}