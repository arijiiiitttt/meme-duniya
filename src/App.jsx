import React from 'react';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import Home from './components/Home';

function App() {
  return (
    <>
      <SignedOut>
        <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div style={{ maxWidth: '400px', width: '100%', padding: '20px' }}>
            <SignIn
              path="/"
              routing="path"
              afterSignInUrl="/"
              afterSignUpUrl="/"
            />
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
