import React, {useState} from "react";
import { Box, List, ListItem, ListItemText, Typography, Paper } from "@mui/material";
import { KeyboardArrowUp } from '@mui/icons-material';
import useAuth from "src/hooks/useAuth";
import theme from "src/theme";

interface AtividadeProps {
	name: string;
	team: string;
	ddl: string;
	description: string;
}

function Atividade(props: AtividadeProps) {
	const { name, team, ddl, description } = props;
	const [ isOpen, setIsOpen ] = useState(false);
	const [ rotateIcon, setRotateIcon ] = useState(0);

	const OpenFunc = () => {
		setRotateIcon(isOpen ? 0 : 180);
		setIsOpen(!isOpen);
	};

	const now = new Date();
	const ddlDate = new Date(ddl);
	const diffDates = Math.floor(((ddlDate.getTime() - now.getTime())/(1000 * 60 * 60 * 24)))+1;
	let timeTo: string;
	if (diffDates < 7) {
		timeTo = `${diffDates} dia${diffDates > 1 ? "s" : ""}`;
	} else if (diffDates < 30) {
		timeTo = `${Math.floor(diffDates / 7)} semana${Math.floor(diffDates / 7) > 1 ? "s" : ""}`;
	} else {
		timeTo = `${Math.floor(diffDates / 30)} ${Math.floor(diffDates / 30) > 1 ? "meses" : "mês"}`;
	}
	const height = isOpen ? "none" : 75;
	const hidden:string = isOpen ? "hidden" : "visible";
	return (
		<ListItem sx={{ position: "relative", height: height, overflow: hidden, width: "100%", m: 0, p: 0 }} button onClick={() => OpenFunc()}>
			<Box>
				<ListItemText sx={{ position: "absolute", top: 12, left: 30, m: 0, p: 0 }}>
					<Typography variant="h5">{name}</Typography>
				</ListItemText>
				<ListItemText sx={{ position: "absolute", top: 33, left: 47, m: 0, p: 0 }}>
					<Typography variant="subtitle2">{team}</Typography>
				</ListItemText>
				<ListItemText sx={{ position: "absolute", bottom: 5, right: 35, m: 0, p: 0 }}>
					<Typography variant="subtitle2">{timeTo}</Typography>
				</ListItemText>
				<KeyboardArrowUp sx={{ position: "absolute", top: 7, right: 34, m: 0, p: 0, color: "white", transform: `rotate(${rotateIcon}deg)` }} />
			</Box>
			{isOpen
			? (<ListItemText sx={{mt: "55px",mb: "30px",mx: "27px"}}>
				<Typography variant="body1">{description}</Typography>
			</ListItemText>)
			: ""}
		</ListItem>
	)
}

const testAtividades = [
	{
		name: "Atividade 1",
		team: "Marketing",
		ddl: "11/15/2021",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas et magna ut accumsan. Suspendisse lectus urna, congue a hendrerit a, ullamcorper at orci. Nullam quam est, varius quis nunc vel, fringilla euismod massa. Class aptent taciti sociosqu ad litora torquent."
	},
	{
		name: "Atividade 2",
		team: "Gestão de Pessoas",
		ddl: "11/17/2021",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas et magna ut accumsan. Suspendisse lectus urna, congue a hendrerit a, ullamcorper at orci. Nullam quam est, varius quis nunc vel, fringilla euismod massa. Class aptent taciti sociosqu ad litora torquent."
	},
	{
		name: "Atividade 3",
		team: "Projeto Lojas JB",
		ddl: "11/19/2021",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas et magna ut accumsan. Suspendisse lectus urna, congue a hendrerit a, ullamcorper at orci. Nullam quam est, varius quis nunc vel, fringilla euismod massa. Class aptent taciti sociosqu ad litora torquent."
	},
	{
		name: "Atividade 4",
		team: "Núcleo de App",
		ddl: "11/19/2021",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas et magna ut accumsan. Suspendisse lectus urna, congue a hendrerit a, ullamcorper at orci. Nullam quam est, varius quis nunc vel, fringilla euismod massa. Class aptent taciti sociosqu ad litora torquent."
	},
	{
		name: "Atividade 5",
		team: "Núcleo de App",
		ddl: "11/26/2021",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas et magna ut accumsan. Suspendisse lectus urna, congue a hendrerit a, ullamcorper at orci. Nullam quam est, varius quis nunc vel, fringilla euismod massa. Class aptent taciti sociosqu ad litora torquent."
	},
	{
		name: "Atividade 6",
		team: "Núcleo de App",
		ddl: "11/26/2021",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas et magna ut accumsan. Suspendisse lectus urna, congue a hendrerit a, ullamcorper at orci. Nullam quam est, varius quis nunc vel, fringilla euismod massa. Class aptent taciti sociosqu ad litora torquent."
	},
]

export default function Home() {
	const {user, signout} = useAuth();
	return (
		<Paper
			sx={{
				flex: 1,
				height: "calc(100vh - 150px)",
				justifyContent: "center",
				display: "flex",
				borderRadius: 0
			}}
		>
			<Box sx={{ flex: 1, display: "flex", flexDirection: "row" }} marginX="15px" marginY="60px" maxWidth={theme.breakpoints.values.lg} >
				<Box className="Left" >
					<List sx={{width: 350, m: 0, p: 0, backgroundColor: "Background.default"}}>
						{testAtividades.map((event, index) => {
							return (
								<Atividade ddl={event.ddl} description={event.description} name={event.name} team={event.team} key={index} />
							)
						})}
					</List>
				</Box>
				<Box className="Middle" ></Box>
				<Box className="Right" ></Box>
			</Box>
		</Paper>
	);
}
