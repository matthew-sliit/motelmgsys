cd server
start "SERVER" cmd /k "echo Server installing modules... & npm install"
cd ..\
cd client
start "VISITOR SERVICE" cmd /k "echo Visitor Service installing modules... & npm install"