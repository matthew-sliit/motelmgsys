const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
//setup server
const server = new Koa();
//controllers
const RegisterEndpoint = require("./endpoints/register.router").RegisterEndpoint;
const LoginEndpoint = require("./endpoints/login.router").LoginEndpoint;
const AccountManagerEndpoint = require("./endpoints/account-manager.router").AccountManagerEndpoint;
const ProfileEndpoint = require("./endpoints/profile.router").ProfileEndpoint;
const BarManagementEndpoint = require("./endpoints/bar-management.router").BarManagementEndpoint;
const ReservationEndpoint = require('./endpoints/reservation.router').ReservationEndpoint;
const HousekeepingEndpoint = require('./endpoints/housekeeping.router').HousekeepingEndpoint;
const MaintenanceEndpoint = require('./endpoints/maintenance.router').MaintenanceEndpoint;
//server usable
server.use(cors('Access-Control-Allow-Origin'));
server.use(bodyparser())
    .use(RegisterEndpoint.routes()).use(RegisterEndpoint.allowedMethods())
    .use(LoginEndpoint.routes()).use(LoginEndpoint.allowedMethods())
    .use(AccountManagerEndpoint.routes()).use(AccountManagerEndpoint.allowedMethods())
    .use(ProfileEndpoint.routes()).use(ProfileEndpoint.allowedMethods())
    .use(BarManagementEndpoint.routes()).use(BarManagementEndpoint.allowedMethods())
    .use(ReservationEndpoint.routes()).use(ReservationEndpoint.allowedMethods())
    .use(HousekeepingEndpoint.routes()).use(HousekeepingEndpoint.allowedMethods())
    .use(MaintenanceEndpoint.routes()).use(MaintenanceEndpoint.allowedMethods())
    .use(context=>{
    //where the request is to an invalid endpoint
    context.body="Access Denied!";
    //context.redirect('http://localhost:1234/backendbrowser/index.html');
});
server.listen(5001);
console.log("Application is running on port 5001");