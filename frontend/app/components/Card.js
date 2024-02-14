// BookCard.js
import axios from "axios";
import React from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { Bounce, ToastContainer, toast } from "react-toastify";

function BookCard({ book, ordered }) {
	const handleOrder = () => {
		const token = localStorage.getItem("token");
		const data = { book_id: book.id };
		axios
			.post("http://localhost:4000/api/order", data, {
				headers: { auth: token },
			})
			.then(function (response) {
				// handle success
				if (response?.status == 201) {
					console.log(typeof response.status);
					console.log(response.status);
					window.location.href = "/orders";
				}
			})
			.catch(function (error) {
				console.log(error);
				// handle error
				toast.error(`Unable to Order: ${error?.message}`, {
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
			});
	};
	return (
		<div className="p-10">
			<ToastContainer />
			<div className="max-w-sm rounded overflow-hidden shadow-lg">
				<img
					className="w-full md:w-full min-h-28"
					src={book.coverImage}
					alt="Mountain"
				/>
				<div className="px-6 py-4">
					<div className=" text-gray-700 font-bold text-xl mb-2">
						{book.title}
					</div>
					<div className=" text-gray-700 font-bold text-lg mb-2">
						{book.writer}
					</div>
					<p className="text-gray-700 text-base">
						Price ${book.price}
					</p>
				</div>
				<div className="px-6 pt-4 pb-2">
					<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
						#{book.tag}
					</span>
					<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
						#travel
					</span>
					<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
						#winter
					</span>
				</div>

				{!ordered && (
					<div className="px-6 pt-4 pb-2">
						<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
							<MdAddShoppingCart
								size={15}
								cursor="pointer"
								onClick={handleOrder}
							/>
						</span>
					</div>
				)}
			</div>
		</div>
	);
}

export default BookCard;
