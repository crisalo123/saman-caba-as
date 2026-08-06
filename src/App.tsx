import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GalleryPage } from '@/presentation/pages/GalleryPage'
import { HomePage } from '@/presentation/pages/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/galeria" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  )
}
