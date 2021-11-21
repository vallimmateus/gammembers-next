import React, {useState} from "react"
import Head from "next/head"
import { Box, Paper, FormControl, TextField, Typography, Button, Pagination, Stack } from "@mui/material"
import { getAllMembers } from "src/lib/dato-cms"
import { getAllQuestions } from "src/lib/dato-cms"
import theme from "src/theme"
import useAuth from "src/hooks/useAuth"

interface memberProps {
	nome: string;
	slug: string;
}

interface perguntaProps {
	pergunta: string;
	id: string;
	grupo: string;
	resposta?: string;
}

interface contextProps {
	params: { name: string };
	locales;
	locale;
	defaultLocale;
}

interface perguntasProps {
	grupos: string[];
	questions: Array<perguntaProps>;
	name: string;
}

interface formProps {
	name: string;
	questions: Array<perguntaProps>;
	grupos: string[];
}

function Perguntas({grupos, questions, name}: perguntasProps) {
	const [values, setValues] = useState(questions);
	const {user} = useAuth();

	// const {values, setValues} = valuesFnc;
	const [page, setPage] = React.useState(1);
	const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const filterByGroup = (grupo: string) => {
		return questions.filter((question: perguntaProps) => {
			return (question.grupo == grupo)
		})
	};

	const handleChangeValue = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValues = [...values];
		const index = newValues.findIndex(f => f.id === id)
		newValues[index]['resposta'] = event.target.value;
		setValues(newValues)
	}

	return (<Stack alignItems="center">
						{grupos.map((grupo, index) => {
							return (<>
								{(page - 1 === index) && <>
									<Typography variant="h6">{grupo}</Typography>
									{filterByGroup(grupo).map((question) => {
										return (
											<FormControl fullWidth key={question.id} sx={{mt: "25px"}}>
												<Typography sx={{mx: "15px", mb: "10px"}}>{question.pergunta}</Typography>
												<TextField required rows={4} size="small" multiline id={question.id} onChange={handleChangeValue(question.id)} value={question.resposta} />
											</FormControl>
										)
									})}
								</>}
							</>)
						})}
						{page === grupos.length && <Button onClick={() => console.log({de: user, para: name, resultado: values})} sx={{mt: "25px"}} >Enviar</Button>}
						<Pagination count={grupos.length} page={page} onChange={handleChangePage} sx={{mt: "25px"}} />
					</Stack>
	)
}

function Form({ name, questions, grupos }: formProps) {
	
	// const newValues = [...values];
	// newValues.forEach(value => {value['resposta'] = ""})
	// setValues(newValues);

	
	// const questions = [
	// 	{
	// 		"pergunta": "Pipipi popopo uma pergunta qualquer",
	// 		"id": "74198613",
	// 		"grupo": "geral",
	// 		"resposta": ""
	// 	},
	// 	{
	// 		"pergunta": "Pipipi popopo uma pergunta qualquer 2",
	// 		"id": "74198619",
	// 		"grupo": "geral",
	// 		"resposta": ""
	// 	},
	// 	{
	// 		"pergunta": "Pipipi popopo uma pergunta qualquer 3",
	// 		"id": "72942790",
	// 		"grupo": "geral",
	// 		"resposta": ""
	// 	},
	// 	{
	// 		"pergunta": "Segunda pergunta bla bla bla",
	// 		"id": "72942791",
	// 		"grupo": "lider"
	// 	}
	// ];
	
	// const setGrupos = new Set(questions.map(x => x.grupo))
	// const grupos = Array.from(setGrupos)

	return (
		<>
			<Head>
				<script
					// eslint-disable-next line react/no-danger
					dangerouslySetInnerHTML={{
						__html: `
							if (!document.cookie || !document.cookie.includes('gammembers-auth')) {
								window.location.href = "/feedback-360"
							}
							`,
					}}
				></script>
			</Head>
			<Paper sx={{
				flex: 1,
				justifyContent: "center",
				display: "flex",
				borderRadius: 0
			}}>
				<Box width={theme.breakpoints.values.md} mt={5} component="form">
					<Typography variant="h5">{name}</Typography>
					<Perguntas grupos={grupos} questions={questions} name={name} />
				</Box>
			</Paper>
		</>
	)
}

export async function getStaticPaths() {
	const members = await getAllMembers()
	const paths = members.map((member) => {
		return { params: { name: member.slug.toString() } }
	})
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps(context: contextProps) {
	const members = await getAllMembers();
	const member = members.find((f: memberProps) => f.slug == context.params.name)
	// console.log(member)
	const name: string = member.nome
	const questions: perguntasProps = await getAllQuestions();
	const grupos = ['geral', 'lider'];
	// console.log(questions)
	return {
		props: {
			questions,
			name,
			grupos,
		},
		revalidate: 300,
	}
}

export default Form