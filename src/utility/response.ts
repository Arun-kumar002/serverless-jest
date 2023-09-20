export const formatResponse = (statusCode: number, message: string, data?: unknown) => {

    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*",

        },
        body: JSON.stringify(
            {
                message: message,
                data: data ? data : 'none'
            }
        )
    }

}

export const successResponse = (data: Object) => {
    return formatResponse(200, 'success', data)
}

export const errorResponse = (code = 1000, error: unknown) => {
    if (Array.isArray(error)) {
        const errorObject = error[0].constraints
        console.log(errorObject, 'errorObject')
        const errorMessage = errorObject[Object.keys(errorObject)[0]] || 'unknown error'

        return formatResponse(code, errorMessage)
    }

    return formatResponse(code, `${error}`)
}