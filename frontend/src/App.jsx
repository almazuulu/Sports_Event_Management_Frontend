import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthContextProvider } from "./context/AuthContext";

// PAGES LAYOUT
import RootLayout from "./pages/RootLayout";
import PageRootLayout from "./pages/PageRoot";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import SettingsRootLayout from "./pages/SettingsRoot";

// PAGES
import LoginPage from "./pages/LoginPage";
import MyProfilePage from "./pages/MyProfile";
import ChangePasswordPage from "./pages/ChangePassword";
import LogoutPage from "./pages/Logout";
import TeamsPage from "./pages/Teams";
import MyTeamsPage from "./pages/MyTeams";
import TeamDetailsPage from "./pages/TeamDetails";
import PlayersPage from "./pages/Players";
import ManageEventsPage from "./pages/Admin-panels/ManageEvents";
import ManageSportEventsPage from "./pages/Admin-panels/ManageSportEvents";
import ManageTeamRegistrationsPage from "./pages/Admin-panels/ManageTeamRegistrations";
import DashboardPage from "./pages/PublicDashboard/Dashboard";
import FixturesPage from "./pages/PublicDashboard/Fixtures";
import ResultsPage from "./pages/PublicDashboard/Results";
import StatsPage from "./pages/PublicDashboard/Stats";
import ManageUsersPage from "./pages/Admin-panels/ManageUsers";
import ManageTeamsPage from "./pages/Admin-panels/ManageTeams";
import ManageGamesPage from "./pages/Admin-panels/ManageGames";
import TeamsdetailPage from "../../frontend/src/pages/PublicDashboard/TeamDetails";
import PublicTeamsPage from "../../frontend/src/pages/PublicDashboard/Team";

import PlayerList from "../../frontend/src/pages/PublicDashboard/Players";
import ManageGamesDetailsPage from "./pages/Admin-panels/ManageGamesDetails";
import GameDetailsPage from "./pages/team-manager/GameDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          { index: true, element: <DashboardPage /> },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "logout",
            element: <LogoutPage />,
          },
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
            element: <PageRootLayout />,
            children: [
              { index: true, element: <PublicTeamsPage /> },
              {
                path: ":teamId",
                element: <TeamsdetailPage/>
              },
            ],
          },
          {
            path: "players",
            element: <PageRootLayout />,
            children: [
              { index: true, element: <PlayerList /> },
              {
                path: ":playerId",
                element: <PlayerProfile/>
              },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "settings",
            element: <SettingsRootLayout />,
            children: [
              {
                // ADMIN
                element: <ProtectedRoute allowedRoles={["admin"]} />,
                children: [
                  {
                    path: "manage-users",
                    element: <ManageUsersPage />,
                  },
                  {
                    path: "manage-events",
                    element: <ManageEventsPage />,
                  },
                  {
                    path: "manage-sport-events",
                    element: <ManageSportEventsPage />,
                  },
                  {
                    path: "manage-teams",
                    element: <PageRootLayout />,
                    children: [
                      {
                        index: true,
                        element: <ManageTeamsPage />,
                      },
                      {
                        path: ":teamId",
                        element: <TeamDetailsPage />,
                      },
                    ],
                  },
                  {
                    path: "manage-registrations",
                    element: <ManageTeamRegistrationsPage />,
                  },
                  {
                    path: "manage-games",
                    element: <PageRootLayout />,
                    children: [
                      {
                        index: true,
                        element: <ManageGamesPage />,
                      },
                      {
                        path: ":gameId",
                        element: <ManageGamesDetailsPage />,
                      },
                    ],
                  },
                ],
              },
              {
                // TEAM MANAGER
                element: <ProtectedRoute allowedRoles={["team_manager"]} />,
                children: [
                  {
                    path: "organize-teams",
                    element: <PageRootLayout />,
                    children: [
                      {
                        index: true,
                        element: <MyTeamsPage />,
                      },
                      {
                        path: ":teamId",
                        element: <PageRootLayout />,
                        children: [
                          {
                            index: true,
                            element: <TeamDetailsPage />,
                          },
                          {
                            path: "games/:gameId",
                            element: <GameDetailsPage />,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                // PLAYER
                element: <ProtectedRoute allowedRoles={["player"]} />,
                children: [
                  {
                    path: "my-team",
                    element: <PageRootLayout />,
                    children: [
                      {
                        index: true,
                        element: <MyTeamsPage />,
                      },
                      {
                        path: ":teamId",
                        element: <TeamDetailsPage />,
                      },
                    ],
                  },
                ],
              },
              {
                path: "my-profile",
                element: <MyProfilePage />,
              },
              {
                path: "change-password",
                element: <ChangePasswordPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <ToastContainer theme="colored" style={{ zIndex: 9999 }} />
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
