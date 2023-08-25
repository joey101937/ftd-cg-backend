import { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLString } from 'graphql';
import { User, dummyData } from './User';

const rootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(User),
            args: {
                id: {
                    type: GraphQLInt,
                }
            },
            resolve(parent, args) {
                // actually hit the db here
                return dummyData;
            }
        }
    },
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: User,
            args: {
                id: {type: GraphQLInt},
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                const newRecord = {
                    id: args.id,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password,
                };
                console.log('inserting ', newRecord);
                dummyData.push(newRecord);
                return newRecord; // equivilent of res.send
            },
        },
        // updateUser,
    }
})

export const schema = new GraphQLSchema({ query: rootQuery, mutation });