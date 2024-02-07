import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "../../../../prisma/client";

// GET ALL Orders
export async function GET(req: NextRequest) {
	const cars = await prisma.orders.findMany({
		orderBy: {
			id: "asc",
		},
	});
	return NextResponse.json(cars);
}

// ADD ORDER
export async function POST(req: Request, carsId: string) {
	console.log("masuk id", carsId);
	try {
		const {
			// order_date,
			pickup_date,
			dropoff_date,
			pickup_location,
			dropoff_location,
		} = (await req.json()) as {
			order_date: Date;
			pickup_date: Date;
			dropoff_date: Date;
			pickup_location: string;
			dropoff_location: string;
			carsId: string;
		};
		console.log("masuk");

		const order = await prisma.orders.create({
			data: {
				order_date: new Date(),
				pickup_date: new Date(pickup_date),
				dropoff_date: new Date(dropoff_date),
				pickup_location,
				dropoff_location,
				carsId: Number(carsId),
			},
		});
		// console.log(project, "<<< project");

		return NextResponse.json({
			order: {
				order_date: order.order_date,
				pickup_date: order.pickup_date,
				dropoff_date: order.dropoff_date,
				pickup_location: order.pickup_location,
				dropoff_location: order.dropoff_location,
			},
		});
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({
				status: "error",
				message: error.message,
			}),
			{ status: 500 }
		);
	}
}