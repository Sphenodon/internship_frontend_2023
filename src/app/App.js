import React from "react";
import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  isRouteErrorResponse,
  Route,
  RouterProvider,
  useRouteError
} from 'react-router-dom';
import Root from "../components/Root";
import MainPage from '../pages/MainPage'
import GamePage from '../pages/GamePage'

const router = createBrowserRouter( createRoutesFromElements(
        <Route path="/" element={ <Root/> } errorElement={<RootBoundary/>}>
          <Route index element={ <MainPage/> }/>
          <Route path='game/:gameId' element={ <GamePage/> }/>
        </Route>
    )
)

function RootBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return <div>Something went wrong</div>;
}

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
