"use client";

import Divider from "@/components/divider";
import firebase from "@/firebase/clientApp";
import Image from "next/image";
import { FaGithub, FaGoogle } from "react-icons/fa";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

export default function Login() {
  const auth = getAuth();
  const providerGithub = new GithubAuthProvider();
  providerGithub.addScope("repo");

  const providerGoogle = new GoogleAuthProvider();
  providerGoogle.addScope("https://www.googleapis.com/auth/contacts.readonly");

  const handleLoginGoogle = () => {
    console.log("Login with Google");
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log({ user, token, credential });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log({ errorCode, errorMessage, email, credential });
      });
  };

  const handleLoginGithub = () => {
    signInWithPopup(auth, providerGithub)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        console.log({ user, token, credential });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-evenly md:h-screen">
      <div className="flex items-center sm:p-4 md:p-0 justify-center w-full md:w-1/2 shadow rounded overflow-hidden">
        <Image
          src="https://picsum.photos/800/600"
          alt="Login Image"
          width={800}
          height={600}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/4">
        <div className="w-full max-w-md space-y-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Please sign in to your account.
            </p>
          </div>
          <div className="flex justify-between gap-4">
            <button
              onClick={handleLoginGoogle}
              className="border hover:opacity-60 duration-300 border-slate-300 p-3 rounded flex-1 flex justify-center"
            >
              <FaGoogle />
            </button>
            <button
              onClick={handleLoginGithub}
              className="border hover:opacity-60 duration-300 border-slate-300 p-3 rounded flex-1 flex justify-center"
            >
              <FaGithub />
            </button>
          </div>
          <Divider label="or" />
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block font-bold text-gray-700 dark:text-gray-300"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 text-black"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block font-bold text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 text-black"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 font-bold bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 text-white"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
