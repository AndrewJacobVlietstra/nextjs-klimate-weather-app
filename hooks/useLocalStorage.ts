"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useLocalStorage = <T>(
	key: string,
	initialValue?: T
): [T, Dispatch<SetStateAction<T>>] => {
	// Check if window object exists, avoid server error localStorage not defined
	const isClient = typeof window !== "undefined";

	const [value, setValue] = useState(() =>
		isClient
			? JSON.parse(
					localStorage.getItem(key) || JSON.stringify(initialValue || "N/A")
			  )
			: null
	);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as const;
};
