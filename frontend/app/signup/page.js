"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";

function Signup() {
	const [username, setusername] = useState("");
	const [password, setpassword] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");
	const [role, setrole] = useState("");

	const handleSignup = () => {
		const data = { username, role, password };
		if (password === confirmPassword) {
			axios
				.post("http://localhost:4000/api/users/create", data)
				.then(function (response) {
					// handle success
					if (response?.status == 201) {
						window.location.href = "/login";
					}
				})
				.catch(function (error) {
					// handle error
					toast.error(`Unable to Register User: ${error?.message}`, {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						transition: Bounce,
					});
					localStorage.removeItem("token");
				});
		}
	};
	return (
		<>
			<Navbar />
			<ToastContainer />
			<div className="bg-grey-lighter min-h-screen mt-8 flex flex-col">
				<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
					<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
						<h1 className="mb-8 text-3xl text-center">Sign up</h1>

						<input
							type="text"
							className="block border border-grey-light w-full p-3 rounded mb-4"
							name="username"
							placeholder="Email"
							value={username}
							onChange={(e) => setusername(e.target.value)}
						/>

						<input
							type="text"
							className="block border border-grey-light w-full p-3 rounded mb-4"
							name="role"
							placeholder="Role"
							value={role}
							onChange={(e) => setrole(e.target.value)}
						/>

						<input
							type="password"
							className="block border border-grey-light w-full p-3 rounded mb-4"
							name="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setpassword(e.target.value)}
						/>
						<input
							type="password"
							className="block border border-grey-light w-full p-3 rounded mb-4"
							name="confirm_password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setconfirmPassword(e.target.value)}
						/>

						<button
							type="button"
							className="w-full text-center py-3 rounded bg-green-200 text-blue hover:bg-green-dark focus:outline-none my-1"
							onClick={handleSignup}
						>
							Create Account
						</button>

						<div className="text-center text-sm text-grey-dark mt-4">
							By signing up, you agree to the
							<a
								className="no-underline border-b border-grey-dark text-grey-dark"
								href="#"
							>
								Terms of Service
							</a>{" "}
							and
							<a
								className="no-underline border-b border-grey-dark text-grey-dark"
								href="#"
							>
								Privacy Policy
							</a>
						</div>
					</div>

					<div className="text-grey-dark mt-6">
						Already have an account?
						<a
							className="no-underline border-b border-blue text-blue"
							href="../login/"
						>
							Log in
						</a>
						.
					</div>
				</div>
			</div>
		</>
	);
}

export default Signup;
