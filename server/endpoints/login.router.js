const Profile = require("../models/Profile").Profile;
const mongo = require('mongodb');
const readDocument = require('../api/mongodb.api').readDocument;
const {generatePassword} = require('../models/password-generator');
const Router = require('@koa/router');
const {updateDocument} = require("../api/mongodb.api");
//endpoint first url
const router = new Router({prefix:'/login'});

router.post("/",async ctx=>{
    const nic = ctx.request.body.nic;
    const password = ctx.request.body.password;
    //console.log("password:"+password);
    ctx.response.set('content-type','application/json');
    let userVerified = false, found = false;
    await readDocument(Profile.PROFILE_COLLECTION_NAME,"nic",nic).then(
        function (results){
            if(results.length>0) {
                found = true;
                let profile = new Profile();
                Object.assign(profile, results[0]);
                profile.setPasswordDb(results[0].password);
                userVerified = profile.passwordVerified(password);
                //console.log("user found: verified?"+userVerified);
                if (userVerified) {
                    if(typeof profile.status !== "undefined"){
                        if(profile.status === "ban"){
                            ctx.body = "error:Account has been banned!";
                        }else{
                            //unbanned user
                            //success - pass user id
                            ctx.body = "success:" + profile.role + ":" + profile._id.toString();
                        }
                    }else{
                        //user verified and has no previous bans
                        //success - pass user id
                        ctx.body = "success:" + profile.role + ":" + profile._id.toString();
                    }
                } else {
                    //error - warn user
                    ctx.body = "error:Invalid credentials!";
                }
            }
        }
    )
    if(!found){
        //error - warn user
        ctx.body = "error:Invalid credentials!";
    }
})

router.post("/reset",async ctx=>{
    const nic = ctx.request.body.nic;
    const email = ctx.request.body.email;
    ctx.response.set('content-type','application/json');
    let found = false;
    await readDocument(Profile.PROFILE_COLLECTION_NAME,"nic",nic).then(
        function (results){
            if(results.length>0){
                found = true;
                let profile = new Profile();
                Object.assign(profile,results[0]);
                if(profile.email===email){
                    //success - generate password
                    const newPassword = generatePassword();
                    profile.setPasswordDoubleHash(newPassword);
                    updateDocument(Profile.PROFILE_COLLECTION_NAME,"nic",nic,profile.getProfileData());
                    ctx.body = "success:"+newPassword;
                }else{
                    //error - warn user
                    ctx.body = "error:Invalid credentials!";
                }
            }
        }
    )
    if(!found){
        //error - warn user
        ctx.body = "error:Invalid credentials!";
    }
})
exports.LoginEndpoint=router;