import { Client, Account} from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1', // Your API
  platform: 'com.dominik.aora',
  projectId: '66eb13ed000d98ba6b47',
  databaseId: '66eb153a002af19be982',
  userCollectionId: '66eb154e003cc45f4770',
  videoCollectionId: '66eb1565001b57bebf44',
  storageId: '66eb167000022c2eed29'
}

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform) // Your application ID or bundle ID.
  ;

const account = new Account(client);

export const createUser = () => {
  account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
      console.log(response);
    }, function (error) {
      console.log(error);
    });
}
