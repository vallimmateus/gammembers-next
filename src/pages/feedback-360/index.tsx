import { Box, Typography, Paper, List, ListItem, ListItemText, TableContainer, Table, TableHead, TableRow, TableCell, Tooltip, Button } from "@mui/material";
import React from "react";
import theme from "src/theme";
import Router from "next/router"
// import useAuth from "src/hooks/useAuth"

const Teams = [
	"Diretório A",
	"Time B",
	"Núcleo C"
];

const A = [
	{
		name: "Membro 1",
		slug: "membro-1",
		teams: [
			{
				team: "Diretório A",
				period: "14/05 - presente"
			}, {
				team: "Time B",
				period: "5/09 - 28/10"
			}
		]
	}, 
	{
		name: "Membro 2",
		slug: "membro-2",
		teams: [
			{
				team: "Diretório A",
				period: "12/07 - presente"
			}
		]
	}, 
	{
		name: "Membro 3",
		slug: "membro-3",
		teams: [
			{
				team: "Diretório A",
				period: "14/05 - presente"
			}, {
				team: "Núcleo C",
				period: "8/08 - presente"
			}
		]
	}, 
]

function TableList() {
	const handleFormClick = (slug) => {
		Router.push(`/feedback-360/${slug}`);
	}

	return (
		<Box sx={{ display: "flex", flexDirection: "row", flex: 1, mt: "15px" }}>
			<List sx={{ width: "130px", my: "25px" }}>
				{Teams.map((team,index) => {
					return (
						<ListItem sx={{ height: "40px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderRadius: "7px 0 0 7px " }} button key={index}>
							<ListItemText><Typography variant="body2" sx={{ fontWeight: "bold" }}>{team}</Typography></ListItemText>
						</ListItem>
					)
				})}
			</List>
			<Paper elevation={8} sx={{ flex: 1, borderRadius: "10px", overflow: "hidden" }}>
				<TableContainer>
					<Table>
						<TableHead sx={{ backgroundColor: 'grey[200]' }}>
							<TableRow>
								<TableCell><Typography>Nome</Typography></TableCell>
								<TableCell><Typography>Período</Typography></TableCell>
								<TableCell><Typography>Times</Typography></TableCell>
								<TableCell><Typography></Typography></TableCell>
							</TableRow>
						</TableHead>
						{A.map((member, index) => {
							return (
								<TableRow key={index}>
									<TableCell><Typography>{member.name}</Typography></TableCell>
									<TableCell><Typography></Typography></TableCell>
									<TableCell>
										{member.teams.map((team,i) => {
											return (<Tooltip sx={{display: "inline"}} key={i} title={team.period} arrow>
														<Typography>{team.team}{i+1 === member.teams.length ? "" : ", "}</Typography>
													</Tooltip>)
										})}
									</TableCell>
									<TableCell><Button onClick={() => handleFormClick(member.slug)}>Responder</Button></TableCell>
								</TableRow>
							)
						})}
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	)
}

export default function Feedback() {
	// const {user} = useAuth();
	// console.log(questions)
	return (
		<Paper 
			sx={{
				flex: 1,
				justifyContent: "center",
				display: "flex",
				borderRadius: 0
			}}>
				<Box sx={{ flex: 1, display: "flex", flexDirection: "row" }} marginY="30px" maxWidth={theme.breakpoints.values.xl} >
					<Box sx={{ flex: 1, display: "flex", flexDirection: "column", mr: "15px" }}>
						<Box sx={{ display: "flex", flexDirection: "row", mb: "15px", height: "220px"}}>

							<Box sx={{ flex: 1, mr: "15px" }}></Box>
							<Box sx={{ ml: "15px", width: "35%", minWidth: "450px" }}></Box>
						</Box>
						<TableList/>
					</Box>
					<Box sx={{ flex: 1, ml: "15px" }} maxWidth={350}></Box>
				</Box>
		</Paper>
	);
}

export async function getStaticProps() {
	return {
		props: {},
		revalidate: 300,
	}
}