export default class NavigationModel{
    constructor() {
        this.sections = {};
    }
    addSection(sectionName){
        const indexOfSection = Object.keys(this.sections).indexOf(sectionName);
        if(indexOfSection<0) {
            // "sectionName" : "displayName":[],"link":[]
            this.sections[sectionName] = {"displayName": [], "link": [], "icon":[]};
        }
    }
    addNavigation(sectionName, displayName, link){
        const indexOfSection = Object.keys(this.sections).indexOf(sectionName);
        if(indexOfSection>=0){
            this.sections[sectionName].displayName.push(displayName);
            this.sections[sectionName].link.push(link);
            this.sections[sectionName].icon.push("");
        }
    }
    addNavigationWitIcon(sectionName, displayName, link, icon){
        const indexOfSection = Object.keys(this.sections).indexOf(sectionName);
        if(indexOfSection>=0){
            this.sections[sectionName].displayName.push(displayName);
            this.sections[sectionName].link.push(link);
            this.sections[sectionName].icon.push(icon);
        }
    }
    getSections(){
        return this.sections;
    }
}