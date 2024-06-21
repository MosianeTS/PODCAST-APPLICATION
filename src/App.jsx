import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PodcastDetails from './components/PodcastDetails';
import Navbar from "./components/Navbar";
import CarouselComponent from "./components/Carousel";
import Homepage from "./components/Homepage";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <CarouselComponent />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/podcast/:id" element={<PodcastDetails/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}