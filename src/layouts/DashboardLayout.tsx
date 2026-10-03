import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function DashboardLayout() {
const [isSidebarOpen, setIsSidebarOpen] =
useState(false);

return ( <div
   className="
     min-h-screen
     bg-slate-100
     dark:bg-slate-950
   "
 >
<Sidebar
isOpen={isSidebarOpen}
onClose={() =>
setIsSidebarOpen(false)
}
/>


  <main
    className="
      ml-0
      lg:ml-64
    "
  >
    <Header
      onMenuClick={() =>
        setIsSidebarOpen(true)
      }
    />

    <section
      className="
        p-4
        sm:p-6
      "
    >
      <Outlet />
    </section>
  </main>
</div>


);
}

export default DashboardLayout;
