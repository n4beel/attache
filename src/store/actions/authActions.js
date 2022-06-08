import services, { baseUrl } from "../config/fetchConfig";


export const toggleAuthActionCreator = (data) => ({
	type: "toggleAuth",
	payload: data,
})

export const login = async (user, onSuccess, onError) => {
	try {
		const res = await services.Post('authenticate', user)
		console.log("response ==>", res)
		if (res.status < 300) {
			onSuccess(await res.json())
		}
		else {
			onError(await res.json())
		}
	}
	catch (e) {
		onError(e)
		console.log('error -->', e)
	}
};

export const signUp = async (newUser, onSuccess, onError) => {
	try {
		const res = await services.Post('register', newUser)
		console.log('result ==>', res)
		if (res.status < 300) {
			onSuccess(await res.json())
		}
		else {
			onError(await res.json())
		}
	}
	catch (e) {
		onError(e)
		console.log('error -->', e)
	}
};


export const forgetPassword = async (email, onSuccess, onError) => {
	try {
		const res = await services.Post(`sendResetToken`, email)
		console.log('result ==>', res)
		if (res.status < 300) {
			onSuccess(await res.json())
		}
		else {
			onError(await res.json())
		}
	}
	catch (e) {
		onError(e)
		console.log('error -->', e)
	}
}

export const setPassword = async (data, onSuccess, onError) => {
	try {
		const res = await services.Post(`resetPassword`, data)
		console.log('result ==>', res)
		if (res.status < 300) {
			onSuccess(await res.json())
		}
		else {
			onError(await res.json())
		}
	}
	catch (e) {
		onError(e)
		console.log('error -->', e)
	}
}

export const logout = (onSuccess) => {
	onSuccess({})
}

export const tradeCoin = async (data, onSuccess, onError) => {
	try {
		const res = await services.PostPortfolio(`trade`, data)
		console.log('result ==>', res)
		if (res.status < 300) {
			console.log("onsuccess")
			onSuccess(res)
		}
		else {
			onError(res)
		}
	}
	catch (e) {
		onError(e)
		console.log('error -->', e)
	}
}