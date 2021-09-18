cd server
start "SERVER" cmd /k "echo Starting Server... & npm start"
cd ..\
cd client
start "FRONTEND SERVICE" cmd /k "echo Starting Visitor Service... & npm start"
start "" "http://localhost:1234"