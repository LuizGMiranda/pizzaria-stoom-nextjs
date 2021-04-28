import axios from 'axios'

async function getFlavors() {
    try {
        console.time("-- GET getFlavors --");
        const data = await axios.get('/api/flavors')
        console.log(data)
        console.timeEnd("-- GET getFlavors --");
        return data.data
    } catch (error) {
        console.error("-- ERROR GET getFlavors --", error)
        return []
    }
}

async function sendOrder(user) {
    try {
        console.time("-- GET sendOrder --");
        const data = await axios.post('/api/sendOrder', user)
        console.log(data)
        console.timeEnd("-- GET sendOrder --");
        return data.data
    } catch (error) {
        console.error("-- ERROR GET sendOrder --", error)
        return []
    }
}

export {
    getFlavors,
    sendOrder
}