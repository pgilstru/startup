# grocerease

## Elevator Pitch

Have you ever had a conflict with your roommates over forgetting an item when grocery shopping, or ever wanted to help your roommates with their own grocery shopping? Sending a bunch of texts a day containing items you or the apartment needs can get hard to keep track of, as those texts get lost in a sea of other messages. The application “grocerease” streamlines the process of having an up to date, and organized grocery list available for you and your roommates. As each roommate adds items to the list, deletes an item, or checks one off, these updates are displayed in realtime for the other roommates! Keep track of your list, and easily add items as they come to mind with grocerease.


## Design

The application's Login page:
![LoginPage](Pics/grocereaseLoginPageSS.png)
The application's Register page:
![RegisterPage](Pics/grocereaseRegisterPageSS.png)
The application's Main page:
![ApplicationMainPage](Pics/grocereaseMainPageSS.png)


## Usage of Different Technologies

- **HTML** - Utilizes the proper HTML structure throughout the entire app. There will be three HTML pages, one for logging in, one for creating an account, and one for viewing and adding grocery list items.
- **CSS** - Styles the application so it is visually appealing with appropriate spacing and color themes, while also offering a responsive design.
- **React** - Manages and provides login, shows grocery list items, lets users add more list items, uses React management features. Utilizes local storage to store authentication details as well as grocery list items.
- **Service** - Backend service with endpoints for:
    - Login
    - Retrieving grocery list items
    - Adding grocery list items
- **DB/Login** - Store current users and their added items in the database. Users will have a group associated with their account, and hashed password also stored in the database. Will be used to login and register users, and unless authenticated will not be able to view the website.
- **WebSocket** - Adds real time updates as each user adds items, their addition is shown to all other users in their group.


## HTML Usage Specifics

For this deliverable, I set up the framework of my application using HTML.

- [x] **HTML pages**: Three HTML pages, one for logging in (login.html), creating an account (register.html), and a home page for viewing and adding list items (index.html).
- [x] **Links**: After successfully authenticating, the login page will automatically link to the grocery list (index.html).
- [x] **Text**: Describes each grocery list item by title added with it.
- [x] **Service**: Displays a random fun fact fetched from an external third-party service. Currently have a placeholder at the bottom of the page.
- [x] **Images**: The application’s logo is a png image displayed on each page.
- [x] **DB/Login**: Includes text input fields for user username and password, as well as a submit button for signing in and creating an account. The displayed grocery list items will be pulled from the database.
- [x] **WebSocket**: The grocery list items and their checked status are updated and managed in realtime between users. As one user adds or changes the status of an item, that is reflected for all other users.

## CSS Usage Specifics

For this deliverable, I applied the final styles to the application, giving it its finished look.

- [x] **Header, footer, and main content body**: Maintain a consistent appearance across all pages including login and registration pages. Includes proper alignment and spacing, and as more items are added the main content body will vertically grow until scrolling is required.
- [x] **Navigation elements**: Simple yet satisfying design for best user experiences. I removed the underlines and changed the color of the anchor elements. On hover, the link is underlined, text and underline change color and have a shadow. The links will only appear when a user is logged in, on index.html.
- [x] **Responsive design**: Utilize media queries and flex and flexbox to ensure a clean and consistent display on all windows and devices regardless of size.
- [x] **Application elements**: Utilize contrasting colors to verify easy to read material, and use appropriate whitespace that is visually satisfying. The entire body is centered and contrasts the main background, giving it an aesthetic appearance.
- [x] **Application text content**: Use consistent text size and fonts for visual appeal and consistency. The headers, such as h1 and h2, are the only ones that differ to make them stand out.
- [x] **Application images**: The logo image fits well and remains consistent along all pages. It looks like it belongs with proper margins, and the website's color themes match the image's to maintain flow and a reliable design.

## React Usage Specifics

For this deliverable, I utilized React to create an interactive user interface and handle the application state. I also used JavaScript in order to add dynamic features and implement the necessary logic used in the application.

- [x] **Bundled and transpiled**: Combined the different assets I previously had into JSX and JavaScript, effectively implementing React. Bundled using Vite.
- [x] **Components**: Login, about, grocery list (home)
    - [x] **Login Component**: Handles user authentication, taking users to the grocery list page after they click the "login" or "create an account" button.
    - [x] **Database Component**: Displays the grocery list items and stores the user's logged in boolean. Currently utilizing local storage to store and retrieve items, but will be replaced with the database data later. (Note: this is represented by grocereaseApp.jsx)
    - [x] **About Component**: Utilizes a third party service, `Random Useless Facts`, and displays a new fact on every refresh. Will clean up when we get to the Service Usage portion of the course.
    - [x] **Home Component**: This is the grocery list page that utilizes the database to display list items. Uses JSX and JavaScript to handle error messages, implement functions, dynamically update content, and make the interface interactive.
- [x] **Router**: Routing between login other components including `home` and `about`. Includes error handling for other, non existant, endpoints, and implements requirements for user's to be signed in to access the home page.
- [x] **Hooks**: Utilize the `useState` hook to track changes and `useEffect` hook to set the fact values for the random useless facts third party service in the `about` component. Also utilized in the `home` component's `grocereaseApp.jsx` to listen for changes and add items to the grocery list.

## Service Usage Specifics

For this deliverable, the backend endpoints handle incoming list items and return the updated lists, overall supporting the functionality of the application as a whole.

- [x] **Node.js/Express HTTP service** - Done!
- [x] **Static Middleware for frontend** - Done!
- [x] **Frontend Third Party Service endpoint** - The about page makes calls to a third party endpoint using fetch; requests are triggered by the React useEffect hook. It makes a call to `uselessfacts.jsph.pl` to get a random useless fact, and onoce the endpoint asynchronously returns, the React state variable is updated and the fact is displayed.
- [x] **Backend service endpoints**: Contains placeholders for authenticating and managing user sessions, stored on the server. Additionally contains placeholders for creating accounts and storing existing accounts on the server. Endpoints for retrieving and managing (deleting, adding, and updating) list items.
- [x] **Frontend service endpoint calls**: Utilize fetch requests to the service and useEffect hooks to reactively display the scores once loaded from the service. Additionally, utilized HTTP methods such as GET, POST, PUT, and DELETE.

## Database/Login Usage Specifics

For this deliverable, I utilize the database for user authentication and link grocery list items to the user, which are also stored in the database.

- **Database**: Will utilize MongoDB Atlas to store user data and grocery list items.
- **User Registration**: New account is created in the database if a user successfully registers.
- **Current Users**: User sessions are managed, passwords are securely stored, and user grocery list items are stored.
- **Access Control**: Cannot view the website or any associated pages or data until successfully authenticated.

## WebSocket Usage Specifics

For this deliverable, I used WebSocket to make real time updates for the grocery list items and their status.

- **WebSocket Connection**: The backend will listen for the WebSocket connection, and the frontend will make that connection.
- **Realtime Data Display**: User grocery list items will be updated in realtime, as they are added, deleted, and checked. The filtering checked items option will be by device, not stored or updated among other devices.