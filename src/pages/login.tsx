import React, { useEffect, useState } from 'react';
import useAuth from "src/hooks/useAuth";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormControl, IconButton, InputAdornment, InputLabel, Input, Avatar, Button, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Router from "next/router";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://gammembers.gammajrengenharia.com.br/">
        Gammembers
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Login() {
	const { user, signin } = useAuth();

	useEffect(() => {
		Router.prefetch('/home');
		if (user) {
			Router.push('/home')
		}
	}, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
	};

	const [values, setValues] = useState({
		email: '',
		password: '',
		showPassword: false
	})

	const handleChange =
		(prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: event.target.value });
		};

	const handleClickShowPassword = () => {
		setValues({
		...values,
		showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random/1100x1100/?minimalism)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
			</Typography>
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
			<FormControl margin="normal" required fullWidth>
				<InputLabel htmlFor="email">Email</InputLabel>
				<Input
					id="email"
					autoComplete="email"
					autoFocus
					onChange={handleChange('email')}
				/>
			</FormControl>
			<FormControl margin="normal" required fullWidth>
				<InputLabel htmlFor="password">Password</InputLabel>
				<Input
					id="password"
					type={values.showPassword ? 'text' : 'password'}
					value={values.password}
					autoComplete="current-password"
					onChange={handleChange('password')}
					endAdornment={
						<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{values.showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
				onClick={() => signin(values.email, values.password, "home")}
              >
                Entrar
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
				onClick={() => Router.push("/")}
              >
                Cadastre-se
              </Button>
                  <Link href="#" variant="body2">
                    Esqueceu a senha?
                  </Link>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}