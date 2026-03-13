APP FOLDER contains the .jsx of ur app
ASSETS FOLDER contains the image source u use in the app
COMPONENT FOLDER contains the Theme stylesheet u make


mARCH 10, 2025

1. # index.jsx (Splash/Loading Screen)
Goal: Display the app’s logo on the splash screen during the loading phase.
Steps:
Add the app logo in the center of the splash screen.
Use an Image component to display the logo and ensure it’s sized appropriately.
Set a 2-second loading duration before navigating to the login screen.

2. # User_Login.jsx (Login Screen)
Goal: Add a password visibility toggle (eye icon) for the login form.
Steps:
Introduce a password field that hides the entered password by default.
Add an eye icon next to the password field to toggle visibility (show/hide the password).
Use a state variable to manage the visibility of the password (to toggle the secureTextEntry attribute of the TextInput).
Ensure the eye icon changes (e.g., "eye" when visible and "eye-off" when hidden).

3. # User_Register.jsx (Registration Screen)
Goal: Enhance the registration screen by adding more fields and a password visibility toggle.
Steps:
Add the password visibility toggle (same as in the login screen).
Include additional input fields such as:
Phone number
Address
Any other necessary details for user registration.
Ensure all the fields are aligned properly, and the overall design is user-friendly.

4. # User_Home.jsx (Home/Dashboard)
Increase the height of the MapView for better visibility and interaction.
In the Recent Incident Cards, add:
An icon (e.g., a warning or alert icon).
The incident title.
A brief description of the incident.
The time of the incident (e.g., "5 minutes ago").

5. # User_Map.jsx (Map Screen)
Goal: Improve the map screen layout and add filtering options.
Steps:
When the filter icon is clicked, show a dropdown form that includes:
A search bar for the user to search for incidents.
A dropdown for incident types (e.g., crime, accidents).
A dropdown for time ranges (e.g., 24 hours, 48 hours, etc.).
Add at least 6 sample time range options such as:
24 hours ago, 48 hors ago, 1 week ago, 2 weeks ago, 1 month ago, 3 months ago
Increase the height of the MapView to give more space for the map.

6. # User_Map.jsx (Continued)
Goal: Show incident statistics and list below the map.
Steps:
Below the map, show the total count of incidents for the area currently displayed.
Display a list of incidents in the current map area, providing details like:
Incident title
Description
Incident time

7. # User_Report.jsx (Reports Screen)
Ensure that the layout is responsive and visually balanced between the header and the button.


- Header Section (Reports Overview)
Title:
Reports: This is the main heading of the reports section, prominently displayed at the top of the screen.

Filters Section:
Viewing Filter Dropdown: Displays options for filtering the reports by type (e.g., "Robbery"). Users can click on different types of crime (like Robbery 10 in the example) to view related reports. # PLEASE CHANGE THE FILTER i think its kinda messy

Clear Filter Button: A button to reset all applied filters. It clears any selections made under the "Viewing" filter section.




8. # User Tips
 - Header Section (Safety Tips Overview)
Title:

Safety Tips: The main heading of this section, which indicates that the content will focus on safety-related advice.
New Safety Tip Banner:
New Safety Tip: A highlighted section at the top that displays an urgent or newly updated tip. It’s in a yellow banner with an icon (lightbulb) to grab attention.
Tip Title: "Be Aware of Your Surroundings" - The main message that encourages users to stay alert and avoid distractions, especially when walking at night.
Tip Description: A brief explanation: "Always stay alert and pay attention to what is happening around you. Avoid distractions like using phone when walking outside at night."

Read More Button: A button labeled "Read More" at the bottom of the new safety tip, allowing users to access more detailed information.

 - Safety Tip Categories (List of Tips)

These are specific safety tip categories that are listed below the new tip:
Category Title & Description:
Personal Safety Tips: Tips for staying safe in urban environments. A short description follows, encouraging users to learn more.
Walking Alone At Night: A safety tip for individuals walking alone at night, emphasizing caution.
Commute Protection: Advice for safe public transit and commuting practices.
Home and Property Security: Safety measures to secure homes and belongings effectively.
Each category has a right-arrow icon (▶) next to it, indicating that more detailed content is available for each section. These sections likely lead to full articles or more tips when clicked.

 - Emergency Numbers Section
Emergency Contact Information:
Call 911 Emergency: A prominent red button that allows users to call emergency services directly. The button is large, making it easy to spot.
Nearby Police: Contact information for the nearest police station, displayed with a placeholder for a phone number (e.g., "XXXX-XXX-XXXX").


- User Interaction Elements:
Read More Button: Clicking on the "Read More" button for the new safety tip allows users to explore further details about the tip.
Category Links: Each category (e.g., "Personal Safety Tips", "Walking Alone At Night") has a clickable arrow, likely leading to more detailed information on that specific safety topic.

9. # User_Settings.jsx
- Header Section (Settings Overview)

Title:
Settings: This is the main header for the settings screen, indicating that the options below will allow the user to customize their preferences.

-  Settings Categories (List of Options)
Personal Information:
Category Title: "Personal Information"
Description: This section allows users to manage their profile, phone number, and password.
Arrow Icon: A right-facing arrow (▶) indicates that clicking this item will navigate to a more detailed screen where users can update their personal information.
Notifications:
Category Title: "Notifications"
Description: Users can manage notifications for crime alerts, safety tips, and high-risk alerts.
Toggle Switch: A toggle switch (ON/OFF) allows the user to enable or disable notifications for these categories. The switch is currently ON, indicating that notifications are active.
Crime Alert Settings:
Category Title: "Crime Alert Settings"
Description: Users can configure alerts for crime reports in their area. This likely allows them to set the type of alerts they wish to receive based on location or incident type.
Arrow Icon: A right-facing arrow (▶) indicates that this section leads to more settings for customizing crime-related alerts.
Privacy & Security:
Category Title: "Privacy & Security"
Description: This section lets users manage location sharing and data security settings to ensure their privacy.
Arrow Icon: A right-facing arrow (▶) suggests further options related to privacy and security management.
Help & Support:
Category Title: "Help & Support"
Description: Provides access to the FAQ, contact customer service, and the option to report issues.
Arrow Icon: A right-facing arrow (▶) leads to a section with support resources or contact options.


- Design & Visual Styling Details:

Background Colors: The settings sections are displayed against a clean white background, ensuring the text and icons are easy to read.
Icons: Each section has a location pin icon (⚑), providing a visual cue that each setting is related to location-based services or preferences.
Spacing and Alignment: The sections are well-spaced with clear headings and descriptions. Each item is followed by an arrow icon, indicating additional details or screens.

- User Interaction Elements:

Arrow Icons: Clicking on the arrow will likely open the respective section to modify settings or navigate to more detailed options.
Toggle Switch for Notifications: The toggle switch allows users to turn on/off notifications, making it an interactive element for controlling notification preferences.


# LACK OF UI IN FIGMA #
1. When i click New post, the form ui
2. Forgot Password ui
3. Notification Box ui
4. Personal Information Layout

# UI THAT NEED TO BE IMPROVE #
1. FILTER BOXes and dropdown
