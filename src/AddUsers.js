import React, { useState } from "react";
import { db } from "./firebase"; // Assuming you have a file that exports the Firestore instance

const AddUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userArray = [
    {
      email: "ahasun.habib@bcscl.com.bd",
      username: "Ahasun",
      password: "aha@B$1",
    },
    {
      email: "aktar.hossain@bcscl.com.bd",
      username: "Aktar",
      password: "akt@B$1",
    },
    { email: "al.mamun@bcscl.com.bd", username: "Mamun", password: "mam@B$1" },
    { email: "aminur@bcscl.com.bd", username: "Aminur", password: "ami@B$1" },
    {
      email: "arifur.rahman@bcscl.com.bd",
      username: "Arifur",
      password: "ari@B$1",
    },
    { email: "asif@bcscl.com.bd", username: "Asif", password: "asi@B$1" },
    {
      email: "azizul.haque@bcscl.com.bd",
      username: "Azizul",
      password: "azi@B$1",
    },
    {
      email: "bakhtiar.ahmed@bcscl.com.bd",
      username: "Bakhtiar",
      password: "bak@B$1",
    },
    {
      email: "bijoy.talukder@bcscl.com.bd",
      username: "Bijoy",
      password: "bij@B$1",
    },
    { email: "faisal@bcscl.com.bd", username: "Faisal", password: "fai@B$1" },
    {
      email: "hachhibur@bcscl.com.bd",
      username: "Hachhibur",
      password: "hac@B$1",
    },
    {
      email: "hasib.asad@bcscl.com.bd",
      username: "Hasib",
      password: "has@B$1",
    },
    {
      email: "imran.sarker@bcscl.com.bd",
      username: "Imran",
      password: "imr@B$1",
    },
    {
      email: "maruf.islam@bcscl.com.bd",
      username: "Maruf",
      password: "mar@B$1",
    },
    { email: "md_nasir@bcscl.com.bd", username: "Nasir", password: "nas@B$1" },
    {
      email: "mizanul.hoque@bcscl.com.bd",
      username: "Mizanul",
      password: "miz@B$1",
    },
    {
      email: "ranabir.sarker@bcscl.com.bd",
      username: "Ranabir",
      password: "ran@B$1",
    },
    {
      email: "sadikulbari@bcscl.com.bd",
      username: "Sadikul",
      password: "sad@B$1",
    },
    {
      email: "sadman.farabe@bcscl.com.bd",
      username: "Sadman",
      password: "sad@B$1",
    },
    {
      email: "sanando.chayan@bcscl.com.bd",
      username: "Sanando",
      password: "san@B$1",
    },
    { email: "shaikh@bcscl.com.bd", username: "Shaikh", password: "sha@B$1" },
    { email: "shamaun@bcscl.com.bd", username: "Shamaun", password: "sha@B$1" },
    {
      email: "sozib.hasan@bcscl.com.bd",
      username: "Sozib",
      password: "soz@B$1",
    },
    { email: "suaibur@bcscl.com.bd", username: "Suaibur", password: "sua@B$1" },
    { email: "tajdid@bcscl.com.bd", username: "Tajdid", password: "taj@B$1" },
    {
      email: "tanza.jahir@bcscl.com.bd",
      username: "Tanza",
      password: "tan@B$1",
    },
  ];

  const addUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const usersCollection = db.collection("users");

      for (const user of userArray) {
        await usersCollection.add(user);
      }

      console.log("Users added successfully");
    } catch (err) {
      setError(err.message);
      console.error("Error adding users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={addUsers} disabled={isLoading}>
        {isLoading ? "Adding users..." : "Add Users"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddUsers;
