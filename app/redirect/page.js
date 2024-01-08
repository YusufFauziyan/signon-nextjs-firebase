"use client";

// pages/redirect.js
import { useEffect } from "react";
import PocketBase from "pocketbase";

const RedirectPage = () => {
  useEffect(() => {
    const pb = new PocketBase("http://127.0.0.1:8090");
    const redirectUrl = "http://localhost:3000/redirect";

    const url = new URL(window.location);
    const params = url.searchParams;

    // Load the previously stored provider's data
    const provider = JSON.parse(localStorage.getItem("provider"));

    console.log({ provider, params });

    // Compare the redirect's state param and the stored provider's one
    if (provider.state !== params.get("state")) {
      throw new Error("State parameters don't match.");
    }

    // Authenticate with the OAuth2 code
    pb.collection("users")
      .authWithOAuth2Code(
        provider.name,
        params.get("code"),
        provider.codeVerifier,
        redirectUrl,
        {
          emailVisibility: false,
        }
      )
      .then((authData) => {
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
  }, []);

  return (
    <div>
      <pre id="content">Authenticating...</pre>
    </div>
  );
};

export default RedirectPage;
