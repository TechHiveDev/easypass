TODO:

- Serve Qr Code HTML Screen
  1- fix rendering ejs (path)

- Verify The Qr code Scanned ( guest or resident )
  1 - check for invitationid
  2- check for userId and if he is the owner
  3- check expiry
  4- if anything doesnot checkout return invalid qrcode

- Upload Media Service
  1 - handle the logic of storing the media assets
  folder for profiles photo
  folder for compound images
  folder for compounds facilities

- Configure The CI / CD
  1 - validate the dockerization
  1 - github action
  2- jenkins
