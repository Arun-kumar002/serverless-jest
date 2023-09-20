const axios = require('axios')
const apisauce = require('apisauce')

const url = 'http://localhost:3000/users'
const tag = 'user Handler'
describe(tag, () => {
    let token = ""
    describe(`[${tag}]-create`, () => {

        test(`it should create a new user inside the keycloak`, async () => {
            const payload = generateRandomUser()

            expect(token).toBeDefined()
            const request = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    tenentid: 'ecobillz'
                }
            })

            expect(request).toBeDefined()
            expect(request.status).toBe(200)
            expect(request.statusText).toBe('OK')
            expect(request.data).toBeDefined()
            const body = request.data
            console.log(body);

            expect(typeof body).toBe('object')
            expect(body.message).toBeDefined()
            expect(typeof body.message).toBe('string')
            expect(body.message).toBe('success')

        })

        test(`it should throw error code 400 for for same user details `, async () => {

            const payload = generateRandomUser()

            const request1 = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    tenentid: 'ecobillz'
                }
            })

            expect(request1).toBeDefined()
            expect(request1.status).toBe(200)
            expect(request1.statusText).toBe('OK')
            expect(request1.data).toBeDefined()
            const body = request1.data

            expect(typeof body).toBe('object')
            expect(body.message).toBeDefined()
            expect(typeof body.message).toBe('string')
            expect(body.message).toBe('success')

            try {
                const request2 = await axios.post(url, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                        tenentid: 'ecobillz'
                    }
                })



            } catch (error) {
                expect(error.response).toBeDefined()
                expect(error.response.status).toBeDefined()
                expect(error.response.status).toBe(400)
                expect(error.response.data.data).toBe('none')

            }

        })

        test(`it should throw error code 400 for for same username{username:unique} `, async () => {
            try {
                const payload1 = generateRandomUser()

                const request1 = await axios.post(url, payload1, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                        tenentid: 'ecobillz'
                    }
                })

                expect(request1).toBeDefined()
                expect(request1.status).toBe(200)
                expect(request1.statusText).toBe('OK')
                expect(request1.data).toBeDefined()
                const body = request1.data

                expect(typeof body).toBe('object')
                expect(body.message).toBeDefined()
                expect(typeof body.message).toBe('string')
                expect(body.message).toBe('success')

                let payload2 = generateRandomUser()
                expect(payload2.username != payload1.username).toBe(true)

                payload2 = { ...payload2, username: payload1.username }
                const request2 = await axios.post(url, payload2, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                })


                expect(request2.status).toBe(400)
            } catch (error) {
                expect(error.response).toBeDefined()
                expect(error.response.status).toBeDefined()
                expect(error.response.status).toBe(400)
                expect(error.response.data.data).toBe('none')

            }
        })

        test(`it should throw error code 400 for for same email{email:unique} `, async () => {
            try {
                const payload1 = generateRandomUser()

                const request1 = await axios.post(url, payload1, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                        tenentid: 'ecobillz'
                    }
                })

                expect(request1).toBeDefined()
                expect(request1.status).toBe(200)
                expect(request1.statusText).toBe('OK')
                expect(request1.data).toBeDefined()
                const body = request1.data

                expect(typeof body).toBe('object')
                expect(body.message).toBeDefined()
                expect(typeof body.message).toBe('string')
                expect(body.message).toBe('success')

                let payload2 = generateRandomUser()
                expect(payload2.email != payload1.email).toBe(true)

                payload2 = { ...payload2, email: payload1.email }
                const request2 = await axios.post(url, payload2, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                })


                expect(request2.status).toBe(400)
            } catch (error) {
                expect(error.response).toBeDefined()
                expect(error.response.status).toBeDefined()
                expect(error.response.status).toBe(400)
                expect(error.response.data.data).toBe('none')

            }
        })



    })
    describe(`[${tag}]-findAll`, () => {
        test('The test should return all the user [{},{}] if the no of users Zero means it should return [empty] ', async () => {

            const request = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    tenentid: 'ecobillz'
                }
            })

            expect(request).toBeDefined()
            expect(request.status).toBeDefined()
            expect(request.status).toBe(200)
            expect(request.statusText).toBeDefined()
            expect(request.statusText).toBe('OK')
            expect(request.data).toBeDefined()
            expect(typeof request.data).toBe('object')
            expect(request.data.data).toBeDefined()
            expect(request.data.message).toBeDefined()
            expect(request.data.data).toBeInstanceOf(Array)

        })
    })

    describe(`[${tag}]-findOne`, () => {
        test('The test should return a single user if the userId is correct {id:correct}', async () => {

            const request = await axios.get(`${url}/2a04b461-02f7-48ab-b482-c71a33f726d5`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    tenentid: 'ecobillz'
                }
            })

            expect(request).toBeDefined()
            expect(request.status).toBeDefined()
            expect(request.status).toBe(200)
            expect(request.statusText).toBeDefined()
            expect(request.statusText).toBe('OK')
            expect(request.data).toBeDefined()
            expect(typeof request.data).toBe('object')
            expect(request.data.data).toBeDefined()
            expect(request.data.message).toBeDefined()
            expect(request.data.data).toBeInstanceOf(Object)

        })

        test('The test should return a user not found if the user id is wrong {id:wrong}', async () => {
            try {
                const request = await axios.get(`${url}/${generateRandomString(25)}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                        tenentid: 'ecobillz'
                    }
                })
                console.log('====================================');
                console.log(request);
                console.log('====================================');

            } catch (error) {
                expect(error.response).toBeDefined()
                expect(error.response.status).toBeDefined()
                expect(error.response.status).toBe(400)
                expect(error.response.data.data).toBe('none')

            }

        })
    })

    describe(`[${tag}]-remove`, () => {
        test('The should delete the existing user', async () => {
            const payload = generateRandomUser()

            expect(token).toBeDefined()
            const createRequest = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    tenentid: 'ecobillz'
                }
            })

            expect(createRequest).toBeDefined()
            expect(createRequest.status).toBe(200)
            expect(createRequest.statusText).toBe('OK')
            expect(createRequest.data).toBeDefined()

            const findAllRequest = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    tenentid: 'ecobillz'
                }
            })

            expect(findAllRequest).toBeDefined()
            expect(findAllRequest.status).toBeDefined()
            expect(findAllRequest.status).toBe(200)
            expect(findAllRequest.statusText).toBeDefined()
            expect(findAllRequest.statusText).toBe('OK')
            expect(findAllRequest.data).toBeDefined()

            const user = findUser(findAllRequest.data.data, payload.username)

            expect(user.username == payload.username.toLowerCase()).toBe(true)
            expect(user.id).toBeDefined()


            const request = await axios.delete(`${url}/${user.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    tenentid: 'ecobillz'
                }
            })


            expect(request).toBeDefined()
            expect(request.status).toBeDefined()
            expect(request.status).toBe(200)
            expect(request.statusText).toBeDefined()
            expect(request.statusText).toBe('OK')



        })

        test('The test should return error 400 if we provide wrong non existing user id for delete ', async () => {
            try {
                const token = await generateToken()
                const request = await axios.delete(`${url}/${generateRandomString(25)}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                        tenentid: 'ecobillz'
                    }
                })


            } catch (error) {
                expect(error.response).toBeDefined()
                expect(error.response.status).toBeDefined()
                expect(error.response.status).toBe(400)
                expect(error.response.data.data).toBe('none')

            }

        })
    })

    describe(`[${tag}]-update`, () => {
        test('The should update the existing user', async () => {
            const payload = generateRandomUser()

            expect(token).toBeDefined()
            const createRequest = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    tenentid: 'ecobillz'
                }
            })

            expect(createRequest).toBeDefined()
            expect(createRequest.status).toBe(200)
            expect(createRequest.statusText).toBe('OK')
            expect(createRequest.data).toBeDefined()

            const findAllRequest = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    tenentid: 'ecobillz'
                }
            })

            expect(findAllRequest).toBeDefined()
            expect(findAllRequest.status).toBeDefined()
            expect(findAllRequest.status).toBe(200)
            expect(findAllRequest.statusText).toBeDefined()
            expect(findAllRequest.statusText).toBe('OK')
            expect(findAllRequest.data).toBeDefined()

            const user = findUser(findAllRequest.data.data, payload.username)

            expect(user.username == payload.username.toLowerCase()).toBe(true)
            expect(user.id).toBeDefined()


            const updatePayload = generateRandomUser()

            expect(payload.username != updatePayload.username).toBe(true)
            expect(payload.password != updatePayload.password).toBe(true)
            expect(payload.email != updatePayload.email).toBe(true)


            const request = await axios.put(`${url}/${user.id}`, updatePayload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    tenentid: 'ecobillz'
                }
            })


            expect(request).toBeDefined()
            expect(request.status).toBeDefined()
            expect(request.status).toBe(200)
            expect(request.statusText).toBeDefined()
            expect(request.statusText).toBe('OK')

        })

        test('The test should return error 400 if we provide wrong non existing user id for update ', async () => {
            try {
                const payload = generateRandomUser()
                const request = await axios.put(`${url}/${generateRandomString(25)}`, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                        tenentid: 'ecobillz'
                    }
                })


            } catch (error) {
                expect(error.response).toBeDefined()
                expect(error.response.status).toBeDefined()
                expect(error.response.status).toBe(400)
                expect(error.response.data.data).toBe('none')

            }

        })

        test('The should return 400 error for the email id is not unique', async () => {
            try {


                expect(token).toBeDefined()


                let users = []
                for (let i = 0; i < 3; i++) {
                    const payload = generateRandomUser()
                    const createRequest = await axios.post(url, payload, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token,
                            tenentid: 'ecobillz'
                        }
                    })

                    expect(createRequest).toBeDefined()
                    expect(createRequest.status).toBe(200)
                    expect(createRequest.statusText).toBe('OK')
                    expect(createRequest.data).toBeDefined()

                    users.push(payload)
                }


                const findAllRequest = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                        tenentid: 'ecobillz'
                    }
                })

                expect(findAllRequest).toBeDefined()
                expect(findAllRequest.status).toBeDefined()
                expect(findAllRequest.status).toBe(200)
                expect(findAllRequest.statusText).toBeDefined()
                expect(findAllRequest.statusText).toBe('OK')
                expect(findAllRequest.data).toBeDefined()

                const user = findUser(findAllRequest.data.data, users[0].username)

                expect(user.username == users[0].username.toLowerCase()).toBe(true)
                expect(user.id).toBeDefined()


                const updatePayload = generateRandomUser()

                expect(users[0].username != updatePayload.username).toBe(true)
                expect(users[0].password != updatePayload.password).toBe(true)
                expect(users[0].email != updatePayload.email).toBe(true)
                updatePayload.email = users[1].email

                const request = await axios.put(`${url}/${user.id}`, updatePayload, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                        tenentid: 'ecobillz'
                    }
                })

            } catch (error) {
                expect(error.response).toBeDefined()
                expect(error.response.status).toBeDefined()
                expect(error.response.status).toBe(400)
                expect(error.response.data.data).toBe('none')
            }

        })


        test('The should return 400 error for the username is not unique', async () => {
            try {


                expect(token).toBeDefined()


                let users = []
                for (let i = 0; i < 3; i++) {
                    const payload = generateRandomUser()
                    const createRequest = await axios.post(url, payload, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token,
                            tenentid: 'ecobillz'
                        }
                    })

                    expect(createRequest).toBeDefined()
                    expect(createRequest.status).toBe(200)
                    expect(createRequest.statusText).toBe('OK')
                    expect(createRequest.data).toBeDefined()

                    users.push(payload)
                }


                const findAllRequest = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                        tenentid: 'ecobillz'
                    }
                })

                expect(findAllRequest).toBeDefined()
                expect(findAllRequest.status).toBeDefined()
                expect(findAllRequest.status).toBe(200)
                expect(findAllRequest.statusText).toBeDefined()
                expect(findAllRequest.statusText).toBe('OK')
                expect(findAllRequest.data).toBeDefined()

                const user = findUser(findAllRequest.data.data, users[0].username)

                expect(user.username == users[0].username.toLowerCase()).toBe(true)
                expect(user.id).toBeDefined()


                const updatePayload = generateRandomUser()

                expect(users[0].username != updatePayload.username).toBe(true)
                expect(users[0].password != updatePayload.password).toBe(true)
                expect(users[0].email != updatePayload.email).toBe(true)
                updatePayload.username = users[1].username

                const request = await axios.put(`${url}/${user.id}`, updatePayload, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                        tenentid: 'ecobillz'
                    }
                })

            } catch (error) {
                expect(error.response).toBeDefined()
                expect(error.response.status).toBeDefined()
                expect(error.response.status).toBe(400)
                expect(error.response.data.data).toBe('none')
            }

        })
    })
})



const generateToken = async () => {
    try {
        const instance = apisauce.create({
            baseURL: "http://localhost:8080",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        })

        const token = await instance.post('/realms/ecobillz/protocol/openid-connect/token', {
            username: "eco",
            password: "arun123",
            grant_type: "password",
            client_id: "ecobillz-reconciliation-ui-service"
        })



        console.log('=================token===================');
        console.log(token);
        console.log('====================================');
    } catch (error) {
        console.log('==============token error======================');
        // console.log(error);
        console.log('====================================');
    }
}


const generateRandomUser = () => {
    const inputs = {
        username: generateRandomString(15),
        password: generateRandomString(10),
        email: `${generateRandomString(15)}@gmail.com`,
    };
    return inputs;
};
const generateRandomString = (length) => {
    let result = "";
    const characters =
        "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm1234567890";
    let chlength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * chlength));
    }
    return result;
};

const generateRandomNumber = (minlevel, maxlevel) => {
    let result = 0;
    result += Math.floor(Math.random() * (maxlevel - minlevel) + minlevel);
    return result;
};


const findUser = (users, userName) => {
    let user;
    for (let x of users) {
        if (x.username == userName.toLowerCase()) {
            user = x
            return user
        }
    }

}