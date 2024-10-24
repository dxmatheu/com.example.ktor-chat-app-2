
# Real-Time Chat Application

This is a real-time chat app built using Ktor for the backend, KMongo for data management with MongoDB, and a frontend using HTML, JavaScript, and Bootstrap. The app leverages WebSocket technology for efficient, real-time communication between users.

## Key Features
- **Backend:** Ktor-based server with WebSocket communication and MongoDB data persistence.
- **Frontend:** Responsive interface using Vanilla JS, HTML, and Bootstrap.
- **Deployment:** Hosted on Azure with Nginx handling secure connections.

## Running the app

Since our backend is set up using Self Signed Certificates for SSL, most navigators will block the calls form our app to the backend. For this we have the following work around:

1. make a direct call to the backend from the server: [Backend Request](https://20.197.231.243/messages)
2. The browser will give us an alert about a not secure website (due to our certificates)
3. click on continue to site
4. The browser will add our ip to a safe list and the app will be able to communicate with the backend: [FrontEnd page](https://white-tree-07a4b041e.5.azurestaticapps.net/)

## Documentation


[Documentation](https://laced-linen-c80.notion.site/Documentation-for-Real-Time-Chat-1280f6b2dfe780c0bdd7eb7e94767f07) 
