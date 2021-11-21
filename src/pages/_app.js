import React from "react"
import { AuthProvider } from "src/contexts/AuthContext"
import { ThemeProvider } from "@mui/material/styles"
import theme from "src/theme"
import { useRouter } from "next/router"
import Header from "./components/header"

function MyApp({ Component, pageProps }) {
	const router = useRouter()
	const showHeader = router.pathname === "/" ? false : true
	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<style>{`
					#__next, body {margin: 0; min-width: 100vw; min-height: 100vh; display: flex; flex-direction: column}
				`}</style>
				{showHeader && <Header />}
				<Component {...pageProps} />
			</AuthProvider>
		</ThemeProvider>
	)
}

export default MyApp
