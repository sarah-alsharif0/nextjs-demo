import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react/cjs/react.production.min";
import MeetupList from "../components/meetups/MeetupList";
const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta 
            name="description"
            content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         }
//     }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://sarah:123456789**@cluster0.ax9kx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
