import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    // -------------------Base of User Route Layout------------------
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
  return (
    <div>
        
         <div className="admin-main">
            {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
            <div className="main-content" style={{ marginLeft: isSidebarOpen ? '200px' : '50px' }}>
                {/* <AdminsHeader isSidebarOpen={isSidebarOpen} /> */}
                <div className="page-content">
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MainLayout
