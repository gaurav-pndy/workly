# **Workly - Job Portal**

**Workly** is a job portal designed to connect recruiters and job seekers through a modern and responsive web application. It provides a seamless experience for posting, searching, and applying for jobs, with features that cater to both job seekers and recruiters.

---

## **Features**

### **For Job Seekers:**

- **Search and Browse Jobs**: Discover a wide range of job opportunities.
- **Save Jobs**: Bookmark jobs for easy access later.
- **Apply for Jobs**: Submit applications directly through the platform.

### **For Recruiters:**

- **Post Job Openings**: Share new job opportunities with the community.
- **Manage Job Listings**: Open or close job postings as needed.
- **Track Applications**: Monitor and manage applications for each job posting.

### **Authentication and Security:**

- Secure login and user authentication powered by [Clerk](https://clerk.dev/).
- Personalized dashboards for both job seekers and recruiters.

### **Interactive and Responsive UI:**

- Built with **React** and **Tailwind CSS** for a smooth user experience.
- Optimized for desktop and mobile devices.

### **API Integration:**

- Backend APIs to handle job listings, applications, and hiring statuses.
- Custom `useFetch` hook for streamlined API calls.

---

## **Technologies Used**

### **Frontend:**

- **React**: A component-based JavaScript library for building the user interface.
- **Tailwind CSS**: A utility-first CSS framework for responsive and customizable styling.

### **Authentication:**

- **Clerk**: Simplifies user authentication and manages user sessions securely.

### **State Management:**

- React hooks for managing component state.

### **Routing:**

- **React Router**: For dynamic navigation and route management.

### **API Handling:**

- Custom-built hooks for fetching and managing data from the backend.

---

## **How It Works**

### **For Job Seekers:**

1. **Login**: Securely log in using your account.
2. **Explore Jobs**: Browse job postings based on your skills and preferences.
3. **Save or Apply**: Save jobs for later or apply directly via the platform.

### **For Recruiters:**

1. **Login**: Access your personalized recruiter dashboard.
2. **Post Jobs**: Share new opportunities with a detailed job description.
3. **Manage Listings**: Update hiring statuses or remove job postings as required.

---

## **Getting Started**

### **Prerequisites**

- [Node.js](https://nodejs.org/) installed on your machine.
- An account with [Clerk](https://clerk.dev/) to manage authentication.
- Backend API URL (for managing job listings and applications).

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/gaurav-pndy/workly.git
   cd workly
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a .env file in the root directory.
   - Add the following:

   ```env
   VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
   VITE_API_BASE_URL=<your-api-base-url>
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   **For live demo, go to [workly](https://pathfinder-eight.vercel.app/)**
