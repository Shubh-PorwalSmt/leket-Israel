// import { Route, CreateBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import AddField from '../views/AddField'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/addfield",
        element: <AddField />
    }
]);

export default router;

// export const router = (
//     <BrowserRouter>
//       <Header setDensity={setDensity} setSearchText={setSearchText} CustomSearch={CustomSearch} />
//       <br />
//       <Routes>
//         <Route path="/"
//           element={<Home density={density} searchText={searchText} />}>
//         </Route>
//         <Route path="/addfield"
//           element={<AddField />}>
//         </Route>
//       </Routes>
//     </BrowserRouter>
// )