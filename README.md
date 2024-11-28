# **Vue Auth Dashboard**

A secure and dynamic Vue.js application featuring authentication and a user dashboard. that use protected routes and data visualization.

---

## **What the Project Does**

The **Vue Auth Dashboard** is a web application that demonstrates:

- Secure **user authentication** using `httpOnly` cookies and JWT.
- A protected **dashboard** that displays user-specific data after login.
- **Dynamic data visualization** with charts to showcase user assets and details.
- A clean and interactive **login flow** integrated with a backend API.

---

## **Why the Project Is Useful**

- **Scalable Architecture**: The integration of Vue 3, Pinia, Axios, and a Node.js backend makes it easy to scale and customize.
- **Secure Practices**: Implements secure authentication with `httpOnly` cookies and session validation via API.
- **Reusable Components**: Modular and reusable components for common features like login forms, charts, and data displays.

---

## **How Users Can Get Started with the Project**

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/b-laztornex/vue-auth-dashboard.git
   cd vue-auth-dashboard
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the root directory:
     ```env
     VUE_APP_API_URL=http://localhost:5001/api
     ```
   - Set up the backend's `.env` file for `JWT_SECRET` and other configurations.

4. **Start the Backend**:

   - Follow the instructions in the backend directory to install dependencies and start the Node.js server.

5. **Run the Frontend**:

   ```bash
   npm run dev
   ```

6. **Access the Application**:

   - Open your browser and navigate to `http://localhost:5173`.
   - User the following credentalas to log in:
   - ```
     username: GoldingAdmin
     password: GoldingAdmin
     ```
