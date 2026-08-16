import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Showcase = lazy(() => import("./pages/Showcase.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));

function PageFallback() {
  return <div className="min-h-[40vh]" aria-hidden />;
}

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageFallback />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="showcase"
            element={
              <Suspense fallback={<PageFallback />}>
                <Showcase />
              </Suspense>
            }
          />
          <Route
            path="services"
            element={
              <Suspense fallback={<PageFallback />}>
                <Services />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<PageFallback />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<PageFallback />}>
                <Contact />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <WhatsAppButton />
    </>
  );
}
