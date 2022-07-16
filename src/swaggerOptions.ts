export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'node-essentialAPI',
            version: '1.0.0',
            description: 'this api was created seeking to learn typescript basis'
        },
        servers: [
            {
                url: "http://localhost"
            }
        ]
    },
    apis: ['./src/routes/*.yaml']
}