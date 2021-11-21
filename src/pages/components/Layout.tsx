import { Box } from "@mui/material";
import React from "react";

export default function Layout({children}) {
	return (
		<Box minHeight="100vh">
				{children}
		</Box>
	)
}