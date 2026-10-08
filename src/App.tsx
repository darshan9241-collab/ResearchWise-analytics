import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'

// Home is eager (first paint); everything else is split into its own chunk.
const Services = lazy(() => import('./pages/Services'))
const ServicePage = lazy(() => import('./pages/ServicePage'))
const DataAnalysis = lazy(() => import('./pages/DataAnalysis'))
const About = lazy(() => import('./pages/About'))
const Insights = lazy(() => import('./pages/Insights'))
const Article = lazy(() => import('./pages/Article'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/data-analysis" element={<Navigate to="/data-analysis" replace />} />
        <Route path="services/:slug" element={<ServicePage />} />
        <Route path="data-analysis" element={<DataAnalysis />} />
        <Route path="about" element={<About />} />
        <Route path="insights" element={<Insights />} />
        <Route path="insights/:slug" element={<Article />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
