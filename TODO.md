# TODO

### name ideas

- QuipSnip

- Snipski

### TODO FOR MVP

- [ ] implement lazy loading for smaller bundle size

- - only loads neccesary modules depending on where in the page you are

- - ( react suspense )

- [X] set up `.env` and `.env.example`

- [ ] let user know about cookie usage when they first visit the site ( implement modal )

- [ ] post is saved to db with correct user

- [ ] post renders in feed based on time posted, only show 10 most recent posts unless request more

- [ ] **\* \* PRIORITY \* \*** rework UI with shadcn ( particulary with forms for type safety )

- - [ ] sign up page

- - [ ] dedicated login page

- [ ] make landing page able to see feed, but prompted to login

- [x] jwt refresh

- [ ] harden jwt refresh

- - move refresh token to server side only ( currently in httponly cookie )

- - test access token in httponly cookie, might not be entirely feasible

- [ ] comment on other posts

- - [x] comment model in db

- - [ ] can see comments on each post

### polishing

- [ ] write unit tests to improve speed of debugging

- - have unit test passing badges in readme ( .github/workflow config )

- - - make unit tests pass before merging into main

- [ ] css breakpoints for all screens

- [ ] all html elements have full accessibility attributes

### color hexs

main: #599beb
mainSecondary: #6059eb

bg: #1a1f23
bgSecondary: #262d33

### ui ideas

- use cuberto mouse follower, make the website feel like floating / fluid

- make sure things look good on mobile during initial development

- have the gradient text on landing page swap with a rotary animation between Question, Comment, and Answer.

### App function

- code snippet sharing site, similar to stackoverflow but a leaner simplified version w/ new age styling

- After MVP complete add more ideas here
