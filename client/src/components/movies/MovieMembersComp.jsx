import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function MovieMembers({ members, permission }) {
  const [hasSubs, setHasSubs] = useState(false);

  useEffect(() => {
    if (members.length !== 0) setHasSubs(true);
  });

  return (
    <>
       
        <div>
          {hasSubs &&<h2 className="text-2xl font-semibold ml-6 underline underline-offset-1 mb-1">Subscribed Members</h2>}
          {/*returns name of subscriber and date in proper format*/}
          <div className="overflow-y-auto h-40">
            <ul className="list-disc pl-10 ml-1 text-base">
              {members.map((member) => {
                return (
                  <li key={member.memberId}>
                    {permission.UpdateSubscriptions ? (
                      <Link to={`/home/subscriptions/${member.memberId}`}>
                        {member.memberName}
                      </Link>
                    ) : (
                      <span>{member.memberName}</span>
                    )}
                    &nbsp;,{member.subscriptionDate.substring(8, 10)}/
                    {member.subscriptionDate.substring(5, 7)}/
                    {member.subscriptionDate.substring(0, 4)}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      
    </>
  );
}

export default MovieMembers;
