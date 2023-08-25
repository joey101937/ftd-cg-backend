import { GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql'

export const User = new GraphQLObjectType({
    name: 'User', 
    fields: () => ({
        id: {
            type: GraphQLInt,
        },
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        password: {
            type: GraphQLString,
        },
    })
})

export const dummyData = [{
    id: 1,
    firstName: 'first',
    lastName: 'last',
    email: 'test@test.com',
    password: 'pw',
}];