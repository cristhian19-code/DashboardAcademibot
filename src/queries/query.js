export default {
    apiURL: 'http://208.167.242.207/graphql',
    queries: {
        fileRequest: `{
            fileRequests{
                requestedAt
                error
                id
            }
        }`,
        date: `{
            fileRequests{
                requestedAt,
                error
            }
        }`
    }
}