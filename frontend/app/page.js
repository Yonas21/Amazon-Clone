"use client";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./components/Card";

export default function Home() {
	const [books, setBooks] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:4000/api/books")
			.then(function (response) {
				// handle success
				setBooks(response.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});
	}, []);

	console.log(books);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-8">
			<Navbar />
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{books.map((book) => (
					<BookCard key={book.id} book={book} />
				))}
			</div>
		</main>
	);
}
