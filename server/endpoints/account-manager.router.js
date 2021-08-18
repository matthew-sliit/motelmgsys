const Profile = require("../models/Profile").Profile;
const mongo = require('mongodb');
const readDocument = require('../api/mongodb.api').readDocument;
const Router = require('@koa/router');
const {updateDocument} = require("../api/mongodb.api");
const {deleteDocument} = require("../api/mongodb.api");
const {readAllDocuments} = require("../api/mongodb.api");
//endpoint first url
const router = new Router({prefix:'/management'});
//get all profiles
router.get("/profiles",async ctx=>{
    ctx.response.set('content-type','application/json');
    let profiles = [], profile;
    await readAllDocuments(Profile.PROFILE_COLLECTION_NAME).then(
        function (results){
            results.map(result=>{
                profile = new Profile();
                Object.assign(profile,result);
                profiles.push(profile.getProfileDataWithoutPassword());
                if(result.status!=="undefined"){
                    profile.status = result.status;
                }
            });
        }
    )
    ctx.body = profiles;
})
router.put("/user-ban-status/:id", async ctx=>{
    const profile_id = ctx.request.params.id;
    const status = ctx.request.body.status;
    const mongoId = new mongo.ObjectId(profile_id);
    let found = false,profile = new Profile();
    await readDocument(Profile.PROFILE_COLLECTION_NAME,"_id",mongoId).then(
        function (res){
            if(res.length>0){
                found = true;
                Object.assign(profile,res[0]);
                profile.setPasswordDb(res[0].password);
                //console.log("status: "+status);
                if(status==="ban"){
                    profile.setBan();
                }else{
                    profile.removeBan();
                }
                //console.log(JSON.stringify(profile.getProfileData()));
            }
        }
    )
    if(found){
        await updateDocument(Profile.PROFILE_COLLECTION_NAME,"_id",mongoId,profile.getProfileData());
    }
    //console.log("profile_id:"+profile_id+" nic:"+user_nic);
    ctx.response.set('content-type','application/json');
    ctx.body="success";
})
router.put("/update-profile/:id", async ctx=>{

})
exports.AccountManagerEndpoint=router;