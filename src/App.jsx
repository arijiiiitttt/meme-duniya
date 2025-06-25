import React from 'react';
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react';
import Home from './components/Home';

function App() {
  return (
    <>
      <header>
        <SignedOut>
          {/* No SignInButton here, SignIn component is directly rendered */}
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <SignedOut>
        <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div style={{ maxWidth: '400px', width: '100%', padding: '20px' }}>
            <SignIn path="/" routing="path" />
          </div>
        </main>
      </SignedOut>

      <SignedIn>
        <main>
          <Home />
        </main>
      </SignedIn>
    </>
  );
}

export default App;
