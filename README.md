## User Guide 
### *NOTE*
To see posts under forums, choose a season and episode of a TV show then click the GO button. 
To see the new post a user made under a forum, click go after clicking submit in the new post modal. 

## Installation Guide 
- First, go to the Flix Forum repository  
- Clone from the remote repository  
- Use your choice of IDE to open the files  
### Packages to install
- Node
  - Download the installer from NodeJS WebSite.
  - Run the installer.
  - Follow the installer steps, agree the license agreement and click the next button.
  - Restart your system/machine.
- Materials UI
  - npm install @mui/material @emotion/react @emotion/styled
  - npm install -f @material-ui/icons
  - npm install -f @material-ui/core
  - npm install @material/card (if card fails to import)
- UseNavigate 
  - npm install react-use-navigate
- Axios  
  - npm install axios
- mySQL (incase installing node isn’t enough to run the database)
  - homebrew install mysql

## To start the server
- type 'npm start' 
- user should see a localhost server open and see the homepage of FlixForum

## To start the database 
- type in a new terminal 'node index.js'
- user should now be able to login and see posts under the forums
