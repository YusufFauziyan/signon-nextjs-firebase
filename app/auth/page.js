"use client";

import React, { useEffect } from "react";
import $ from "jquery";
import PocketBase from "pocketbase";

export default function OAuthLinks() {
  useEffect(() => {
    const pb = new PocketBase("http://127.0.0.1:8090");
    const redirectUrl = "http://localhost:3000/redirect";

    async function loadLinks() {
      try {
        const authMethods = await pb.collection("users").listAuthMethods();
        const listItems = [];

        for (const provider of authMethods.authProviders) {
          const $li = $(`<li><a>Login with ${provider.name}</a></li>`);

          $li
            .find("a")
            .attr("href", provider.authUrl + redirectUrl)
            .data("provider", provider)
            .click(function () {
              localStorage.setItem(
                "provider",
                JSON.stringify($(this).data("provider"))
              );
            });

          listItems.push($li);
        }

        const $list = $("#list"); // Select the list element
        $list.html(
          listItems.length ? listItems : "<li>No OAuth2 providers.</li>"
        );
      } catch (error) {
        console.error("Error loading OAuth2 providers:", error);
      }
    }

    loadLinks();
  }, []);

  return (
    <div>
      <ul id="list">
        <li>Loading OAuth2 providers...</li>
      </ul>
    </div>
  );
}
