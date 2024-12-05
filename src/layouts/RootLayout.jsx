import {Outlet, Link } from "react-router-dom"
import "./rootLayout.css"
import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react"
import { clearUpiId } from "../utils/upiStorage"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const RootLayout = () => {
  const handleSignOut = (userId) => {
    clearUpiId(userId);
  };

  return (
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      afterSignOutUrl="/"
      signOutCallback={handleSignOut}
    >
      <div className="rootLayout">
        <header>
          <Link to="/" className="logo">
            <img src="/logo.avif" alt="" />
            <span className="appname">StreamManage</span>
          </Link>
          <div className="user">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
      </div>
    </ClerkProvider>
  );
};

export default RootLayout;