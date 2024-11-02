import Sidebar from "./components/Sidebar"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar will be permanent here */}
          <Sidebar />
          {/* Main content area */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}