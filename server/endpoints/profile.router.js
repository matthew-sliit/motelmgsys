const Profile = require("../models/Profile").Profile;
const mongo = require('mongodb');
const readDocument = require('../api/mongodb.api').readDocument;
const {generatePassword} = require('../models/password-generator');
const Router = require('@koa/router');
const {updateDocument} = require("../api/mongodb.api");
//endpoint first url
const router = new Router({prefix:'/profile'});

router.get("/:id", async ctx=>{
    const id = ctx.request.params.id;
    const mongoId = new mongo.ObjectId(id);
    ctx.response.set('content-type','application/json');
    let found = false;
    await readDocument(Profile.PROFILE_COLLECTION_NAME,"_id",mongoId).then(
        function (res){
            if(res.length>0){
                //console.log("found profile for: "+id);
                found = true;
                let profile = new Profile();
                Object.assign(profile,res[0]);
                ctx.body = profile.getProfileDataWithoutPassword();
            }
        }
    )
    if(!found){ctx.body="Access Denied!";}
})

router.put("/:id", async ctx=>{
    const id = ctx.request.params.id;
    const profileRaw = ctx.request.body.profile;
    //setup mongo id
    const mongoId = new mongo.ObjectId(id);
    let found = false, savedProfile = new Profile(), editedProfile = new Profile();
    ctx.response.set('content-type','application/json');
    await readDocument(Profile.PROFILE_COLLECTION_NAME,"_id",mongoId).then(
        function (res){
            if(res.length>0){
                found = true;
                Object.assign(savedProfile,res[0]);
                savedProfile.setPasswordDb(res[0].password);
                editedProfile.setPasswordDb(res[0].password);
            }
        }
    )
    if(savedProfile.passwordVerified(profileRaw.password)){
        Object.assign(editedProfile, profileRaw);
        editedProfile.role = savedProfile.role;//this cannot be changed by user
        if(typeof profileRaw.passwordNew!=="undefined"){
            if(profileRaw.passwordNew.length>6){
                editedProfile.setPassword(profileRaw.passwordNew);
            }
        }
        //console.log(JSON.stringify(editedProfile.getProfileData()));
        await updateDocument(Profile.PROFILE_COLLECTION_NAME,"_id",mongoId,editedProfile.getProfileData());
        ctx.body="success";
    }
    if(!found){ctx.body="Access Denied!";}
})
exports.ProfileEndpoint=router;