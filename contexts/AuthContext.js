import React, { createContext, useState, useEffect } from "react"
import firebase from "../lib/firebase"
import Cookies from "js-cookie"
import Router from "next/router"

const AuthContext = createContext()

const formatUser = async (user) => ({
	uid: user.uid,
	email: user.email,
	name: user.displayName,
	token: user.accessToken,
	provider: user.providerData[0].providerId,
	photoUrl: user.photoUrl,
})

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const handleUser = async (currentUser) => {
		if (currentUser) {
			// console.log(currentUser)
			const formatedUser = await formatUser(currentUser)
			setUser(formatedUser)
			setSession(true)
			return formatedUser.email
		}
		setUser(false)
		setSession(false)
		return false
	}

	const setSession = (session) => {
		if (session) {
			Cookies.set("gammembers-auth", session, {
				expires: 1,
			})
		} else {
			Cookies.remove("gammembers-auth")
		}
	}

	async function signin(email, password, page) {
		try {
			setLoading(true)
			const response = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password)

			handleUser(response.user.multiFactor.user)

			// 		.then((response) => {
			// 			setUser(response.user)
			// 			// console.log("Login complete")
			if (page) {
				Router.push(`/${page}`)
			}
			// 		})
		} finally {
			setLoading(false)
		}
	}

	async function signout() {
		try {
			Router.push("/home")
			await firebase.auth().signOut()
			handleUser(false)

			// return await firebase
			// 	.auth()
			// 	.signOut()
			// 	.then(() => {
			// 		console.log("Logout")
			// 		setUser(null)
			// 	})
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const unsubscribe = firebase.auth().onIdTokenChanged(handleUser)
		return () => unsubscribe()
	}, [])

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				signin,
				signout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const AuthConsumer = AuthContext.Consumer

export default AuthContext
