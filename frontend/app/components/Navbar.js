// Navbar.js
"use client";
import React, { useState, useEffect } from "react";

import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineNodeCollapse } from "react-icons/ai";
const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [valid, setvalid] = useState(false);
	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/orders", label: "Orders" },
		{ href: "#about-us", label: "About Us" },
		{ href: "#contact-us", label: "Contact Us" },
		{ href: "/signup", label: "Signup" },
		{ href: "/login", label: "Login" },
	];

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setvalid(true);
		}
	}, []);

	console.log("valid", valid);

	return (
		<header className="sm:px-8 px-4 py-2 z-10 w-full">
			<nav className="flex justify-between items-center max-container">
				<a href="/" className="text-3xl text-black font-bold">
					Earn Your Leisure
				</a>
				<ul className="hidden sm:flex flex-1 justify-center items-center gap-16">
					{navLinks.map((link) => (
						<li key={link.label}>
							<a
								href={link.href}
								className="text-lg text-gray-700"
							>
								{link.label}
							</a>
						</li>
					))}
				</ul>
				<div
					className="sm:hidden"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<RxHamburgerMenu className="text-4xl" />
				</div>
			</nav>
			{isMenuOpen && (
				<div className="fixed top-0 right-0 left-0 bottom-0 bg-white z-10">
					<div
						className="absolute top-4 right-4"
						onClick={() => setIsMenuOpen(false)}
					>
						<AiOutlineNodeCollapse className="text-4xl" />
					</div>
					<ul className="flex flex-col items-center justify-center h-full">
						{navLinks.map((link) => (
							<li key={link.label}>
								<a
									href={link.href}
									className="text-lg text-gray-700 my-2"
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</header>
	);
};

export default Navbar;
