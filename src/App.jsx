import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Details, { loader as detailsLoader } from './Pages/Movies/Details';
import AppLayout from './AppLayout';
import NotFound from './Pages/NotFound/NotFound';
import { Provider } from 'react-redux';
import store from './store/store';
import Movies from './Pages/Movies/Movies';
import Search from './Pages/Search/Search';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/movies', element: <Movies /> },
      { path: '/search', element: <Search /> },
      // { path: '/details/:id', element: <Details /> },
      {
        path: '/details/:id',
        element: <Details />,
        loader: detailsLoader,
        errorElement: <NotFound />,
      },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

function App() {
  return  <Provider store={ store }>
            <RouterProvider router={ routes } />
          </Provider>
  // (
  
    // <>
      {/* <BrowserRouter>
        <ResponsiveAppBar />
        <div className='mx-auto max-w-screen-xl my-5'>
          <div className='mx-4'>
            <Routes>
            
              <Route index element={<Home />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/price' element={<Price />} />
              <Route path='/products' element={<Products />} />
              <Route path='/details/:id' element={<Details />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter> */}
    // </>
  // );
}

export default App
