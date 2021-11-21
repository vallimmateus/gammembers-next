import { createTheme } from "@mui/material/styles";

const chumbo = "#212121";
const verde = "#1fddbd";
const azul = "#1d7e8e";

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: verde,
		},
		secondary: {
			main: azul,
		},
		background: {
			default: chumbo,
			paper: chumbo,
		},
	},
	typography: {
		h1: {
			fontWeight: 500,
			fontSize: "4.5rem"
		},
		h2: {
			fontWeight: 500,
			fontSize: "4rem"
		},
		h3: {
			fontWeight: 500,
		},
		h4: {
			fontWeight: 500,
			fontSize: "2.25rem"
		},
		h5: {
			fontWeight: 500
		},
		h6: {
			fontSize: "1.125rem"
		},
		subtitle1: {
			fontFamily: "'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif",
			fontSize: "1.125rem",
			fontWeight: 600,
		},
		subtitle2: {
			fontFamily: "'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif",
			fontWeight: 600,
		},
		body1: {
			fontFamily: "'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif",
		},
		body2: {
			fontFamily: "'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif",
			fontSize: "0.75rem"
		},
		button: {
			fontFamily: "'Montserrat', 'Roboto', 'Helvetica', 'Arial', sans-serif",
			fontSize: "1rem",
			fontWeight: 600
		}
	}
});

export default theme