To run this contact management app with charts and maps, you'll need to follow these steps:

Prerequisites:

1-Make sure you have Node.js and npm installed on your machine.
2-You should have your API endpoint configured for the COVID-19 data.

Here's a brief documentation on how to run the app:

1-Clone the Repository:
*If you haven't already, clone your project repository to your local machine.

2-Install Dependencies:
*Open your terminal and navigate to the project directory.
*Run npm install to install all the required dependencies.

3-Configure API Endpoint:
*Make sure you have the API endpoint for COVID-19 data properly configured in your ChartsMaps.tsx file.
*Check that the URL provided in the fetch functions in the ChartsMaps.tsx file is correct. It should point to the COVID-19 data API.

4-Run the Application:
*In the terminal, run npm start to start the development server.
*This will compile your React application and open it in your default web browser.

5-Explore the Application:
*You can navigate the app using the menu in the sidebar:
-"Contact" for managing contacts.
-"Charts and Maps" for viewing COVID-19 data charts and maps.

6-Contact Management:
*The "Contact" section allows you to create, edit, and delete contacts.
*Click "Add Contact" to add a new contact.
*Click "Edit" to edit an existing contact.
*Click "Delete" to delete a contact.

7-Charts and Maps:
*The "Charts and Maps" section displays COVID-19 data.
*You can select between "Covid Cases," "Recovered Cases," and "Death Cases" using radio buttons.
*Charts and maps will update based on your selection.
*The maps will display markers for different countries with COVID-19 data.

8-Sidebar Menu:
*You can open and close the sidebar by clicking the menu icon in the top-left corner.
*The sidebar allows you to navigate between sections of the app.

9-Interact with Charts and Maps:
*Interact with the charts and maps to explore COVID-19 data visually.

Note: The app uses React with Redux for contact management and React-Query for fetching COVID-19 data.