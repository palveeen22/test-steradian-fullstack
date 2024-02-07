import React, { useState } from "react";
import { Modal } from "antd";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";

interface ModalLoginProps {
	open: boolean;
	onOk: () => void;
	onCancel: () => void;
}

const AddCar: React.FC<ModalLoginProps> = ({ open, onOk, onCancel }) => {
	const [input, setInput] = useState({
		car_name: "",
		day_rate: 0,
		month_rate: 0,
		image: "",
	});
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const [error, setError] = useState("");

	const CarInput = z.object({
		car_name: z
			.string({
				invalid_type_error: "Name is Required",
				required_error: "Name is Required",
			})
			.min(1, { message: "Name is Required" }),
		day_rate: z
			.number({
				invalid_type_error: "Day Rate is Required",
				required_error: "Day Rate is Required",
			})
			.min(0, { message: "Day Rate must be a positive number" }), // Assuming day_rate should be positive
		month_rate: z
			.number({
				invalid_type_error: "Month Rate is Required",
				required_error: "Month Rate is Required",
			})
			.min(0, { message: "Month Rate must be a positive number" }), // Assuming month_rate should be positive
		image: z
			.string({
				invalid_type_error: "Image is Required",
				required_error: "Image is Required",
			})
			.min(1, { message: "Image is Required" }),
	});

	const router = useRouter();
	const handleSubmit = async (e: React.SyntheticEvent) => {
		try {
			e.preventDefault();

			const parsed = CarInput.safeParse(input);
			// console.log(parsed);

			if (parsed.success == false) {
				setError(parsed.error.issues[0].message);
			} else {
				const finalInput = JSON.stringify(input);
				// console.log(finalInput);
				const response = await fetch("http://localhost:3000/api/cars", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: finalInput,
				});

				if (!response.ok) {
					throw new Error("Add Car Failed");
				}
				toast.success("Car Added");
				router.refresh();
				onOk();
				router.push("/list-cars");
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				console.log(error.issues);
			} else {
				console.log(error);
			}
		}
	};

	return (
		<>
			<button
				className="bg-[#ffcd3c] text-[#fff] m-2  ml-auto p-2 flex items-center gap-2 rounded-xl hover:bg-blue-500"
				onClick={showModal}
			>
				<Icon icon="icon-park-solid:add" width={40} />
				Add Car
			</button>
			<Modal
				title="Input Your Car Here.."
				open={isModalOpen}
				onOk={handleOk}
				footer={null}
				onCancel={handleCancel}
			>
				<form className="mx-auto pt-9 pb-9" onSubmit={handleSubmit}>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="text"
							name="car_name"
							id="car_name"
							className=" text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							onChange={(e) => setInput({ ...input, car_name: e.target.value })}
						/>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Car Name
						</label>
					</div>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="number"
							name="day_rate"
							id="day_rate"
							className="text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							onChange={(e) =>
								setInput({ ...input, day_rate: Number(e.target.value) })
							}
						/>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Day Rate
						</label>
					</div>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="number"
							name="month_rate"
							id="month_rate"
							className="text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							onChange={(e) =>
								setInput({ ...input, month_rate: Number(e.target.value) })
							}
						/>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Montly Rate
						</label>
					</div>
					<div className="relative z-0 w-full mb-5 group">
						<input
							type="text"
							name="image"
							id="image"
							className="text-black block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
							onChange={(e) => setInput({ ...input, image: e.target.value })}
						/>
						<label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
							Image Car
						</label>
					</div>

					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-[#ffcd3c] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
					>
						Create
					</button>
					{/* <button
						onClick={() => router.push("/welcome-investor")}
						className="ml-2 text-white bg-red-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
					>
						Cancel
					</button> */}
				</form>
			</Modal>
		</>
	);
};

export default AddCar;