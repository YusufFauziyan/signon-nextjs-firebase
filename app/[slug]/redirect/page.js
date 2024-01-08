"use client";

// Import the required dependencies
import React, { useEffect, useState } from "react";
import PocketBase from "pocketbase";

// Initialize PocketBase with auto-cancellation disabled
const pb = new PocketBase("http://127.0.0.1:8090"); // Use your appropriate PocketBase URL here
// pb.autoCancellation = false;

// Create a Login component
export default function Redirect({ params: { slug } }) {
  const [listProvider, setListProvider] = useState(null);
  // Define an async function to handle authentication
  const authWithGoogle = async () => {
    try {
      console.log("Attempting Google OAuth2 authentication...");

      const { authProviders } = await pb.collection("users").listAuthMethods();
      const provider = authProviders.find(({ name }) => name === slug);

      if (!provider) return;
      console.log({ provider });
      pb.collection("users")
        .authWithOAuth2Code(
          provider.name,
          provider.codeChallengeMethod,
          provider.codeVerifier,
          provider.authUrl,
          // pass optional user create data
          {
            emailVisibility: false,
          }
        )
        .then((authData) => {
          console.log({ authData });
          document.getElementById("content").innerText = JSON.stringify(
            authData,
            null,
            2
          );
        })
        .catch((err) => {
          document.getElementById("content").innerText =
            "Failed to exchange code.\n" + err;
        });
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  // Use useEffect to trigger authentication on component mount
  useEffect(() => {
    authWithGoogle();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="flex flex-col h-[100vh] gap-4 items-center justify-center">
      <div className="capitalize" id="content">
        authentication...
      </div>
    </div>
  ); // Render a placeholder login component
}
