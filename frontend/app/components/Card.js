// BookCard.js
import React from "react";
import { MdAddShoppingCart } from "react-icons/md";

function BookCard({ book }) {
	return (
		<div class="p-10">
			<div class="max-w-sm rounded overflow-hidden shadow-lg">
				<img
					class="w-full md:w-full min-h-28"
					src={book.coverImage}
					alt="Mountain"
				/>
				<div class="px-6 py-4">
					<div class=" text-gray-700 font-bold text-xl mb-2">
						{book.title}
					</div>
					<div class=" text-gray-700 font-bold text-lg mb-2">
						{book.writer}
					</div>
					<p class="text-gray-700 text-base">Price ${book.price}</p>
				</div>
				<div class="px-6 pt-4 pb-2">
					<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
						#{book.tag}
					</span>
					<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
						#travel
					</span>
					<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
						#winter
					</span>
				</div>

				<div class="px-6 pt-4 pb-2">
					<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
						<MdAddShoppingCart size={15} cursor="pointer" />
					</span>
				</div>
			</div>
		</div>
	);
}

export default BookCard;
