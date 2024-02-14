"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { redirect } from "next/navigation";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [data, setdata] = useState({});

	const handleLogin = () => {
		const data = { username, password };
		axios
			.post("http://localhost:4000/api/auth/login", data)
			.then(function (response) {
				// handle success
				if (response.status === 200) {
					setdata(response);
					localStorage.setItem("token", response.data);
					window.location.href = "/";
				}
			})
			.catch(function (error) {
				// handle error
				toast.error("Unable to Login", {
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
	};

	useEffect(() => {
		if (Object.values(data).length > 0) {
			console.log(data);
			toast.success("User Successfully Logged IN !!!", {
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
		}
	}, [data]);

	return (
		<>
			<Navbar />
			<ToastContainer />
			<div className="bg-grey-lighter min-h-screen mt-8 flex flex-col">
				<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
					<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
						<h1 className="mb-8 text-3xl text-center">Login</h1>
						<input
							type="text"
							className="block border border-grey-light w-full p-3 rounded mb-4"
							name="username"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>

						<input
							type="password"
							className="block border border-grey-light w-full p-3 rounded mb-4"
							name="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<button
							type="button"
							className="w-full text-center py-3 rounded bg-green-200 text-green hover:bg-green-dark focus:outline-none my-1"
							onClick={handleLogin}
						>
							Login
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

export default Login;
