import {Routes, Route, BrowserRouter} from 'react-router-dom';
import LandingPage from './components/landing/LandingPage.jsx';
import ContactPage from "./components/landing/ContactPage.jsx";

function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />}>
                {/*<Route index element={<Home />} />*/}
                {/*<Route path="blogs" element={<Blogs />} />*/}
                <Route path="contact" element={<ContactPage />} />
                {/*<Route path="*" element={<NoPage />} />*/}
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
