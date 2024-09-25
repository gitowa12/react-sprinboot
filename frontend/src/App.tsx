import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "./types/types";

// import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>("");

  // ユーザーを初期取得
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("ユーザーの取得に失敗しました", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const createNewUser = async (name: string) => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/users", {
        name: name,
      });
      // ユーザー追加後に全ユーザーを再取得
      fetchUsers();
      console.log(response);
    } catch (error) {
      console.error("ユーザーの追加に失敗しました", error);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      // ユーザー削除後に全ユーザーを再取得
      fetchUsers();
      console.log("ユーザーが削除されました");
    } catch (error) {
      console.error("ユーザーの削除に失敗しました", error);
    }
  };

  return (
    <>
      <h1>Hello React</h1>
      <div>
        <input type="text" value={name} onChange={handleChange} />
        <button onClick={() => createNewUser(name)}>ユーザーの追加</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ display: "flex" }}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <button onClick={() => deleteUser(user.id)}>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
