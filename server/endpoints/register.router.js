const Profile = require("../models/Profile").Profile;
const mongo = require('mongodb');
const saveDocument = require('../api/mongodb.api').saveDocument;
const saveDocumentGetId = require('../api/mongodb.api').saveDocumentGetId;
const readDocument = require('../api/mongodb.api').readDocument;
const Router = require('@koa/router');
const {deleteDocument} = require("../api/mongodb.api");
const {readAllDocuments} = require("../api/mongodb.api");
//endpoint first url
const router = new Router({prefix:'/register'});

router.post("/", async ctx=>{
    const registerProfile = ctx.request.body.profile;
    let profile = new Profile();
    Object.assign(profile,registerProfile);
    //console.log("password:"+registerProfile.password);
    profile.setPassword(registerProfile.password);
    profile.formatToCorrectRole();
    //console.log(JSON.stringify(profile.getProfileData()));
    ctx.response.set('content-type','application/json');
    let alreadySaved = false;
    await readDocument(Profile.RECRUIT_COLLECTION_NAME,"nic",profile.nic).then(
        function (result){
            if(result.length>0){
                alreadySaved = true;
                ctx.body = "Your Registration Reference ID: "+result[0]._id.toString();
            }
        }
    )
    if(!alreadySaved) {
        await saveDocumentGetId(Profile.RECRUIT_COLLECTION_NAME, profile.getProfileData()).then(
            function (result_id) {
                ctx.body = "Your Registration Reference ID: " + result_id.insertedIds[0];
            }
        );
    }
})

router.get("/roles", async ctx=>{
    ctx.response.set('content-type','application/json');
    ctx.body = Profile.getUserRoles();
})

router.get("/recruitments", async ctx=>{
    ctx.response.set('content-type','application/json');
    let recruitments = [], profile;
    await readAllDocuments(Profile.RECRUIT_COLLECTION_NAME).then(
        function (results){
            results.map(result=>{
                profile = new Profile();
                Object.assign(profile,result);
                recruitments.push(profile.getProfileDataWithoutPassword());
            });
        }
    )
    ctx.body = recruitments;
})
router.put("/accept/:id", async ctx=>{
    const profile_id = ctx.request.params.id;
    const user_nic = ctx.request.body.nic;
    const mongoId = new mongo.ObjectId(profile_id);
    let recordExists =false;
    await readDocument(Profile.PROFILE_COLLECTION_NAME,"nic",user_nic).then(
        function (res){
            if(res.length>0){
                recordExists = true;
            }
        }
    )
    if(!recordExists){
        let profile = new Profile();
        await readDocument(Profile.RECRUIT_COLLECTION_NAME,"_id",mongoId).then(
            function (res){
                Object.assign(profile,res[0]);
                profile.setPasswordDb(res[0].password);
            }
        )
        saveDocument(Profile.PROFILE_COLLECTION_NAME,[profile.getProfileData()]);
        await deleteDocument(Profile.RECRUIT_COLLECTION_NAME,"nic",user_nic);
    }
    //console.log("profile_id:"+profile_id+" nic:"+user_nic);
    ctx.response.set('content-type','application/json');
    ctx.body="success";
})
router.put("/reject/:id", async ctx=>{
    const profile_id = ctx.request.params.id;
    const user_nic = ctx.request.body.nic;
    const mongoId = new mongo.ObjectId(profile_id);
    //console.log("profile_id:"+profile_id+" nic:"+user_nic);
    await deleteDocument(Profile.RECRUIT_COLLECTION_NAME,"_id",mongoId);
    ctx.response.set('content-type','application/json');
    ctx.body="success";
})
exports.RegisterEndpoint=router;