import ProfileComp from "../components/profile/ProfileComp";

function Profile() {

  return (

    <div className="bg-slate-950 min-h-screen overflow-x-hidden">

      <div className="p-4 sm:p-6 md:p-8">
        <ProfileComp />
      </div>

    </div>
  );
}

export default Profile;