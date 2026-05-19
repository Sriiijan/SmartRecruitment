import { useEffect, useState }
from "react";

import {
  getCurrentUser
} from "../../api/userApi";

function DashboardHeader() {

  const [user, setUser] =
    useState(null);

  // ======================================
  // Current User
  // ======================================
  useEffect(() => {

    const currentUser =
      async () => {

        try {

          const data =
            await getCurrentUser();

          setUser(
            data.data
          );

        } catch (error) {

          console.log(error);
        }
      };

    currentUser();

  }, []);

  return (

    <div className="flex justify-end">

      {/* User Card */}
      <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-3xl px-6 py-4">

        {/* Avatar */}
        <img
          src={
            user?.avatar ||

            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }

          alt="avatar"

          className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400"
        />

        {/* Info */}
        <div>

          <h3 className="text-white font-semibold text-lg">
            {user?.fullName}
          </h3>

          <p className="text-slate-400 text-sm">
            @{user?.username}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;