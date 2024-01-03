# User Guide 
### *NOTE*
To see forum posts under shows, select a season and episode of a TV show then click the GO button.

To see the new post a user made under a forum, click the GO after clicking submit to refresh the 
page to see most recent post. 

## Installation Guide 
- Goto main page of FlixForum repo
- Clone from the remote repository using SSH or HTTPS (up to you)  
- Use your choice of IDE clone the repo
### Packages and Applications to Install
- Node
  - Download the installer from NodeJS Website.
  - Run the installer.
  - Follow the installer steps, agree the license agreement and click the next button.
  - Restart your system/machine.
- Material UI
  - npm install @mui/material @emotion/react @emotion/styled
  - npm install -f @material-ui/icons
  - npm install -f @material-ui/core
  - npm install @material/card (if card fails to import)
- mySQL (incase installing node isn’t enough to run the database)
  - homebrew install mysql
- UseNavigate 
  - npm install react-use-navigate

## To Start the Web Page Locally
- Type 'npm start' 
- User should see a localhost server open and the web page will open automatically in your browser
  - If it doesn't open automatically, type localhost:3000 in your web page

## To Start the Database (need for full functionality)
- Type in a new terminal 'node index.js'
- Users will now be able to register, login, and see user forum posts
