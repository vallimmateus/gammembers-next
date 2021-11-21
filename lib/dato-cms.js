const API_URL = "https://graphql.datocms.com/"
const API_TOKEN = process.env.NEXT_DATOCMS_READ_ONLY_API_TOKEN

async function fetchCmsAPI(query, { variables } = {}) {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${API_TOKEN}`,
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	})

	const json = await res.json()
	if (json.errors) {
		throw new Error("Failed to fetch API")
	}

	return json.data
}

export async function getAllQuestions() {
	const data = await fetchCmsAPI(`{
			allQuestions {
				pergunta
				id
				grupo
			}
		}	  
	`)
	return data.allQuestions
}

export async function getAllMembers() {
	const data = await fetchCmsAPI(
		`{
			allMembers {
			  nome
			  slug
			}
		  }`
	)
	return data.allMembers
}

export default { getAllQuestions, getAllMembers }
