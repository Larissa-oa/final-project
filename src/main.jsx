import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextWrapper } from './contexts/AuthContext.jsx'
import { ForumContextWrapper } from './contexts/ForumContext.jsx'
import { TypeContextWrapper } from './contexts/TypeContext.jsx'
import { MessageProvider } from './contexts/MessageContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <ForumContextWrapper>
      <AuthContextWrapper>
        <TypeContextWrapper>
          <MessageProvider>
          <App />
          </MessageProvider>
        </TypeContextWrapper>
      </AuthContextWrapper>
    </ForumContextWrapper>
  </StrictMode>
  </BrowserRouter>
)
