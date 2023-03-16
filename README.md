# **Restaurant ChatBot**

**A Restaurant chatbot that assist customers in placing orders for their preferred meals.**

-----
### Base URL
  [Live Link](https://restaurant-chatbot.onrender.com)

---

## **User Documentation**

### **Introduction:**
Restaurant Chatbot is a Number Select System Chatbot that assist customers in placing orders for their preferred meals.

The chatbot has been designed to present a menu of options to users, with each option assigned a corresponding number. Users can then select their desired option by typing in the corresponding number.

### **Getting Started:**

Users initiate a chat session with the bot by visiting this [URL](https://restaurant-chatbot.onrender.com) or setting up a local server as instructed in the [setup section](#setup) of this documentation.  
Upon connection, for first-time users the chatbot will ask to input username while for returning users it proceeds to a welcome message and a list of available options.

### **Menu Options:**
To select an option, the user simply needs to type in the corresponding number and press the "send" button. The chatbot will then respond with further instructions or information depending on the user's selection.
For example:

- Select 1 to Place an order
   - select 1: pizza #1700
     - how many pizza? [1 to 9]
       > pizza added to order
     - select 0 to cancel
   - select 2: Chips #900
   - ....
   - select 0: cancel
   - select 99: more items
- Select 99 to checkout order
- Select 98 to see order history
- Select 97 to see current order
- Select 0 to cancel order
   
**Placing an Order**   
When the user selects option 1 from the main menu, they will be prompted to select an item from the menu. The menu consists of a list of available items, each of which is assigned a unique ID. The user must input the ID of the item they wish to order and then futher select how many of that item should be added.

**Checkout Order**   
When the user selects option 99 from the main menu, the chatbot will check if there are any items in the current order. If there are, the current order will be cleared and added to the order history. If there are no items in the current order, the chatbot will inform the user that there are no items in the current order.

**View Order History**  
When the user selects option 98 from the main menu, the chatbot will display a list of all previous orders, each of which will be identified by an order number.

**View Current Order**  
When the user selects option 97 from the main menu, the chatbot will display a list of items in the current order.

**Cancel Order**  
When the user selects option 0 from the main menu, the chatbot will clear the current order



### **Error Handling:**
The chatbot has been designed to handle errors gracefully and provide helpful feedback to users when they make mistakes. If a user types in an invalid option or enters an incorrect format, the chatbot will respond with an `Invalid Input` and then present the available options again.

### **Conclusion:**
The Restaurant Chatbot is a useful tool that can save time, cost and improve customers satisfaction.  
By presenting a menu of options and allowing users to select their desired option using numbers, the chatbot makes it easy for users to navigate through a series of options and find the information they need.

---
## **Technical Documentation**

### System Architecture

The system architecture of the chatbot can be divided into two main components:

1. Server-side
2. Client-side

### Server-Side
The server-side component of the chatbot is responsible for handling incoming requests from the client and processing them. It is built using Node.js and Express.js and uses Socket.io for real-time communication with the client.

- ### Design

  <img src="https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOQxt0uu48uflOnyscRCPxz3o8893LrLEOJc1Rstuk1csCgFj6ryze1H744Ruhh1OAYYz_SwIggAUr1OToKXFQbARFz0=w2572-h5706" height="300px" >   

  **Flowchat**

  A tree data structure was used to represent a sequence of user inputs, where each node represents an input and its children represent the possible next inputs. This would allow the system to remember the user's previous inputs and provide the appropriate options for the user to select from based on their previous inputs.
  
- ### Modules
  The server-side component consists of the following modules:
  - app.js - This is the main server file that initializes the Express.js server and sets up the Socket.io connection   
  - navigationTree.js - This module implements the tree data structure that is used to keep track of the user's previous inputs.
  - botResponse.js - handles calling methods, emiting message to front end
  - response-methods - This module holds the various method attached to the nodes on the tree data structure  
  - Session Data - This Implement creation and managemen of chat session data including the tree, orders etc 

### Client-Side
  - index.html - This is the HTML file for the chat interface. it contains the CSS and JS (to keep project simple)

### **Setup**

### Requirements  - *Node.js*
      
### Steps
- Pull this repo
- Go to the root directory and run  `npm i` to install dependencies
- Create a .env file in the root directory and add the following:
     - PORT
     - MONGODB_URI
     - SESSION_SECRET
- Run  `npm start`
- Visit `http:localhost:{PORT}` in your browser

### Dependencies
- `express` - web application framework 
- `express-session` - manage session
- `connect-mongodb-session` - manage session store
- `socket.io` - Established real-time communication between the client and server
- `winston` - loggings
- `dotenv` - read environment variables

### Other Features:
- Multi-tab management - Sync multiple tabs
- Logging - save log data in `./logger` folder

### Conclustion

The Restaurant chatbot system is a powerful tool for providing users with an intuitive and user-friendly interface for carrying out various tasks. With its robust features, architecture this project can also be extended to have support USSD transactions.



