"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTable } from "@/components/data-table/data-table";

import Link from "next/link";

interface RecentBooking {
	id: number;
	name: string;
	clientName: string | null;
	createdAt: string;
}

export function RecentBookingDashboard({
	recentBookings,
}: {
	recentBookings: RecentBooking[];
}) {
	const bookingColumns: ColumnDef<RecentBooking>[] = [
		{
			accessorKey: "name",
			header: "Booking Name",
			cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
		},
		{
			accessorKey: "clientName",
			header: "Client Name",
		},
		{
			accessorKey: "createdAt",
			header: () => <div className="text-right">Created At</div>,
			cell: ({ row }) => (
				<div className="text-right">
					{format(new Date(row.original.createdAt), "MMM d, yyyy")}
				</div>
			),
		},
	];

	return (
		<div className="flex flex-col w-full space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-left flex-col">
					<h2 className="text-base/7 font-semibold text-gray-900">
						Recent Bookings
					</h2>
					<p className="text-sm/6 text-gray-500">
						Some of the most recent bookings made in the system.
					</p>
				</div>

				<Link
					prefetch={true}
					href={"/bookings"}
					className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500"
				>
					View all<span className="sr-only">, bookings</span>
				</Link>
			</div>

			<DataTable columns={bookingColumns} data={recentBookings} />
		</div>
	);
}
