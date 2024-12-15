import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

const ProtectedRoute = ({ children, requiredRole }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const [role, setRole] = React.useState(null);

  React.useEffect(() => {
    const fetchRole = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setRole(userDoc.data().role);
      }
    };

    fetchRole();
  }, [user]);

  if (!role) {
    return <p>Loading Role...</p>;
  }

  return role === requiredRole ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
