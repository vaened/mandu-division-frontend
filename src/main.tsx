import React from 'react'
import ReactDOM from 'react-dom/client'
import OrganizationPanel from "./pages/organizations/OrganizationPanel.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <OrganizationPanel />
  </React.StrictMode>,
)
