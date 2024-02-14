"use client";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/Card";

export default function Order() {
	const [books, setBooks] = useState([]);
	useEffect(() => {
		const token = localStorage.getItem("token");

		axios
			.get("http://localhost:4000/api/order", {
				headers: { auth: token },
			})
			.then(function (response) {
				// handle success
				setBooks(response.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-8">
			<Navbar />
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{books.map((book) => (
					<BookCard key={book.id} book={book.books} ordered={true} />
				))}
			</div>
		</main>
	);
}
