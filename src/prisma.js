import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
	typeDefs: 'src/generated/prisma.graphql',
	endpoint: 'http://localhost:4466'
});

// prisma.query, prisma.mutation, prisma.subscription, prisma.exists

// Method name matches the query name
// prisma.query.users(null, '{id name posts{ id title }}').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// }).catch(err => console.log('Couldnt fetch data'));

// Comments query
// prisma.query.comments(null, '{id text author{id name}}').then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
// }).catch(err => console.log('Couldnt fetch data'));

// Chaining queries together
// prisma.mutation.createPost({
//     data: {
//         title: "My New GraphQL Post",
//         body: "You can find the new course here",
//         published: true,
//         author: {
//             connect: {
//                 id: "ckiygsw6900210915y52k5lor"
//             }
//         }
//     }
// }, '{ id title body published author { id name }}').then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//     prisma.query.users(null, '{id name posts { id title }}').then(data => {
//         console.log(JSON.stringify(data, undefined, 2));
//     }).catch(err => console.log('Second promise failed'));
// }).catch(err => console.log('Encountered an error while fetching data'));

// Challenge
// prisma.mutation.updatePost({
//     data: {
//         title: "Updated Post from GraphQL",
//         published: false
//     },
//     where: {
//         id: "ckj1cb4zy035g0a15bzjfrye3"
//     }
// }, '{ id published title }').then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//     prisma.query.posts(null, '{id title body published}').then(posts => {
//         console.log(JSON.stringify(posts, undefined, 2));
//     }).catch(err => console.log('Error while fetching data'));
// }).catch(err => {
//     console.log('Error occurred while fetching data');
// });

// Async - Await
// const postCreation = async () => {
// 	const postAuthorInformation = await prisma.mutation.createPost(
// 		{
// 			data: {
// 				title: 'Async Await Post',
// 				body: 'Async Await Post Body',
// 				published: false,
// 				author: {
// 					connect: {
// 						email: 'dave@mailinator.com'
// 					}
// 				}
// 			}
// 		},
// 		'{author {id name email posts { id title body published }}}'
//     );

//     console.log(JSON.stringify(postAuthorInformation, undefined, 2));
// };

// postCreation();

// prisma.exists usage
// prisma.exists.Comment({
//     id: "ckiyh1ce3007i091511om8d62",
//     author: {
//         name: "David Warner"
//     }
// }).then(exists => {
//     console.log(exists);
// });

const updatePostForUser = async (postId, data) => {
	const post = await prisma.mutation.updatePost(
		{
			data,
			where: {
				id: postId
			}
		},
		'{author {id}}'
    );
	const userInfo = await prisma.query.user({ where: { id: post.author.id } }, '{id name email}');
	console.log(JSON.stringify(userInfo, undefined, 2));
};

updatePostForUser('ckj1cb4zy035g0a15bzjfrye3', { published: true })
	.then((resolved) => {
		console.log(resolved);
	})
	.catch((reject) => {
		console.log(reject);
	});
