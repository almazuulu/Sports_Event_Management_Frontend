import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import UsersPage from "./pages/Users";
import EventsPage from "./pages/Events";
import MyProfilePage from "./pages/MyProfile";
import ChangePasswordPage from "./pages/ChangePassword";
import SportEventsPage from "./pages/SportEvents";
import PageRootLayout from "./pages/PageRoot";
import LogoutPage from "./pages/Logout";
import TeamsPage from "./pages/Teams";
import MyTeamsPage from "./pages/MyTeams";
import TeamDetailsPage from "./pages/TeamDetails";
import PlayersPage from "./pages/Players";
import PlayerDetailsPage from "./pages/PlayerDetails";
import ManageEventsPage from "./pages/Admin-panels/ManageEvents";
import ManageSportEventsPage from "./pages/Admin-panels/ManageSportEvents";
import ManageTeamRegistrationsPage from "./pages/Admin-panels/ManageTeamRegistrations";
import DashboardPage from "./pages/PublicDashboard/Dashboard";
import FixturesPage from "./pages/PublicDashboard/Fixtures";
import ResultsPage from "./pages/PublicDashboard/Results";
import StatsPage from "./pages/PublicDashboard/Stats";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          { path: "home", element: <DashboardPage /> },
          {
            path: "fixtures",
            element: <FixturesPage />,
          },
          {
            path: "results",
            element: <ResultsPage />,
          },
          {
            path: "stats",
            element: <StatsPage />,
          },
          {
            path: "teams",
            element: <TeamsPage />,
          },
          {
            path: "players",
            element: <PlayersPage />,
          },
        ],
      },
      // {
      //   element: <ProtectedRoute />,
      //   children: [
      //     {
      //       path: "events",
      //       element: <PageRootLayout />,
      //       children: [
      //         {
      //           index: true,
      //           element: <EventsPage />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "sport-events",
      //       element: <PageRootLayout />,
      //       children: [
      //         {
      //           index: true,
      //           element: <SportEventsPage />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "teams",
      //       element: <PageRootLayout />,
      //       children: [
      //         {
      //           index: true,
      //           element: <TeamsPage />,
      //         },
      //         {
      //           path: ":teamId",
      //           element: <TeamDetailsPage />,
      //         },
      //         {
      //           path: "players",
      //           element: <PlayersPage />,
      //         },
      //         {
      //           path: "my-teams",
      //           element: <ProtectedRoute allowedRoles={["team_captain"]} />,
      //           children: [
      //             { index: true, element: <MyTeamsPage /> },
      //             {
      //               path: ":teamId",
      //               element: <TeamDetailsPage />,
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       path: "admin-panel",
      //       element: <ProtectedRoute allowedRoles={["admin"]} />,
      //       children: [
      //         {
      //           path: "manage-users",
      //           element: <UsersPage />,
      //         },
      //         {
      //           path: "manage-events",
      //           element: <ManageEventsPage />,
      //         },
      //         {
      //           path: "manage-sport-events",
      //           element: <ManageSportEventsPage />,
      //         },
      //         {
      //           path: "manage-team-registrations",
      //           element: <ManageTeamRegistrationsPage />,
      //         },
      //       ],
      //     },
      //     {
      //       path: "settings",
      //       element: <PageRootLayout />,
      //       children: [
      //         {
      //           path: "my-profile",
      //           element: <MyProfilePage />,
      //         },
      //         {
      //           path: "change-password",
      //           element: <ChangePasswordPage />,
      //         },
      //         {
      //           path: "logout",
      //           element: <LogoutPage />,
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
]);
function App() {
  return (
    <AuthContextProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
