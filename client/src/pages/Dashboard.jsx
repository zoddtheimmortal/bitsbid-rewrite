import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Button, Spinner } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const supabase = client();

  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUserInfo() {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      console.log(data.session.user.user_metadata);
      setUser(data.session.user.user_metadata);
      setLoading(false);
    }
    getUserInfo();
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        {Object.keys(user) !== 0 ? (
          <div>
            <>Dashboard</>
          </div>
        ) : (
          <>Invalid Attempt</>
        )}
      </div>
    );
  }
};

export default Dashboard;
