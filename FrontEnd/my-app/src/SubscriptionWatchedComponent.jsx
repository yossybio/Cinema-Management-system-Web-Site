import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SubscriptionWatchedComponent(props) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [itemsRepiter, setItemsRepiter] = useState([]);

  const fetchMemberName = async (memberId) => {
    const resp = await axios.get(`http://localhost:8000/members/${memberId}`);
    const data = resp.data;
    const memberName = data.Name;

    return memberName;
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const allSubscriptions = (
        await axios.get("http://localhost:8000/subscriptions")
      ).data;
      await setSubscriptions(allSubscriptions);
    };

    fetchSubscriptions();
  }, []);

  useEffect(() => {
    const subscriptionsWatched = async () => {
      const promisesArray = subscriptions.map(async (subscription) => {
        for (let index = 0; index < subscription.Movies.length; index++) {
          if (subscription.Movies[index].MovieId === props.movieId) {
            return {
              MovieId: subscription.Movies[index].MovieId,
              MemberName: await fetchMemberName(subscription.MemberId),
              MovieWatchedDate: new Date(
                subscription.Movies[index].Date
              ).toLocaleString("he-IL"),
            };
          }
        }
      });

      await Promise.all(promisesArray).then(async (subscriptionDetails) => {
        let itemsForList = [];
        for (let index = 0; index < subscriptionDetails.length; index++) {
          if (subscriptionDetails[index] !== undefined) {
            itemsForList.push(
              <li
                key={`${subscriptionDetails[index].MovieId} ${subscriptionDetails[index].MemberName}`}
              >
                {`${subscriptionDetails[index].MemberName}, ${subscriptionDetails[index].MovieWatchedDate.split(",")[0]}`}
              </li>
            );
          }
        }

        await setItemsRepiter(itemsForList);
      });
    };
    subscriptionsWatched();
  }, [subscriptions]);

  return (
    <div style={props.style}>
      <p>Subscriptions watched :</p>
      <ul>{itemsRepiter}</ul>
    </div>
  );
}
