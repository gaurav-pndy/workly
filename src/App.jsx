import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import Onboarding from "./pages/Onboarding";
import JobListing from "./pages/JobListing";
import JobPage from "./pages/JobPage";
import MyJobs from "./pages/MyJobs";
import SavedJobs from "./pages/SavedJobs";
import PostJob from "./pages/PostJob";
import { ThemeProvider } from "./components/ui/theme-provider";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/onboarding",
          element: (
            // <PrivateRoute>
            <Onboarding />
            // </PrivateRoute>
          ),
        },
        {
          path: "/jobs",
          element: (
            <PrivateRoute>
              <JobListing />
            </PrivateRoute>
          ),
        },
        {
          path: "/job/:id",
          element: (
            <PrivateRoute>
              <JobPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/post-job",
          element: (
            <PrivateRoute>
              <PostJob />
            </PrivateRoute>
          ),
        },
        {
          path: "/my-jobs",
          element: (
            <PrivateRoute>
              <MyJobs />
            </PrivateRoute>
          ),
        },
        {
          path: "/saved-jobs",
          element: (
            <PrivateRoute>
              <SavedJobs />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
