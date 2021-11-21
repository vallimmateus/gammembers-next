import React, { useState } from "react"
import useAuth from "src/hooks/useAuth"
import {
	Modal,
	Box,
	Typography,
	Input,
	FormControl,
	InputLabel,
	InputAdornment,
	IconButton,
	Button,
	Paper,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

function AuthModal({ open, handleOpen, handleClose }) {
	const [values, setValues] = useState({
		email: "",
		password: "",
		showPassword: false,
	})

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value })
	}

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		})
	}

	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}
	const { signin } = useAuth()

	return (
		<Modal
			open={open}
			onClose={handleClose}
			sx={{
				width: "300px",
				height: "250px",
				mt: "30px",
				px: "30px",
				py: "20px",
				mx: "auto",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			component={Paper}
		>
			<Box>
				<Typography variant="subtitle1">
					Faça login para continuar!
				</Typography>
				<FormControl margin="normal" required fullWidth>
					<InputLabel htmlFor="email">Email</InputLabel>
					<Input
						id="email"
						autoComplete="email"
						autoFocus
						onChange={handleChange("email")}
					/>
				</FormControl>
				<FormControl margin="normal" required fullWidth>
					<InputLabel htmlFor="password">Password</InputLabel>
					<Input
						id="password"
						type={values.showPassword ? "text" : "password"}
						value={values.password}
						autoComplete="current-password"
						onChange={handleChange("password")}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{values.showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					onClick={async () => {
						if (values.email !== "" && values.password !== "") {
							await signin(values.email, values.password)
							handleClose()
						}
					}}
				>
					Entrar
				</Button>
			</Box>
		</Modal>
	)
}

const withAuthModal = (Component) => (props) => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	return (
		<>
			<AuthModal
				open={open}
				handleOpen={handleOpen}
				handleClose={handleClose}
			/>
			<Component openAuthModal={handleOpen} {...props} />
		</>
	)
}

export default withAuthModal
