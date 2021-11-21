import React, { useState, useEffect } from "react";
import { Tab, Tabs, Paper, Box, Button } from "@mui/material";
import Router, {useRouter} from "next/router";
import theme from "src/theme";
import useAuth from "src/hooks/useAuth";
import withAuthModal from "src/components/withAuthModal"

function allProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const Pages = [
	{
		name: "Home",
		slug: "home",
		disabled: false
	}, {
		name: "Meu Trabalho",
		slug: "meu-trabalho",
		disabled: true
	}, {
		name: "Feedback 360",
		slug: "feedback-360",
		disabled: false
	}, {
		name: "Comercial",
		slug: "comercial",
		disabled: true
	}, {
		name: "Projetos",
		slug: "projetos",
		disabled: true
	}, {
		name: "Adm-Fin",
		slug: "adm-fin",
		disabled: true
	}, {
		name: "OKR e Metas",
		slug: "okr-e-metas",
		disabled: true
	}
]

interface HeaderProps {
	openAuthModal: () => void;
}

function Header({openAuthModal}: HeaderProps) {
	const {user, signout} = useAuth();
	const [tab, setTab] = useState(0);
	const rotas = useRouter();

	useEffect(() => {
			const pathA = rotas.asPath.slice(1, rotas.asPath.length);
			const pos = pathA.search('/');
			let pathB: string;
			if (!pos) {
				pathB = pathA;
			} else {
				pathB = pathA.slice(0, pos);
			}
			const i = Pages.findIndex(p => p.slug === pathB);
			if (i !== tab) {
				setTab(i);
			}
		},[])
	
	const handleChange = async (event: React.SyntheticEvent, newTab: number) => {
		if (!user) {
			openAuthModal()
		} else {
			setTab(newTab);
			Router.push(`/${Pages[newTab].slug}`);
		}
	}

	return(
		<Paper elevation={8} sx={{ display: "flex", flexDirection: "column", height: 150, borderRadius: 0, alignItems: "center" }} >
			<Paper sx={{ borderRadius: 0 , display: "flex", flex: 1, backgroundImage: `linear-gradient(to right,${theme.palette.primary.main},${theme.palette.secondary.main})`, width: "100%", justifyContent: "center" }}>
				<Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: theme.breakpoints.values.lg, backgroundColor: "transparent" }}>
					<h1>Gammembers</h1>
					<Box>
						{user ? (
							<>
							<button onClick={() => signout()}>sair</button>
							<button onClick={() => {alert("Minha conta!")}}>Minha conta</button>
							</>
						) : (
							<Button onClick={() => openAuthModal()}>
								Entrar
							</Button>
						)}
					</Box>
				</Box>
			</Paper>
			<Box sx={{ display: "flex", width: "100%", justifyContent: "center" }} bgcolor="#212121" >
				<Tabs sx={{ width: theme.breakpoints.values.lg }} value={tab} onChange={handleChange} centered >
					<Tab label={Pages[0].name} {...allProps(0)} disabled={Pages[0].disabled} />
					<Tab label={Pages[1].name} {...allProps(1)} disabled={Pages[1].disabled} />
					<Tab label={Pages[2].name} {...allProps(2)} disabled={Pages[2].disabled} />
					<Tab label={Pages[3].name} {...allProps(3)} disabled={Pages[3].disabled} />
					<Tab label={Pages[4].name} {...allProps(4)} disabled={Pages[4].disabled} />
					<Tab label={Pages[5].name} {...allProps(5)} disabled={Pages[5].disabled} />
					<Tab label={Pages[6].name} {...allProps(6)} disabled={Pages[6].disabled} />
				</Tabs>
			</Box>
		</Paper>
	)
}

export default withAuthModal(Header);